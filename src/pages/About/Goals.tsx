import img7 from "@/assets/images/backgrounds/sliders/EMPLOYMENT & ECONOMIC GROWTH.jpeg";
import img2 from "@/assets/images/backgrounds/sliders/EQUAL OPPORTUNITY AND GENDER EQUALITY.jpeg";
import img4 from "@/assets/images/backgrounds/sliders/GAINST MUSCLE AND MONEY POWER.webp";
import img3 from "@/assets/images/backgrounds/sliders/GOOD HEALTH AND WELL-BEING.jpeg";
import img5 from "@/assets/images/backgrounds/sliders/INDIA UPHOLD SECULARISM .jpeg";
import img6 from "@/assets/images/backgrounds/sliders/INDUSTRIAL DEVELOPMENT & INFRASTRUCTURE.jpeg";
import img8 from "@/assets/images/backgrounds/sliders/JUSTICE, PEACE, CALM AND PROSPERITY.jpeg";
import img1 from "@/assets/images/backgrounds/sliders/NATIONAL INTEGRITY.jpeg";
import img10 from "@/assets/images/backgrounds/sliders/QUALITY EDUCATION.jpg";
import img9 from "@/assets/images/backgrounds/sliders/UPLIFTMENT OF FARMERS.jpeg";
import HeaderComponent from '@/components/HeaderComponent';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Layout from '@/layout/Layout';
import { BadgeDollarSign, Building2, Church, Factory, GraduationCap, Heart, Scale, Sword, Users, Wheat } from 'lucide-react';
import React, { FC } from 'react';
import { Link } from "react-router-dom";

interface Goal {
  title: string;
  description: string;
  imgSrc: string;
  icon: any; 
}

const GoalCard: FC<Goal> = ({ title, description, imgSrc, icon }) => {
  const goalSlug = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link to={`/about/bpp-goals/${goalSlug}`} className="w-full">
      <Card className="flex flex-col justify-between h-[500px] overflow-hidden transition-all duration-300 border hover:shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img className="object-cover object-center w-full h-full" src={imgSrc} alt={title} />
        </div>

        {/* Header */}
        <CardHeader className="pt-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 shadow-sm bg-primary/10 text-primary rounded-xl dark:bg-primary/20">
              {React.createElement(icon, { size: 28, className: "text-primary dark:text-white" })}
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-left text-gray-900 font-poppins dark:text-white">
              {title}
            </h2>
          </div>
        </CardHeader>

        {/* Description */}
        <CardContent className="flex-grow">
          <p className="text-sm leading-relaxed text-left text-muted-foreground dark:text-gray-300 line-clamp-5">
            {description}
          </p>
        </CardContent>

        {/* Learn More (visually implied by hover now) */}
        <CardContent className="pt-4 pb-6">
          <span className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
            Learn more →
          </span>
        </CardContent>
      </Card>
    </Link>
  );
};

const GoalsPage = () => {
  const goals = [
    {
      title: "NATIONAL INTEGRITY",
      description: "BPP shall bear true faith and allegiance to the constitution of India as by law established, and to the principles of socialism, secularism and democracy and would uphold the sovereignty, unity and integrity of India.",
      imgSrc: img1,
      icon: Building2
    },
    {
      title: "EQUAL OPPORTUNITY AND GENDER EQUALITY",
      description: "BPP is committed to the task of building a developed democratic India based on principle of equal opportunity to all citizens. The party will lay special emphasis on improving the condition of socially and economically disadvantaged sections of society.",
      imgSrc: img2,
      icon: Users
    },
    {
      title: "GOOD HEALTH AND WELL-BEING",
      description: "BPP will work to provide quality health facilities to all citizens, ensuring that every individual has access to health services that improve their quality of life.",
      imgSrc: img3,
      icon: Heart
    },
    {
      title: "AGAINST MUSCLE AND MONEY POWER",
      description: "BPP will work against the misuse of money and muscle power in democratic politics.",
      imgSrc: img4,
      icon: Sword
    },
    {
      title: "UPHOLD SECULARISM",
      description: "BPP firmly supports secularism and is opposed to the idea of a theocratic state. BPP will work to protect and promote religious harmony and ensure equal rights for all faiths.",
      imgSrc: img5,
      icon: Church
    },
    {
      title: "INDUSTRIAL DEVELOPMENT & INFRASTRUCTURE",
      description: "The goal of the BPP is to promote industrial development and build world-class infrastructure to drive economic development. By modernizing industries, encouraging research and development and enhancing transportation, energy and digital networks, the party aims to create a sustainable competitive economy.",
      imgSrc: img6,
      icon: Factory
    },
    {
      title: "EMPLOYMENT & ECONOMIC GROWTH",
      description: "BPP is committed to promoting decent work and sustained economic growth by creating job opportunities, ensuring fair wages and improving working conditions for all citizens. The party aims to empower individuals particularly in rural and marginalized communities through skill development, entrepreneurship and access to employment.",
      imgSrc: img7,
      icon: BadgeDollarSign
    },
    {
      title: "JUSTICE, PEACE, CALM AND PROSPERITY",
      description: "BPP aims to create a peaceful, just, and prosperous society where all citizens have equal opportunities, security and access to resources. By this goal BPP will uphold individual rights as well as the right to privacy freedom of expression and access to information.",
      imgSrc: img8,
      icon: Scale
    },
    {
      title: "UPLIFTMENT OF FARMERS",
      description: "BPP is dedicated to the upliftment of farmers by ensuring fair prices for their product, providing access to modern farming techniques and improving infrastructure in rural areas. The focus will be on increasing farmer's income through better market access, sustainable agricultural practices and timely financial support.",
      imgSrc: img9,
      icon: Wheat
    },
    {
      title: "QUALITY EDUCATION",
      description: "BPP believes that education is one of the most powerful and proven vehicles for sustainable development. The goal is to ensure that all girls and boys complete primary and secondary schooling. It also eliminate gender and wealth disparities and achieve universal access to a quality higher education.",
      imgSrc: img10,
      icon: GraduationCap
    }
  ];

  return (
    <Layout>
      <HeaderComponent
        heading="Bharatiya Popular Party Goals"
        text="Bharatiya Popular Party is dedicated to a united, prosperous India. We fight for equal opportunity, quality healthcare and education, industrial growth and upliftment of farmers. We believe in socialism, secularism and democracy and would uphold the sovereignty, unity and integrity of India."
        breadcrumbLinks={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "BPP Goals", href: "/bpp-goals" }
        ]}
        imgUrl={img1}
      />
      <section className="py-8">
        <div className="container">
          <div className="flex flex-col items-center gap-6 mx-auto text-center">
            <div className="grid grid-cols-1 gap-8 place-items-center sm:grid-cols-2 lg:grid-cols-3">
              {goals.map((goal, index) => (
                <GoalCard
                  key={index}
                  title={goal.title}
                  description={goal.description}
                  imgSrc={goal.imgSrc}
                  icon={goal.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GoalsPage;
