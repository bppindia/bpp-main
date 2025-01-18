import { postData } from "@/api/apiClient";
import bppLogo from "@/assets/logo/bppLogo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import NewsCard from './test/news-card';

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const handleSubscribe = async () => {
    if (!email) {
      setErrorMessage("Please enter an email address");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    try {
      await postData('subscribers', { email: email });

      toast({
        title: "Success!",
        description: "You have successfully subscribed to our newsletter.",
      });

      setIsSubscribed(true);
      setEmail("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderSubscribeForm = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 sm:rounded-r-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          className="sm:rounded-l-none bg-[#e85a32] hover:bg-[#f5562a] text-white"
          onClick={handleSubscribe}
          disabled={isLoading}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>

      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}

      {isSubscribed && (
        <div className="text-green-500 text-sm mt-2">Thank you for subscribing!</div>
      )}
    </div>
  );

  return (
    <div className="w-full mx-auto p-4 sm:p-7 bg-cover bg-center relative">
      <div className="relative rounded-xl max-w-7xl items-center mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:hidden grid grid-cols-12 gap-4 col-span-full">
          <div className="col-span-3 sm:col-span-2">
            <div className="bg-white flex items-center justify-center h-full">
              <img src={bppLogo} alt="Bharatiya Popular Party Logo" />
            </div>
          </div>
          <div className="col-span-9 sm:col-span-10 space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Our newsletters</p>
              <h2 className="text-xl sm:text-2xl font-bold">
                Stay Informed with Us
              </h2>
            </div>
            <div className="text-sm text-muted-foreground">
              Get timely updates on national news and political developments. No spam, just the most relevant insights delivered to your inbox.
            </div>
            {renderSubscribeForm()}
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-5 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Our newsletters</p>
            <h2 className="text-xl sm:text-2xl font-bold">
              Stay Informed with Us
            </h2>
          </div>
          <div className="text-sm text-muted-foreground">
            Get timely updates on national news and political developments. No spam, just the most relevant insights delivered to your inbox.
          </div>
          {renderSubscribeForm()}
        </div>
        <div className="hidden lg:block lg:col-span-2 space-y-4">
          <div className="bg-white flex items-center justify-center">
            <img src={bppLogo} alt="Bharatiya Popular Party Logo" />
          </div>
        </div>
        <div className="lg:col-span-5 space-y-4 sm:space-y-7">
          <NewsCard />
        </div>
      </div>
    </div>
  );
}
