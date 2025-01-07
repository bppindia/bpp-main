import { Building2 } from "lucide-react";

export function Slide14() {
  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1596796930385-0885c439f100?auto=format&fit=crop&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="flex items-center gap-4 mb-6 animate-in slide-in-from-left duration-1000">
          <Building2 className="text-white" size={48} />
          <h2 className="text-white text-5xl font-bold">JOIN Now</h2>
        </div>

        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-in slide-in-from-right duration-1000">
          Be Part of the Change
        </h1>

        <p className="text-white text-xl max-w-2xl mb-8 animate-in fade-in duration-1000 delay-300">
          Join Bharatiya Popular Party in our mission to build a stronger, more prosperous India. Together, we can create meaningful change and work towards a better future for all citizens.
        </p>

        <div className="flex gap-4 animate-in slide-in-from-bottom duration-1000 delay-500">
          <button className="bg-white text-black hover:bg-white/90 px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300">
            Join BPP
          </button>
          <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}