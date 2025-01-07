
export function Slide1() {
  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transform transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <h1 className="text-white text-4xl md:text-4xl lg:text-7xl font-bold mb-4 animate-in slide-in-from-left duration-1000">
          WELCOME TO
        </h1>

        <h2 className="text-white text-4xl md:text-4xl lg:text-7xl font-bold mb-8 animate-in slide-in-from-right duration-1000 delay-300">
          BHARATIYA POPULAR PARTY
        </h2>

        <div className="flex justify-between align-middle items-center animate-in fade-in duration-1000 delay-500">
          <div className="mb-4">
            <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold">
              Community Contribution
            </h3>
            <p className="text-white text-3xl md:text-3xl lg:text-4xl font-semibold">
              Begin the Change.
            </p>
          </div>

          <div className="flex mt-6">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-full text-sm font-semibold transition-colors duration-300">
              JOIN BPP CHANGE INDIA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}