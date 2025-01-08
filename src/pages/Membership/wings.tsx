import HeaderComponent from '@/components/HeaderComponent';
import Layout from '@/layout/Layout';

const WingsPage = () => {
    const wings = [
        { name: "Labour Wing", description: "advocates for the rights of workers, ensuring their fair treatment, better wages, and improved working conditions. It works to address labour laws and to promote policies that protect workers' interests in various industries." },
        { name: "Farmer's Cell", description: "focuses on policies that benefit agricultural sector and works primarily for the welfare of farmers. Farmer wing advocate for fair prices for crops, and emphasise for better infrastructure in rural areas" },
        { name: "Intellectuals Wing", description: "comprises of academicians and professionals. The Wing provides insight into the party's policies through research and discussions. it helps shape the party's approach towards education, technology, science, and other intellectual streams." },
        { name: "Legal Cell", description: "is responsible for advising the party on legal matters, ensuring that its policies comply with the constitution and legal frameworks. It plays a key role in defending the party in legal matters. This also works for the protection of human rights and addressing legal reforms in areas such as civil welfare of farmer, social and governance."},
        { name: "Teachers Cell", description: "works to promote the interests of educators and the overall quality of education. It works on education policies and advocates the issues like improve teacher salaries, working conditions, and professional development opportunities. The wing also works to ensure that the education system focuses on the needs of students and teachers both." },
        { name: "Professional Cell", description: "It focuses on policies that encourage professional development and fair practices at the workplace. Wing serves the interests of various professional groups such as engineers, architects and other skilled workers. It also works to involve the maximum talent and skill in community contribution." },
        { name: "Doctors Cell", description: "works to improve the healthcare system and address the concerns of medical professionals. It works for better working conditions for doctors, proper healthcare and medical services funding. Wing also works for the improvement of public health systems. Ensuring to provide the affordable and accessible healthcare to the population is also one of their responsibilities." },
        { name: "Youth Wing", description: "focuses on the empowerment and engagement of young people in the political system. It works on policies related to employment, education, and youth welfare. The wing works to motivate the youth to become active participants in the party." },
        { name: "Student Wing", description: "is dedicated to represent the interests of students. It works on issues such as quality education, affordable fees, student welfare and availability of education to rural areas. The wing encourages students to actively participate in the party's activities and political matters." },
        { name: "Minority Cell", description: "focuses on the rights and welfare of minority groups. It works on policies aimed at protecting religious and cultural interests of minorities. Saving them from discrimination and ensuring equal opportunities in all the spheres." },
        { name: "Women Cell", description: "works towards promoting gender equality and empowering women in all sectors of society. It works on the policies that improve women's rights, including access to education, healthcare, and employment. The wing also works on addressing issues such as gender-based violence, women's safety, and political representation." },
    ];

    return (
        <Layout>
            <HeaderComponent
        heading="Wings"
        text="wings"
        breadcrumbLinks={[
          { label: "Home", href: "/" },
          { label: "Membership", href: "/membership" },
          { label: "wings", href: "/membership/wings" }
        ]}
        imgUrl={"null"} // Placeholder for header image
      />
            <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {wings.map((wing, index) => (
                        <div
                            key={index}
                            className="group relative p-6 border border-gray-200 rounded-lg shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                                {wing.name}
                            </h2>
                            <p className="text-gray-600 text-sm">
                                {wing.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default WingsPage;
