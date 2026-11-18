import hero from "../assets/hero.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate()

  return (
    <div className="relative flex flex-col md:flex-row items-center
       overflow-hidden min-h-[600px] px-8 md:px-20 bg-[#F8F5F0] dark:bg-neutral-950 ">
      <div className="w-full md:w-1/2 z-10 py-10">
        <span className="bg-white/60 px-4 py-2 rounded-full text-sm">
          ✨ Best Deals 2025
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold mt-5
          text-neutral-600 leading-tight dark:text-neutral-300">
          Upgrade Your Style
          <span className="block text-neutral-500 dark:text-neutral-400">
            Shop Smarter
          </span>
        </h1>

        <p className="text-gray-700 mt-4 max-w-md dark:text-neutral-400">
          Discover the latest fashion trends, stylish outfits, and premium clothing collections – all in one place.
        </p>

        <div className="flex items-center gap-5 mt-5">
          <button onClick={()=>navigate("/collection")} className="bg-neutral-600 text-white px-6 py-3
            rounded-xl hover:bg-neutral-800 transition">
            Shop Now →
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center
        items-end relative">
        <img
          src={hero}
          alt="Fashion Shopping"
          className="h-[280px] md:h-[500px] w-full
          object-cover object-top rounded-t-full"/>
      </div>
    </div>
  );
};
export default Hero;
