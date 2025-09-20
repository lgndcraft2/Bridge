# app.py
import streamlit as st
from spitch import Spitch
import os
import tempfile

# Set up the page
st.set_page_config(
    page_title="Bridge - Speech to Text",
    page_icon="🎤",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for styling
st.markdown("""
<style>
    .main-header {
        font-size: 3rem;
        color: #1E40AF;
        text-align: center;
        margin-bottom: 2rem;
    }
    .stButton button {
        background-color: #1E40AF;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.5rem 1rem;
        font-weight: 500;
    }
    .stButton button:hover {
        background-color: #1E3A8A;
        color: white;
    }
    .success-box {
        background-color: #D1FAE5;
        padding: 1rem;
        border-radius: 0.5rem;
        border-left: 5px solid #10B981;
        margin: 1rem 0;
    }
    .info-box {
        background-color: #DBEAFE;
        padding: 1rem;
        border-radius: 0.5rem;
        border-left: 5px solid #3B82F6;
        margin: 1rem 0;
    }
    .footer {
        text-align: center;
        margin-top: 3rem;
        color: #6B7280;
        font-size: 0.8rem;
    }
</style>
""", unsafe_allow_html=True)

# App header
st.markdown('<h1 class="main-header">🎤 Bridge - Speech to Text</h1>', unsafe_allow_html=True)
st.markdown('<p style="text-align: center; font-size: 1.2rem; color: #6B7280;">Convert audio to text with Spitch ASR API</p>', unsafe_allow_html=True)

# Initialize the Spitch client
def get_spitch_client(api_key):
    os.environ["SPITCH_API_KEY"] = api_key
    return Spitch()

# Transcription function
def transcribe_audio(audio_file, lang):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
        temp_file.write(audio_file.read())
        temp_path = temp_file.name

    client = get_spitch_client(st.session_state.api_key)
    
    with open(temp_path, "rb") as f:
        response = client.speech.transcribe(language=lang, content=f.read())
    
    # Clean up the temporary file
    os.unlink(temp_path)
    
    return response.text

# Sidebar for API key and instructions
with st.sidebar:
    st.image("https://via.placeholder.com/150x50/1E40AF/FFFFFF?text=Bridge", use_column_width=True)
    st.markdown("### 🔑 API Configuration")
    
    # API key input
    api_key = st.text_input("Enter your Spitch API Key", type="password", value=st.session_state.get("api_key", ""))
    if api_key:
        st.session_state.api_key = api_key
        st.success("API key saved successfully")
    
    st.markdown("---")
    st.markdown("### 📖 Instructions")
    st.markdown("""
    1. Enter your Spitch API key
    2. Upload an audio file
    3. Select the audio language
    4. Click 'Transcribe' to convert to text
    5. Download your transcript when complete
    """)
    
    st.markdown("---")
    st.markdown("### 🌐 Supported Formats")
    st.markdown("""
    - **WAV** - High quality audio
    - **MP3** - Compressed audio
    - **OGG** - Open format
    - **M4A** - Apple audio format
    """)
    
    st.markdown("---")
    st.markdown("### 🗣️ Supported Languages")
    st.markdown("""
    - English (en)
    - Yoruba (yo)
    - Igbo (ig)
    - Hausa (ha)
    """)

# Main content area
if not st.session_state.get("api_key"):
    st.warning("Please enter your Spitch API key in the sidebar to continue")
else:
    # Language selection
    lang_options = {
        "English": "en",
        "Yoruba": "yo", 
        "Igbo": "ig",
        "Hausa": "ha"
    }
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### 📁 Upload Audio File")
        audio_file = st.file_uploader("Choose an audio file", type=["wav", "mp3", "ogg", "m4a"], label_visibility="collapsed")
        
        if audio_file:
            st.audio(audio_file, format='audio/wav')
            st.success(f"Uploaded: {audio_file.name}")
    
    with col2:
        st.markdown("### 🌐 Select Language")
        selected_lang = st.selectbox("Choose the audio language", options=list(lang_options.keys()), index=0)
        lang_code = lang_options[selected_lang]
        
        st.markdown("### 🎯 Actions")
        if st.button("🎵 Transcribe Audio", use_container_width=True):
            if audio_file:
                with st.spinner("Transcribing audio... This may take a moment."):
                    try:
                        transcript = transcribe_audio(audio_file, lang_code)
                        st.session_state.transcript = transcript
                        st.success("Transcription completed!")
                    except Exception as e:
                        st.error(f"Transcription failed: {str(e)}")
            else:
                st.warning("Please upload an audio file first")
    
    # Transcript display
    if st.session_state.get("transcript"):
        st.markdown("### 📝 Transcription Result")
        st.markdown('<div class="success-box">', unsafe_allow_html=True)
        transcript_text = st.text_area("Transcript", st.session_state.transcript, height=200, label_visibility="collapsed")
        st.markdown('</div>', unsafe_allow_html=True)
        
        # Download button
        st.download_button(
            label="📥 Download Transcript",
            data=st.session_state.transcript,
            file_name="transcript.txt",
            mime="text/plain",
            use_container_width=True
        )

# Footer
st.markdown("---")
st.markdown('<div class="footer">', unsafe_allow_html=True)
st.markdown("Powered by **Spitch ASR API** • Built with Streamlit")
st.markdown('</div>', unsafe_allow_html=True)