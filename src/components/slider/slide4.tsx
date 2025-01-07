import { Building2 } from "lucide-react";

export function Slide4() {
    return (
        <div className="relative w-full h-screen">
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/src/assets/images/banners/NATIONAL INTEGRITY.jpeg')`,
                }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
                <div className="flex items-center gap-4 mb-6 animate-in slide-in-from-left duration-1000">
                    <Building2 className="text-[#E5243B]" size={48} />
                    <h2 className="text-white text-5xl font-bold">GOAL 1</h2>
                </div>

                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-in slide-in-from-right duration-1000">
                    National Integrity
                </h1>

                <p className="text-white text-xl max-w-2xl mb-8 animate-in fade-in duration-1000 delay-300">
                    Bharatiya Popular Party shall bear true faith and allegiance to the constitution of India as by law established, and to the principles of socialism, secularism and democracy and would uphold the sovereignty, unity and integrity of India.
                </p>

                <button className="bg-[#E5243B] hover:bg-[#E5243B]/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300 w-fit animate-in slide-in-from-bottom duration-1000 delay-500">
                    Learn More
                </button>
            </div>
        </div>
    );
}