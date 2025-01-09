import PartyPeoples from '@/assets/images/backgrounds/Party Peoples.png';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bppLogo from "@/assets/logo/bppLogo.svg";

export default function Newsletter() {
  return (
    <div 
      className="w-full mx-auto p-7 bg-cover bg-center relative" 
      style={{ backgroundImage: `url(${PartyPeoples})` }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
      
      <div className="relative rounded-xl max-w-7xl mx-auto flex flex-row">
        {/* Left side - Content */}
        <div className="flex-1 max-w-7xl pr-6">
          <div className="text-white mb-6">
            <p className="text-sm mb-2">Our newsletters</p>
            <h2 className="text-2xl font-bold mb-4">
              Stay Informed with Bharatiya Popular Party
            </h2>
          </div>

          <div className="text-white text-sm mb-6">
            Get timely updates on national news and political developments. No spam, just the most relevant insights delivered to your inbox.
          </div>
          
          <div className="space-y-4">
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 rounded-r-none w-auto bg-white md:w-80 "
              />
              <Button 
                className="rounded-l-none bg-[#e85a32] hover:bg-[#f5562a]"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right side - Illustration */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
            <img src={bppLogo} alt="Bharatiya Popular Party Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}
