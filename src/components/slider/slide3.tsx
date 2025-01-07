export function Slide3() {
  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl">
          <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-bold mb-8 animate-in slide-in-from-left duration-1000">
            JOIN THE MOVEMENT
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 animate-in fade-in duration-1000 delay-300">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-white text-2xl font-semibold mb-2">Volunteer</h3>
              <p className="text-white/90">Make a difference in your community by joining our volunteer programs</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-white text-2xl font-semibold mb-2">Donate</h3>
              <p className="text-white/90">Support our initiatives through contributions and help us create change</p>
            </div>
          </div>

          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300 animate-in slide-in-from-bottom duration-1000 delay-500">
            Get Involved Today
          </button>
        </div>
      </div>
    </div>
  );
}