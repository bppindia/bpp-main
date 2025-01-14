import HeaderComponent from "@/components/HeaderComponent";
import Layout from "@/layout/Layout";


const PrivacyPolicy = () => {
  return (
    <Layout>
      <HeaderComponent
        heading="Privacy Policy"
        text="Our Privacy Policy"
        breadcrumbLinks={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy-policy" },
        ]}
        imgUrl={"null"}
      />
      <div className="container mx-auto max-w-7xl py-12 px-4 md:px-6">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="mt-2 text-muted-foreground italic">Last updated on January 14, 2025.</p>
            <div className="my-3 text-muted-foreground">
              Your privacy is important to <span className="text-blue-700 font-semibold">www.bppindia.com</span> This privacy statement provides information about the personal information that the App collects, and the ways in which the App uses that personal information.
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Personal information collection</h2>
            <p className="mt-2 text-muted-foreground">
              The App may collect and use the following kinds of personal information:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                information about your use of this App
              </li>
              <li>
                information that you provide using for the purpose of registering with the App
              </li>
              <li>
                information about the consultations you seek or provide over this App.
              </li>
              <li>
                information about the contributions you seek out over this App.
              </li>
              <li>
                information about the contributions you provide over this App.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Permissible Age</h2>
            <p className="mt-2 text-muted-foreground">
              Being a political party and as per party's constitution, we are not intended for users under the age of 18, If we become aware that a person registering and sharing personal information is under the Permissible Age, we will disapprove & delete the account and any related information as soon as possible. If you believe we might have any information from or about a user under the Permissible Age, please contact us at <a href="mailto:bpp.headoffice@gmail.com" className="underline text-blue-600">bpp.headoffice@gmail.com</a>
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Data Usage</h2>
            <p className="mt-2 text-muted-foreground">
              We use the personal information we collect for the following purposes:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                administer this App
              </li>
              <li>
                enable your access to and use of the App services
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Data Security</h2>
            <p className="mt-2 text-muted-foreground">
              The App will take reasonable technical and organisational precautions to prevent the loss, misuse or alteration of your personal information.
            </p>
            <p className="mt-2 text-muted-foreground">
              We take reasonable measures to protect your personal information from unauthorized access, use, or
              disclosure. This includes using encryption, access controls, and other security measures to protect your
              data.
            </p>
            <p className="mt-2 text-muted-foreground">
              The App will store all the personal information you provide on its secure servers.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">User Rights</h2>
            <p className="mt-2 text-muted-foreground">
              You have the following rights with respect to your personal information:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                <span className="font-medium">Access:</span> You can access to the personal information.
              </li>
              <li>
                <span className="font-medium">Correction:</span> You can request that we correct any inaccurate or incomplete personal information.
              </li>
              <li>
                <span className="font-medium">Deletion:</span> If you would like to review, change or delete personal information we have collected from you, or permanently delete your account, please contact us at  <a href="mailto:bpp.headoffice@gmail.com" className="underline text-blue-600">bpp.headoffice@gmail.com</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <p className="mt-2 text-muted-foreground">
              If you have any questions or concerns about our privacy policy or the way we handle your personal information,</p>
            <p className="text-muted-foreground">
              please contact us at <a href="mailto:bpp.headoffice@gmail.com" className="underline text-blue-600">bpp.headoffice@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
