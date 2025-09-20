export default function Getstarted(){
  return(
    <>
    <div className="bg-gray-300 p-6 h-[50vh] flex flex-col items-center justify-center ">
      <p className="text-center text-xl font-extrabold  sm:text-3xl lg:text-5xl">Ready to Experience Seamless Conversations?</p>
      <p className="text-center my-2 font-light lg:text-[1.3rem]">Join a growing community bridging voices and breaking barriers.</p>
      <div className="text-center">
        <button className="border-[1px] p-2 rounded-[10px] shadow-2xl border-gray-400 mt-7 sm:px-4 lg:w-[200px] lg:h-[50px] cursor-pointer font-bold lg:text-[1.2rem] animate-bounce">Get Started</button>
      </div>
    </div>
    </>
  )
}