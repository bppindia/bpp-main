import Layout from "@/layout/Layout";
import React from "react";
import homepagebanner from "/homepagebanner.png";
import bppflag from "/bppflag.png";
import { GraduationCap, Handshake, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WhyBpp = () => {
    const navigate = useNavigate()
  return (
    <Layout>
      <section className="text-gray-700 body-font">
        <div className="container mx-auto flex px-5 py-36 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
              Why Join BPP?
            </h1>
            <p className="mb-1 leading-relaxed">
              - Have a direct say in the policies and decisions that impact you
              as a citizen.
            </p>
            <p className="mb-1 leading-relaxed">
              - Benefit from connections using each other’s expertise, knowledge
              and resources.
            </p>
            <p className="mb-1 leading-relaxed">
              - Be the part of a process where your voice is heard, and
              decisions are made with clarity and openness.
            </p>
            <p className="mb-4 leading-relaxed">
              - Be responsive to the people’s need and earn the opportunity to
              be your area’s representative.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={()=> navigate('/')}
              >
                Enroll Now
              </button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg"
              >
                Benefits
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={bppflag}
            />
          </div>
        </div>
      </section>

      <section className="text-gray-700 body-font border-t border-gray-200">
        <div
          className="relative py-20 bg-cover bg-no-repeat bg-fixed"
          style={{ backgroundImage: `url(${homepagebanner})` }}
        >
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <div className="relative z-10">
            <div className="container px-5 py-10 mx-auto">
              <div className="flex flex-col text-center w-full mb-10">
                <h2 className="text-lg text-white font-bold tracking-widest title-font mb-1">
                  PARTY'S PEOPLE
                </h2>
                <div className="leading-relaxed text-lg text-white mb-4 font-semibold">
                  The Party intends to create an environment where every citizen
                  has a voice, where transparency is the norm, and where
                  decision-making is a collective process. The Party is aimed to
                  ensure that all voices are heard, and all perspectives are
                  considered.
                </div>
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-white">
                  Every class of society will play an important role in the
                  Party.
                </h1>
              </div>
              <div className="flex flex-wrap -m-4 justify-center">
                <div className="p-4 md:w-1/3">
                  <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                        <UsersRound />
                      </div>
                      <h2 className="text-gray-900 text-lg title-font font-medium">
                        Common Man
                      </h2>
                    </div>
                    <div className="flex-grow">
                      <a className="mt-3 text-indigo-500 inline-flex items-center">
                        Learn More
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:w-1/3">
                  <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                        <GraduationCap />
                      </div>
                      <h2 className="text-gray-900 text-lg title-font font-medium">
                        Professionals
                      </h2>
                    </div>
                    <div className="flex-grow">
                      <a className="mt-3 text-indigo-500 inline-flex items-center">
                        Learn More
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:w-1/3">
                  <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                        <Handshake />
                      </div>
                      <h2 className="text-gray-900 text-lg title-font font-medium">
                        Business Community
                      </h2>
                    </div>
                    <div className="flex-grow">
                      {/* <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p> */}
                      <a className="mt-3 text-indigo-500 inline-flex items-center">
                        Learn More
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="leading-relaxed text-2xl  text-center text-white my-4 font-semibold">
                and each member will be benefitted with the contribution of each
                other.
              </div>
              <div className="leading-relaxed text-lg  text-center text-white my-4 font-semibold">
                The Party intends to create an environment where every citizen
                has a voice, where transparency is the norm, and where
                decision-making is a collective process. The Party is aimed to
                ensure that all voices are heard, and all perspectives are
                considered.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-700 body-font border-t border-gray-200">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap w-full mb-12 flex-col items-center text-center">
      <h1 className="sm:text-4xl text-3xl font-medium title-font mb-6 text-gray-900">
        Key Benefits of Joining BPP
      </h1>
      <div className="lg:w-2/3 w-full leading-relaxed text-base text-left">
        <ul className="list-disc list-inside space-y-4">
          <li>
            <strong>No Joining Fee:</strong> We believe every citizen should have equal access to participate in nation-building without any financial barriers.
          </li>
          <li>
            <strong>Inclusive Membership:</strong> Irrespective of gender, age, caste, religion, etc., all people of India above 18 years of age can join BPP.
          </li>
          <li>
            <strong>Value for Diversity:</strong> We ensure that representatives are chosen based on education, expertise, and experience, rather than popularity.
          </li>
          <li>
            <strong>Exchange of Expertise:</strong> BPP enables members to exchange their expertise across various fields—education, medical, legal, taxation, and beyond.
          </li>
          <li>
            <strong>Collective Decision-Making:</strong> Major decisions are made through collective inputs from members using a streamlined process like DAO, ensuring majority opinion.
          </li>
        </ul>
      </div>
    </div>

    <div className="flex flex-wrap w-full mb-12 flex-col items-center text-center">
      <h2 className="sm:text-4xl text-3xl font-medium title-font mb-6 text-gray-900">
        How BPP Runs
      </h2>
      <p className="lg:w-2/3 w-full leading-relaxed text-base mb-6">
        Based on people’s collective preferences and opinions, representatives are chosen among members to perform various roles.
      </p>

      <div className="lg:w-2/3 w-full text-left bg-gray-100 p-8 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium title-font mb-4 text-gray-900">
          Representative Roles
        </h3>
        <ul className="list-disc list-inside space-y-4">
          <li><strong>Kary Vahak:</strong> Village level representative.</li>
          <li><strong>Kary Sewak:</strong> Block level representative.</li>
          <li><strong>Kary Prbandhak:</strong> District level representative.</li>
          <li><strong>Kary Pramukh:</strong> State/UT level representative.</li>
          <li><strong>Founder President:</strong> National level representative.</li>
        </ul>

        <p className="leading-relaxed mt-6">
          Members will nominate or vote for each other for representative roles based on qualifications and experience. The majority wins, ensuring representatives have broad support. Decisions are made with input from all members, using surveys and opinion polls to gather feedback.
        </p>
      </div>
    </div>
  </div>
</section>

      <section className="text-gray-700 body-font border-t border-gray-200">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-12 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Get Started Today
            </h1>
            <p className="lg:w-2/3 w-full leading-relaxed text-base mb-4">
              Join the BPP's Platform and be a part of a dynamic and transparent
              community. Your voice matters, and together, we can drive
              meaningful change.
            </p>
            <p className="lg:w-2/3 w-full leading-relaxed text-base mb-8">
              Sign up now and start contributing to a brighter future with a
              decentralized society for all.
            </p>
          </div>

          <div className="max-w-2xl mx-auto text-left bg-gray-100 p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium title-font mb-4 text-gray-900">
              Enrolment Process
            </h2>
            <ul className="list-decimal list-inside leading-relaxed mb-6">
              <li>Enrol now by filling out the form provided.</li>
              <li>There are no costs or fees involved.</li>
              <li>
                You will receive a notification at your registered email to
                confirm your registration.
              </li>
              <li>
                By signing up, you will receive all updates and notifications
                from BPP.
              </li>
            </ul>
            <button className="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
             onClick={()=> navigate('/')}
             >
              Enroll Now
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhyBpp;
