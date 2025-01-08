import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const RecruitmentBanner = () => {
  return (
    <Card className="relative mx-auto overflow-hidden w-full mb-8   max-w-7xl">
      {/* Background Image Container */}
      <div className="relative h-[300px] w-full">
        {/* Using a placeholder image - replace with your actual image */}
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3MlMjBjb21tdW5pdHl8ZW58MHx8MHx8fDA%3D"
          alt="Group of people with signs"
          className="w-full h-full object-cover brightness-75"
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-center">
          <div className="max-w-xl">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Be part of change
            </h1>

            {/* Subheading */}
            <p className="text-xl text-white mb-6">
              Join us and together we can change our community.
            </p>

            {/* Call to Action Button */}
            <Button
              className="bg-[#e85a32] hover:bg-[#e85a32] text-white px-6 py-2 rounded-full"
            >
              Join Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecruitmentBanner;