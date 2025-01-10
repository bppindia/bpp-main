import HeaderComponent from "@/components/HeaderComponent";
import Layout from "@/layout/Layout";
import { ArrowRight, ShieldCheck, Users } from "lucide-react";


const VendorDisclosure = () => {
  return (
    <Layout>
      <HeaderComponent
        heading="Vendor disclosure"
        text="Vendor disclosure"
        breadcrumbLinks={[
          { label: "Home", href: "/" },
          { label: "Business Community", href: "/" },
          { label: "Vendor disclosure", href: "/business-community/vendor-disclosure" }
        ]}
        imgUrl={"null"}
      />
      <section className="py-10 relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Title Section */}
          <div className="mb-12 flex items-start justify-between">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">Vendor Disclosure Statement</h2>
            </div>
          </div>
          {/* Main Content Grid */}
          <div className="grid gap-8 md:grid-cols-12">
            {/* Primary Statement - Spans full width */}
            <div className="md:col-span-12 border-l-4 pl-6" style={{ borderLeftColor: '#e85a32' }}>
              <p className="text-xl leading-relaxed">
                As a vendor or supplier associated with Bharatiya Political Party, I hereby confirm that I am a registered member of the party, as well as an active participant in the party’s community contribution app.
              </p>
            </div>
            {/* Two Column Section */}
            <div className="md:col-span-6 flex flex-col space-y-8">
              <div className="relative group flex-1">
                <div className="p-6 border rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: '#e85a32' }}>
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold"> I promise to uphold the values of the party and to provide the best possible service and products to support  the party's objectives.</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-6 flex flex-col space-y-8">
              <div className="relative group flex-1">
                <div className="p-6 border rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: '#e85a32' }}>
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">  I also confirm to ensure that the prices I offer are reasonable and competitive, while maintaining the high standards of quality in the products and services I provide to the party's community.</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Final Statement - Spans full width */}
            <div className="md:col-span-12">
              <div className="flex items-center gap-4 p-6 border rounded-lg">
                <ArrowRight className="w-6 h-6 flex-shrink-0" style={{ color: '#e85a32' }} />
                <p className="text-lg">
                  My primary focus will not be on maximizing profits, but on supporting the core objective of community contribution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VendorDisclosure;