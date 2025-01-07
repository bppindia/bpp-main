import { Factory } from "lucide-react";

export function Slide9() {
  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/images/banners/INDUSTRIAL DEVELOPMENT & INFRASTRUCTURE.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="flex items-center gap-4 mb-6 animate-in slide-in-from-left duration-1000">
          <Factory className="text-[#26BDE2]" size={48} />
          <h2 className="text-white text-5xl font-bold">GOAL 6</h2>
        </div>

        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-in slide-in-from-right duration-1000">
          Industrial Development and Infrastructure
        </h1>

        <p className="text-white text-xl max-w-2xl mb-8 animate-in fade-in duration-1000 delay-300">
          The goal of the BPP is to promote industrial development and build world-class infrastructure to drive economic development. By modernizing industries, encouraging research and development and enhancing transportation, energy and digital networks, the party aims to create a sustainable competitive economy.
        </p>

        <button className="bg-[#26BDE2] hover:bg-[#26BDE2]/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300 w-fit animate-in slide-in-from-bottom duration-1000 delay-500">
          Learn More
        </button>
      </div>
    </div>
  );
}