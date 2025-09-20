export default function Integration(){
  return(
    <>
    <div className="bg-gray-300  flex justify-between flex-col-reverse items-center lg:flex-row p-6 ">
      <div className="lg:w-[50%] ">
        <video
              src="./devices.mp4"
              className="w-[450px] rounded-2xl my-6 "
              muted
              loop
              autoPlay
              playsInline
            ></video>
      </div>
      <div className="lg:w-[50%] mb-6 ">
        <p className="text-center text-3xl font-extrabold  sm:text-5xl lg:text-6xl lg:text-left ">Seamless Integration</p>
        <p className="text-center lg:w-[500px] lg:font-medium  font-light lg:text-left lg:text-[1.1rem] mt-1">Stay connected across all your devices with one simple, unified experience, anytime, anywhere.</p>
      </div>
    </div>
    </>
  )
}