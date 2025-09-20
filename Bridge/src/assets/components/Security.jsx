export default function Security(){
  return(
    <div className="bg-gray-50 flex justify-between  flex-col items-center lg:flex-row p-6">
    <div className="lg:w-[50%] mb-6 ">
      <p className="text-center text-3xl font-extrabold  sm:text-5xl lg:text-6xl lg:text-left ">Your Privacy, Our Priority</p>
      <p className="text-center lg:w-[500px] lg:font-medium  font-light lg:text-left lg:text-[1.1rem] mt-3.5">Built with end-to-end security so your conversations stay yours.</p>
    </div>
    <div>
         <video
              src="./security.mp4"
              className="w-[450px] rounded-2xl my-6 "
              muted
              loop
              autoPlay
              playsInline
            ></video>
    </div>
    </div>
  )
}