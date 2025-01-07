import { Users } from "lucide-react";

export function Slide5() {
  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/images/banners/EQUAL OPPORTUNITY AND GENDER EQUALITY.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="flex items-center gap-4 mb-6 animate-in slide-in-from-left duration-1000">
          <Users className="text-[#DDA63A]" size={48} />
          <h2 className="text-white text-5xl font-bold">GOAL 2</h2>
        </div>

        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-in slide-in-from-right duration-1000">
          Equal Opportunity and Gender Equality
        </h1>

        <p className="text-white text-xl max-w-2xl mb-8 animate-in fade-in duration-1000 delay-300">
          Bharatiya Popular Party is committed to the task of building a developed democratic India based on principle of equal opportunity to all citizens. The party will lay special emphasis on improving the condition of socially and economically disadvantaged sections of society.
        </p>

        <button className="bg-[#DDA63A] hover:bg-[#DDA63A]/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300 w-fit animate-in slide-in-from-bottom duration-1000 delay-500">
          Learn More
        </button>
      </div>
    </div>
  );
}