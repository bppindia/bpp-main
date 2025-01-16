import appQr from '@/assets/appQR.svg';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Shield, Smartphone, UserX } from 'lucide-react';
import { FaAndroid } from "react-icons/fa";

export default function Newsletter() {
  return (
    <div className="w-full mx-auto p-4 sm:p-7 bg-cover bg-center relative">
    <div className="relative rounded-xl max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Newsletter Section */}
      <div className="lg:col-span-8 space-y-4 sm:space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Our newsletters</p>
          <h2 className="text-xl sm:text-2xl font-bold">
            Stay Informed with Bharatiya Popular Party
          </h2>
        </div>
        <div className="text-sm text-muted-foreground">
          Get timely updates on national news and political developments. No spam, just the most relevant insights delivered to your inbox.
        </div>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 sm:rounded-r-none"
            />
            <Button
              className="sm:rounded-l-none bg-[#e85a32] hover:bg-[#f5562a] text-white"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
  
      {/* QR Code Section */}
      <div className="lg:col-span-4 space-y-4 sm:space-y-6">
        <div className="bg-card rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-left">
            <Smartphone className="h-5 w-5" />
            Download Our Secure App
          </h3>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* QR Code */}
            <div className="flex flex-col items-start space-y-3">
              <div className="bg-white p-3 rounded-lg shadow-sm max-w-[8rem] sm:max-w-[10rem]">
                <img
                  src={appQr}
                  alt="QR Code"
                  className="w-full h-auto"
                />
              </div>
              <span className="text-sm font-medium">Scan to Download App</span>
            </div>
  
            {/* Security Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold">Verified & Secure</h4>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold">Privacy First</h4>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <UserX className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold">No Data Collection</h4>
                </div>
              </div>
              <Button
                className="sm:w-auto"
                asChild
                variant="outline"
              >
                <a
                  href="https://bppdatabase.s3.ap-south-1.amazonaws.com/app/BPP.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-start gap-2"
                >
                  <FaAndroid className="h-4 w-4" />
                  <div className="text-left">
                    <div className="text-xs">Download</div>
                    <div className="-mt-1 font-semibold">BPP APP Today</div>
                  </div>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}