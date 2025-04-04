// src/pages/dashboard/goals/QualityEducation.tsx
import { Main } from "@/components/layout/dashboard/main";
import { Card, CardContent } from "@/components/ui/card";
import bppLogo from '@/assets/logo/bppLogo.svg';

const QualityEducation = () => {
  return (
    <Main fixed>
     <div className="min-h-screen">
        <div className="mx-auto">
          <Card className="shadow-sm overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0">
                  <img src={bppLogo} alt="BPP Logo" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">GOAL 10</h1>
                  <h2 className="text-xl md:text-2xl font-semibold mb-4">Quality Education</h2>
                  <p className="text-base md:text-lg leading-relaxed">
                    Bharatiya Popular Party aims to open schools to every child, ensuring access to quality education for a brighter future.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Main>
  );
};

export default QualityEducation;