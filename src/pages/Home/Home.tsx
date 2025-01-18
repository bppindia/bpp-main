import DownloadSection from "@/components/hero/download-section";
import Newsletter from "@/components/Newsletter";
import CommunityContributionSection from "@/components/others/community-section";
import PresidentMessage from "@/components/others/president-message";
import { HomeSlider } from "@/components/slider/index";
import VisionMission from "@/components/VisionMission";
import { Helmet } from 'react-helmet-async';
import Layout from "../../layout/Layout";

function Home() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Bharatiya Popular Party",
            url: "https://bppindia.com",
            logo: "https://bppdatabase.s3.ap-south-1.amazonaws.com/assets/bppLogo.png",
            description: "Bharatiya Popular Party is a progressive political organization dedicated to national development.",
            sameAs: [
              "https://x.com/BharatiyaP20295",
              "https://www.facebook.com/profile.php?id=61570250152842",
              "https://www.instagram.com/bharatiya_popular_party",
              "https://www.linkedin.com/in/bharatiya-popular-party-b28543340/",
            ],
          })}
        </script>
      </Helmet>
      <Layout>
        <HomeSlider />
        <PresidentMessage />
        {/* <CounterMembers /> */}
        <DownloadSection />
        <VisionMission />
        <CommunityContributionSection />
        {/* <RecruitmentBanner /> */}
        <Newsletter />
      </Layout>
    </>
  );
}

export default Home;
