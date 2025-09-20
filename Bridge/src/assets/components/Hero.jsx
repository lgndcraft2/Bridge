import { useState,useEffect,useRef } from "react"
export default function Hero(){
  const [isOpen, setIsOpen] = useState(false);
   const navRef = useRef(null);

  useEffect(() => {
    const navHeight = navRef.current?.offsetHeight || 0;

    document.documentElement.style.scrollPaddingTop = `${navHeight}px`;
  }, []);
  

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
  const handleKey = (e) => e.key === "Escape" && setIsOpen(false);
  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, []);


  return(
    <div className="h-screen">
    <nav ref={navRef} className="flex justify-between p-5 items-center fixed z-40 border-b-2 border-b-gray-700 text-white shadow-2xl  shadow-gray-600 bg-gradient-to-r from-gray-800 to-gray-600  w-full">
      <div className="flex gap-4">
        <img src="./Group 12@2x.jpg" className="w-[30px] "/>
        <a href="#Home" className="lg:text-3xl"><p>Bridge</p></a>
      </div>
      <div>
        <img src="./menu.svg" className="sm:hidden" onClick={() => setIsOpen(true)} />
      </div>
      <ul className="sm:flex gap-6 hidden ">
        <a href="#Features" className="lg:text-[1.3rem] hover:-translate-y-1 hover:opacity-75 transition-all duration-300"><li>Features</li></a>
        <a href="#Integrations" className="lg:text-[1.3rem] hover:-translate-y-1 hover:opacity-75 transition-all duration-300"><li>Integration</li></a>
        <a href="#Security" className="lg:text-[1.3rem] hover:-translate-y-1 hover:opacity-75 transition-all duration-300"><li>Security</li></a>
        <a href="#Getstarted" className="lg:text-[1.3rem] hover:-translate-y-1 hover:opacity-75 transition-all duration-300"><li>Get Started</li></a>
      </ul>
    </nav>
    <span>
      <img src="public/1758095818439.jpg" className="absolute w-full  h-screen object-cover sm:object-fill" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/20 "></div>
    {
      isOpen && (
        <div className="fixed z-50 bg-white min-h-screen w-full sm:hidden">
      <img src="/x.svg" className="mt-6 ml-2" onClick={() => setIsOpen(false)} />
      <ul className="mt-[3rem] flex flex-col gap-[30px] mx-[20px] ">
        <a href="#Features">
           <li className="border-b-[1px] py-2 " onClick={() => setIsOpen(false)}>Features</li>
        </a>
        <a href="#Integrations">
          <li className="border-b-[1px] py-2 " onClick={() => setIsOpen(false)}>Integrations</li>
        </a>
        <a href="#Security">
          <li className="border-b-[1px] py-2 " onClick={() => setIsOpen(false)}>Security</li>
        </a>
        <a href="#Getstarted">
          <li className="border-b-[1px] py-2 " onClick={() => setIsOpen(false)}>Get Started</li>
        </a>
      </ul>
    </div>
      )
    }
    <div className="flex justify-center flex-col items-center h-screen sm:flex-row ">
      <div className="flex items-center justify-center flex-col sm:w-[40%] gap-3">
        <p className="text-7xl lg:text-9xl drop-shadow-2xl  z-10 text-white ">Bridge</p>
      <p className=" z-10 text-white my-3 lg:text-[1.3rem] ">Where Silence Meets Connection.</p>
      </div>
      <p className=" z-10 text-white text-center sm:text-[1.2rem] lg:text-[1.7rem] sm:w-[60%] sm:text-right sm:mx-6 ">Real-time speech-to-text and multilingual support designed to make conversations accessible for everyone.</p>
    </div>
    </div>
  )
}