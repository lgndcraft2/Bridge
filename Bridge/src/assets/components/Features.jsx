export default function Features() {
  return (
    <>
      <div className="flex justify-between   flex-col items-center lg:flex-row p-6 bg-gray-50">
        <div className="lg:w-[50%] ">
          <p className="text-center text-3xl font-extrabold  sm:text-5xl lg:text-6xl lg:text-left">Features</p>
          <p className="text-center lg:w-[500px] lg:font-medium lg:text-left font-light lg:text-[1.1rem] ">Our platform is designed with features that turns coversations into text in real time, so everyone can stay connected without missing a thing.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] lg:w-[50%] mt-6">
          <div className="border-[1px] border-gray-50 shadow-xl rounded-2xl w-[220px] p-6 h-[240px]  bg-white ">
            <video
              src="./microphone.mp4"
              className="w-[30px] "
              muted
              loop
              autoPlay
              playsInline
            ></video>
            <p className="font-bold my-4 lg:text-[1.3rem]">Speech-to-Text</p>
            <span className="font-light lg:text-[1.1rem]">Instantly turns speech into text for clear communication. </span>
          </div>
          <div className="border-[1px] border-gray-50 shadow-xl rounded-2xl w-[220px] p-6 h-[240px] bg-white">
            <video
              src="./night-button.mp4"
              className="w-[30px] "
              muted
              loop
              autoPlay
              playsInline
            ></video>
            <p className="font-bold my-4 lg:text-[1.3rem]">Day and Night Mode</p>
            <span className="font-light lg:text-[1.1rem]">Switch between light and dark themes anytime. </span>
          </div>
          <div className="border-[1px] border-gray-50 shadow-xl rounded-2xl w-[220px] p-6 h-[240px] bg-white ">
            <video
              src="./languages.mp4"
              className="w-[30px] "
              muted
              loop
              autoPlay
              playsInline
            ></video>
            <p className="font-bold my-4 lg:text-[1.3rem]">Multilingual Support</p>
            <span className="font-light lg:text-[1.1rem]">Works in English, and other local languages. </span>
          </div>
          <div className="border-[1px] border-gray-50 shadow-xl rounded-2xl w-[220px] p-6 h-[240px] bg-white">
            <video
              src="./font-size.mp4"
              className="w-[30px] "
              muted
              loop
              autoPlay
              playsInline
            ></video>
            <p className="font-bold my-4 lg:text-[1.3rem]">Font Adjustment</p>
            <span className="font-light lg:text-[1.1rem]">Resize and style for comfortable reading. </span>
          </div>
        </div>
      </div>
    </>
  );
}
