export default function Footer(){
  return(
    <>
    <div className="grid gap-5 sm:grid-cols-3 p-4">
      <div>
        <div className="flex gap-3">
        <img className="w-[30px]" src="./Group 12@2x.jpg" />
        <p className="font-bold text-[1.3rem] sm:text-[1.5rem] ">Bridge</p>
      </div>
      <p className="font-light w-[220px] sm:text-[1.1rem] lg:text-[1.3rem] lg:w-[350px] ">Where Silence meets Connection.</p>
      </div>
      <ul>
        <a href="#Home"><li className="font-light cursor-pointer hover:scale-105 hover:font-[400] w-fit transition-all ease-in-out delay-100 sm:text-[1.1rem] lg:text-[1.3rem] ">Home</li></a>
        <a href="#Features"><li className="font-light cursor-pointer hover:scale-105 hover:font-[400] w-fit transition-all ease-in-out delay-100 sm:text-[1.1rem] lg:text-[1.3rem] ">Features</li></a>
        <a href="#Integrations"><li className="font-light cursor-pointer hover:scale-105 hover:font-[400] w-fit transition-all ease-in-out delay-100 sm:text-[1.1rem] lg:text-[1.3rem] ">Integration</li></a>
        <a href="#Security"><li className="font-light cursor-pointer hover:scale-105 hover:font-[400] w-fit transition-all ease-in-out delay-100 sm:text-[1.1rem] lg:text-[1.3rem] ">Security and Privacy</li></a>
        <a href="#GetStarted"><li className="font-light cursor-pointer hover:scale-105 hover:font-[400] w-fit transition-all ease-in-out delay-100 sm:text-[1.1rem] lg:text-[1.3rem] ">Get Started</li></a>
      </ul>
      <div>
        <div className="font-[600] text-[1.1rem] lg:text-[1.4rem] mb-2.5 ">Contact Us</div>
      <ul className="flex gap-[20px]">
        <li className="w-[25px] cursor-pointer"><img src="/facebook.svg" /></li>
        <li className="w-[25px] cursor-pointer"><img src="/instagram.svg" /></li>
        <li className="w-[25px] cursor-pointer"><img src="/twitter.svg" /></li>
      </ul>
      </div>
    </div>
     <hr className="m-4 text-[#b2b2b2]" />
      <p className="mx-4 my-2 text-center font-light">
        &copy; 2025 Bridge. All rights reserved.
      </p>
    </>
  )

}
