import { Wheat } from "lucide-react";

export function Slide12() {
  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/images/banners/UPLIFTMENT OF FARMERS.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="flex items-center gap-4 mb-6 animate-in slide-in-from-left duration-1000">
          <Wheat className="text-[#FD6925]" size={48} />
          <h2 className="text-white text-5xl font-bold">GOAL 9</h2>
        </div>

        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-in slide-in-from-right duration-1000">
          Upliftment of Farmers
        </h1>

        <p className="text-white text-xl max-w-2xl mb-8 animate-in fade-in duration-1000 delay-300">
          BPP is dedicated to the upliftment of farmers by ensuring fair prices for their product, providing access to modern farming techniques and improving infrastructure in rural areas. The focus will be on increasing farmer's income through better market access, sustainable agricultural practices and timely financial support.
        </p>

        <button className="bg-[#FD6925] hover:bg-[#FD6925]/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300 w-fit animate-in slide-in-from-bottom duration-1000 delay-500">
          Learn More
        </button>
      </div>
    </div>
  );
}