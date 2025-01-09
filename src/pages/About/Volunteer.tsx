import volunteer from '@/assets/images/headerBanners/volunteer.png';
import HeaderComponent from "@/components/HeaderComponent";
import { Button } from "@/components/ui/button";
import Layout from "@/layout/Layout";
import { Building2, Heart, Scale, Users } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Volunteer = () => {
  const navigate = useNavigate()
  return (
    <Layout>
      <HeaderComponent
        heading="Become a Volunteer"
        text=""
        breadcrumbLinks={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Volunteer", href: "/about/volunteer" }
        ]}
        imgUrl={volunteer}
      />

      <div className="my-6">
        {/* Hero Section */}
        <div className="container max-w-7xl">
          <div className="mx-auto  px-4 md:px-8">
            <div className="">
              <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Are you <span className="text-[#e75a33]">18 years or older</span> and passionate about making a difference in society?
              </h1>
              <p className="text-sm mb-3 text-gray-800 dark:text-gray-300">
                The <span className="font-semibold">Bharatiya Popular Party (BPP)</span> invites you to join us as a <span className="font-semibold">volunteer</span> and contribute to building a stronger and prosperous Nation.
              </p>
                <ul className="list-disc list-inside text-sm mb-3 text-gray-800 dark:text-gray-300">
                <li className="mb-2">
                  Should share and commit to the principles of <span className="font-semibold">democracy, secularism, and socialism</span>.
                </li>
                <li className="mb-2">
                  Be a part of initiatives that uplift marginalized sections of society.
                </li>
                <li className="mb-2">
                  Work towards equal opportunities and improving access to education, healthcare, and employment.
                </li>
                </ul>
              <Button className="bg-[#e75a33] text-white hover:bg-[#e75a33] text-lg px-5 py-4">
                Join Now
              </Button>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="container my-12">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">We Believe In</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Justice */}
            <div className="group text-center transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#e75a33] rounded-full group-hover:bg-[#e75a33] transition-colors">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mt-4 text-gray-800 group-hover:text-[#e75a33] dark:text-white group-hover:dark:text-[#e75a33] transition-colors">Justice</h3>
              <p className="mt-2 text-gray-600 text-sm dark:text-gray-300">
                Ensuring fairness and equality for everyone in every aspect of life.
              </p>
            </div>

            {/* Peace */}
            <div className="group text-center transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#e75a33] rounded-full group-hover:bg-[#e75a33] transition-colors">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mt-4 text-gray-800 group-hover:text-[#e75a33] dark:text-white group-hover:dark:text-[#e75a33] transition-colors">Peace</h3>
              <p className="mt-2 text-gray-600 text-sm dark:text-gray-300">
                Building harmony and fostering understanding among communities.
              </p>
            </div>

            {/* Calm */}
            <div className="group text-center transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#e75a33] rounded-full group-hover:bg-[#e75a33] transition-colors">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mt-4 text-gray-800 group-hover:text-[#e75a33] dark:text-white group-hover:dark:text-[#e75a33] transition-colors">Calm</h3>
              <p className="mt-2 text-gray-600 text-sm dark:text-gray-300">
                Encouraging mindfulness and inner tranquility for a balanced society.
              </p>
            </div>

            {/* Prosperity */}
            <div className="group text-center transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#e75a33] rounded-full group-hover:bg-[#e75a33] transition-colors">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mt-4 text-gray-800 group-hover:text-[#e75a33] dark:text-white group-hover:dark:text-[#e75a33] transition-colors">Prosperity</h3>
              <p className="mt-2 text-gray-600 text-sm dark:text-gray-300">
                Striving for economic growth and success for all citizens.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#e75a33] text-white py-12 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-md mb-8 text-white-800 dark:text-gray-300">
              Your support holds the power to drive India’s development. Let us work together towards a world full of opportunities for growth and progress. Together, we can rebuild our nation and make it a better place to live, work, and thrive.
            </p>
            <Button className="bg-white text-black hover:bg-white  hover:text-[#e75a33] text-sm px-4 py-3"
            onClick={()=> navigate('/membership/wings')}
            >
              Become a Volunteer
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Volunteer;
