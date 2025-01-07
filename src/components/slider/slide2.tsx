export function Slide2() {
  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative h-full flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 text-center">
        <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-bold mb-8 animate-in slide-in-from-top duration-1000">
          Community Contribution
        </h1>

        <p className="text-white text-xl md:text-2xl lg:text-3xl max-w-3xl mb-12 animate-in fade-in duration-1000 delay-300">
          We Can't Help Everyone But Everyone Can Help Someone...
        </p>

        <div className="flex gap-6 animate-in slide-in-from-bottom duration-1000 delay-500">
          <button className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300">
            Join Now
          </button>
          <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}