import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Interface = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('en');
  const [isProcessing, setIsProcessing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [textSize, setTextSize] = useState(16);
  const [savedChats, setSavedChats] = useState([]);
  const [showSavedChats, setShowSavedChats] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [apiStatus, setApiStatus] = useState('');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const languages = [
    { name: 'English', code: 'en' },
    { name: 'Yoruba', code: 'yo' },
    { name: 'Igbo', code: 'ig' },
    { name: 'Hausa', code: 'ha' }
  ];

  // Sample data for demonstration
  useEffect(() => {
    setSavedChats([
      {
        id: 1,
        sourceLang: 'en',
        targetLang: 'en',
        text: 'Welcome to Bridge! Start recording to convert speech to text.',
        date: new Date().toISOString()
      }
    ]);
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          bitrate: 128000
        }
      });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setApiStatus('Recording...');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setApiStatus('Microphone access denied');
      alert('Could not access your microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setApiStatus('Processing audio...');
    }
  };

  const transcribeAudio = async (audioBlob) => {
    setIsProcessing(true);
    setTranscript('');
    
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    formData.append('sourceLang', sourceLang);
    formData.append('targetLang', targetLang);
    try {
      // Send to backend for Spitch API processing
        const response = await fetch('https://bridge-six-sand.vercel.app/transcribe', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Transcription failed');
        }

        const data = await response.json();
        
        if (data) {
          setTranscript(data.translation);
          setApiStatus('Transcription complete');
          
          
          // Save to history
          const newChat = {
            id: Date.now(),
            sourceLang,
            targetLang,
            text: data.text,
            date: new Date().toISOString()
          };
          setSavedChats(prev => [newChat, ...prev]);
        } else {
          throw new Error('No transcription returned from API');
        }
      
    } catch (error) {
      console.error('Transcription error:', error);
      setApiStatus('Transcription error: ' + error.message);
      alert('Transcription failed: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const saveTranscript = () => {
    if (!transcript) return;
    
    const newChat = {
      id: Date.now(),
      sourceLang,
      targetLang,
      text: transcript,
      date: new Date().toISOString()
    };
    
    setSavedChats(prev => [newChat, ...prev]);
    setApiStatus('Transcription saved');
  };

  const downloadTranscript = () => {
    const element = document.createElement('a');
    const file = new Blob([transcript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `bridge_transcript_${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setApiStatus('Transcription downloaded');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-blue-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${
        darkMode ? 'bg-gray-800/90' : 'bg-white/90'
      } backdrop-blur-sm shadow-md py-4 px-6 flex justify-between items-center`}>
        <motion.h1 
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Bridge
        </motion.h1>
        
        <div className="flex items-center space-x-2">
          {/* API Status Indicator */}
          <div className={`text-sm px-3 py-1 rounded-full ${
            isRecording ? 'bg-red-100 text-red-800' : 
            isProcessing ? 'bg-blue-100 text-blue-800' : 
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            {apiStatus || 'Ready'}
          </div>

       

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:scale-110 transition-transform"
          >
            <img 
              src={darkMode ? "/sun.svg" : "/moon.svg"} 
              alt="Toggle theme" 
              className="w-6 h-6" 
            />
          </button>
          
          <button
            onClick={() => setShowSavedChats(!showSavedChats)}
            className="p-2 rounded-lg hover:scale-110 transition-transform"
          >
            <img src="/inbox.svg" alt="Saved chats" className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Saved Chats Panel */}
        <AnimatePresence>
          {showSavedChats && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 rounded-xl shadow-lg mb-8 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Saved Conversations</h2>
                <button
                  onClick={() => setShowSavedChats(false)}
                  className="p-2 hover:scale-110 transition-transform"
                >
                  <img src="/x.svg" alt="Close" className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {savedChats.map(chat => (
                  <div
                    key={chat.id}
                    className={`p-4 rounded-lg ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                  >
                    <p className="text-sm font-medium">
                      {languages.find(l => l.code === chat.sourceLang)?.name} → {' '}
                      {languages.find(l => l.code === chat.targetLang)?.name}
                    </p>
                    <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {chat.text}
                    </p>
                    <p className="text-xs mt-2 text-gray-500">
                      {new Date(chat.date).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Transcription Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } mb-8`}
        >
          <h2 className="text-xl font-semibold mb-6 text-center">Speech to Text Transcription</h2>
          
          {/* Language Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Source Language (Spoken)</label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className={`w-full p-3 rounded-lg border ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Target Language (Transcription)</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className={`w-full p-3 rounded-lg border ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Record Button */}
          <div className="flex justify-center mb-8">
            <motion.button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
              className={`px-8 py-4 rounded-full text-white font-semibold text-lg flex items-center justify-center ${
                isRecording 
                  ? 'bg-gradient-to-r from-red-500 to-pink-600' 
                  : 'bg-gradient-to-r from-blue-500/40 to-purple-600/60'
              } disabled:opacity-50`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isProcessing ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <img src="/help-circle.svg" alt="Processing" className="w-6 h-6" />
                </motion.span>
              ) : isRecording ? (
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="mr-2"
                >
                  <img src="/stop-circle.svg" alt="Stop" className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="mr-2"
                >
                  <img src="/mic.svg" alt="Record" className="w-6 h-6" />
                </motion.span>
              )}
              {isProcessing ? 'Processing...' : isRecording ? 'Stop Recording' : 'Start Recording'}
            </motion.button>
          </div>

          {/* Text Size Adjuster */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Text Size</label>
              <span className="text-sm">{textSize}px</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src="/type.svg" alt="Text size" className="w-5 h-5" />
              <input
                type="range"
                min="14"
                max="24"
                value={textSize}
                onChange={(e) => setTextSize(parseInt(e.target.value))}
                className="flex-1"
              />
            </div>
          </div>

          {/* Transcription Result */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Transcription Result</label>
            <div 
              className={`p-4 rounded-lg min-h-48 max-h-96 overflow-y-auto ${
                darkMode ? 'bg-gray-900' : 'bg-gray-100'
              }`}
              style={{ fontSize: `${textSize}px` }}
            >
              {transcript || (
                <div className="flex items-center justify-center h-48 text-gray-500">
                  Record audio to see transcription here...
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <motion.button
              onClick={downloadTranscript}
              disabled={!transcript}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                !transcript 
                  ? 'bg-gray-300' 
                  : 'bg-gradient-to-r from-green-500 to-teal-600 text-black'
              }`}
            >
              <img src="/inbox.svg" alt="Download" className="w-5 h-5" />
              <span>Download</span>
            </motion.button>
            
            <motion.button
              onClick={saveTranscript}
              disabled={!transcript}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                !transcript 
                  ? 'bg-gray-300' 
                  : darkMode ? 'bg-gray-700' : 'bg-gray-400'
              }`}
            >
              <img src="/save.svg" alt="Save" className="w-5 h-5" />
              <span>Save</span>
            </motion.button>
            
            <motion.button
              onClick={() => setTranscript('')}
              disabled={!transcript}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                !transcript 
                  ? 'bg-gray-300' 
                  : darkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}
            >
              <img src="/x.svg" alt="Clear" className="w-5 h-5" />
              <span>Clear</span>
            </motion.button>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } mb-8`}
        >
          <h2 className="text-xl font-semibold mb-4 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '/help-circle.svg', title: 'Select Languages', desc: 'Choose source and target languages' },
              { icon: '/mic.svg', title: 'Start Recording', desc: 'Click the microphone to capture audio' },
              { icon: '/inbox.svg', title: 'Get Results', desc: 'View, save, or download your transcription' }
            ].map((item, index) => (
              <div key={index} className={`p-4 rounded-lg text-center ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <div className="flex justify-center mb-3">
                  <img src={item.icon} alt={item.title} className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <footer className={`py-6 text-center ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <p>&copy; Bridge 2025.</p>
      </footer>
    </div>
  );
};

export default Interface;
