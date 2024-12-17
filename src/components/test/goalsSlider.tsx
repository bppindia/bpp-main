import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import { BadgeDollarSign, Building2, Church, Factory, GraduationCap, Heart, Scale, Sword, Users, Wheat } from 'lucide-react';
import { Card, CardContent } from "../ui/card";

// Import images (keep the existing imports)


const goals = [
    {
        number: "1",
        title: "NATIONAL INTEGRITY",
        description: "UNITED AND STRONG",
        icon: Building2,
        bgColor: "bg-[#E5243B]",
        iconColor: "white"
    },
    {
        number: "2",
        title: "EQUAL OPPORTUNITY",
        description: "EQUALITY FOR ALL",
        icon: Users,
        bgColor: "bg-[#DDA63A]",
        iconColor: "white"
    },
    {
        number: "3",
        title: "GOOD HEALTH AND WELL-BEING",
        description: "HEALTHIER, HAPPIER LIVES",
        icon: Heart,
        bgColor: "bg-[#4C9F38]",
        iconColor: "white"
    },
    {
        number: "4",
        title: "AGAINST MUSCLE AND MONEY POWER",
        description: "STAND FOR TRUTH AND FAIRNESS",
        icon: Sword,
        bgColor: "bg-[#C5192D]",
        iconColor: "white"
    },
    {
        number: "5",
        title: "UPHOLD SECULARISM",
        description: "FREEDOM OF ALL FAITHS AND BELIEFS",
        icon: Church,
        bgColor: "bg-[#FF3A21]",
        iconColor: "white"
    },
    {
        number: "6",
        title: "INDUSTRIAL DEVELOPMENT",
        description: "BUILD FUTURE READY CITIES",
        icon: Factory,
        bgColor: "bg-[#26BDE2]",
        iconColor: "white"
    },
    {
        number: "7",
        title: "EMPLOYMENT AND GROWTH",
        description: "CREATE JOBS FOR ALL",
        icon: BadgeDollarSign,
        bgColor: "bg-[#FCC30B]",
        iconColor: "white"
    },
    {
        number: "8",
        title: "JUSTICE AND PEACE",
        description: "PROSPEROUS SOCIETY",
        icon: Scale,
        bgColor: "bg-[#A21942]",
        iconColor: "white"
    },
    {
        number: "9",
        title: "UPLIFTMENT OF FARMERS",
        description: "EMPOWER OUR FARMERS",
        icon: Wheat,
        bgColor: "bg-[#FD6925]",
        iconColor: "white"
    },
    {
        number: "10",
        title: "QUALITY EDUCATION",
        description: "OPEN SCHOOL TO EVERY CHILD",
        icon: GraduationCap,
        bgColor: "bg-[#DD1367]",
        iconColor: "white"
    }
];

const GoalsCarousel = () => {
    return (
        <section>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {goals.map((goal) => (
                        <CarouselItem key={goal.number} className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                            <Card
                                className={`${goal.bgColor} text-white hover:scale-105 transition-transform duration-200 cursor-pointer overflow-hidden h-full`}
                            >
                                <CardContent className="p-0">
                                    <div className="flex flex-col h-full">
                                        {/* Header with number */}
                                        <div className="flex items-center p-3">
                                            <span className="text-4xl font-bold mr-2">{goal.number}</span>
                                        </div>

                                        {/* Icon and content */}
                                        <div className="p-1 flex flex-col items-center text-center">
                                            <div >
                                                <goal.icon size={40} color={goal.iconColor} />
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 leading-tight">
                                                {goal.title}
                                            </h3>
                                            <p className="text-md opacity-90">
                                                {goal.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" /> */}
            </Carousel>
        </section>
    );
};

export default GoalsCarousel;