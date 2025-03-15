// src/AppRoutes.tsx
import AutoScrollToTop from '@/components/auto-scroll-to-top';
import Login from '@/components/form/loginForm/index';
import BussinessCommunitySignup from '@/components/form/mutistepForm/bussinessCommunitySignup';
import MultiStepForm from '@/components/form/mutistepForm/signupForm';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/layout/DashboardLayout';
import About from '@/pages/About/About';
import CommitmentToProgress from '@/pages/About/CommitmentToProgress';
import GetToKnow from '@/pages/About/GetToKnow';
import LogoMediaRequest from '@/pages/About/LogoMediaRequest';
import Volunteer from '@/pages/About/Volunteer';
import ForgetPin from '@/pages/auth/ForgetPin';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';
import ResetPin from '@/pages/auth/ResetPin';
import EthicsVendorsSuppliers from '@/pages/BusinessCommunity/EthicsVendorsSuppliers';
import VendorDisclosure from '@/pages/BusinessCommunity/VendorDisclosure';
import VendorSupplier from '@/pages/BusinessCommunity/VendorSupplier';
import Contact from '@/pages/Contact/Contact';
import CommunityContribution from '@/pages/contribution/CommunityContribution';
import HowItWorks from '@/pages/contribution/HowItWorks';
import AccountSettingsPage from '@/pages/Dashboard/Account';
import CaseRegistrationForm from '@/pages/Dashboard/Community/CaseRegistration';
import Voting from '@/pages/Dashboard/Community/Voting';
import DonationPage from '@/pages/Dashboard/Donate/Donation';
import MembershipCertificate from '@/pages/Dashboard/Membership/Certificate';
import RenewalsPage from '@/pages/Dashboard/Membership/Renewals';
import Track from '@/pages/Dashboard/Track';
import TrackingDetails from '@/pages/Dashboard/Track/TrackingDetails';
import AddFund from '@/pages/Dashboard/Wallet/AddFund';
import Transactions from '@/pages/Dashboard/Wallet/Transactions';
import WithdrawPage from '@/pages/Dashboard/Wallet/Withdraw';
import DownloadAppPage from '@/pages/download';
import Dashboard from '@/pages/features/dashboard';
import Goals from '@/pages/features/goals';
import NationalIntegrity from '@/pages/features/goals/components/NationalIntegrity'; // Updated path
import EqualOpportunity from '@/pages/features/goals/components/EqualOpportunity';
import GoodHealth from '@/pages/features/goals/components/GoodHealth';
import AgainstMuscle from '@/pages/features/goals/components/AgainstMuscle';
import UpholdSecularism from '@/pages/features/goals/components/UpholdSecularism';
import IndustrialDev from '@/pages/features/goals/components/IndustrialDev';
import EmploymentGrowth from '@/pages/features/goals/components/EmploymentGrowth';
import JusticePeace from '@/pages/features/goals/components/JusticePeace';
import UpliftFarmers from '@/pages/features/goals/components/UpliftFarmers';
import QualityEducation from '@/pages/features/goals/components/QualityEducation';
import Home from '@/pages/Home/Home';
import CollaborativeNetwork from '@/pages/join/CollaborativeNetwork';
import TransparentDecisionMaking from '@/pages/join/DecisionMaking';
import DirectParticipation from '@/pages/join/DirectParticipation';
import EarnRepresentation from '@/pages/join/EarnRepresentation';
import ActiveMembershipTerm from '@/pages/Membership/ActiveMembershipTerm';
import CodeOfConduct from '@/pages/Membership/CodeOfConduct';
import Complaints from '@/pages/Membership/Complaints';
import Join from '@/pages/Membership/JoinNow';
import MembershipFaq from '@/pages/Membership/MembershipFaq';
import MembershipPrivilege from '@/pages/Membership/MembershipPrivilege';
import MembershipRenewal from '@/pages/Membership/MembershipRenewal';
import Mission from '@/pages/Mission/Mission';
import PageNotFound from '@/pages/NotFound/PageNotFound';
import { Payment } from '@/pages/Payment/Payment';
import PrivacyPolicy from '@/pages/PrivacyPolicy/PrivacyPolicy';
import CustomerService from '@/pages/support/CustomerService';
import TermsAndConditions from '@/pages/TermsAndCondtions/TermsAndCondtions';
import Vision from '@/pages/Vision/Vision';
import WingsPage from '@/pages/wings/wings';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Wallet from '@/pages/features/wallet';
import Donate from '@/pages/features/donate';
import Profile from '@/pages/features/profile';
import ProfessionalProfile from '@/pages/features/profile/professionals';
import Membership from '@/pages/features/membership';
import ComingSoon from '@/components/coming-soon';
import Referral from '@/pages/features/referal';
import PopupManager from '@/components/features/PopupManager';
import SupplierInclusion from '@/pages/BusinessCommunity/SupplierInclusion';
import Events from '@/pages/features/events';
import SettingsAccount from '@/pages/features/settings/account';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <AutoScrollToTop />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route path="auth">
          <Route path="signup" element={<MultiStepForm />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="forgot-pin" element={<ForgetPin />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="reset-pin" element={<ResetPin />} />
          <Route path="business-community-join" element={<BussinessCommunitySignup />} />
        </Route>

        {/* About Routes */}
        <Route path="about">
          <Route index element={<About />} />
          <Route path="about" element={<About />} />
          <Route path="bpp-goals" element={<Goals />} />
          <Route path="get-to-know-bpp" element={<GetToKnow />} />
          <Route path="commitment-progress" element={<CommitmentToProgress />} />
          <Route path="volunteer" element={<Volunteer />} />
          <Route path="logo-media-request" element={<LogoMediaRequest />} />
        </Route>

        {/* Membership Routes */}
        <Route path="membership">
          <Route path="faq" element={<MembershipFaq />} />
          <Route path="join-now" element={<Join />} />
          <Route path="upgrade-renewals" element={<MembershipRenewal />} />
          <Route path="privileges" element={<MembershipPrivilege />} />
          <Route path="wings" element={<WingsPage />} />
          <Route path="membership-term" element={<ActiveMembershipTerm />} />
          <Route path="code-of-conduct" element={<CodeOfConduct />} />
          <Route path="complaints" element={<Complaints />} />
        </Route>

        {/* Business Community Routes */}
        <Route path="business-community">
          <Route path="vendor-suppliers" element={<VendorSupplier />} />
          <Route path="disclosure" element={<VendorDisclosure />} />
          <Route path="ethics" element={<EthicsVendorsSuppliers />} />
          <Route path="inclusion" element={<SupplierInclusion />} />
          <Route path="join" element={<MultiStepForm />} />
        </Route>

        {/* Join Now Routes */}
        <Route path="join">
          <Route path="direct-participation" element={<DirectParticipation />} />
          <Route path="collaborative-networks" element={<CollaborativeNetwork />} />
          <Route path="transparent-decision-making" element={<TransparentDecisionMaking />} />
          <Route path="earn-representation" element={<EarnRepresentation />} />
        </Route>

        {/* Community Contribution Routes */}
        <Route path="community-contribution">
          <Route path="introduction" element={<CommunityContribution />} />
          <Route path="how-it-works" element={<HowItWorks />} />
        </Route>

        {/* Other Routes */}
        <Route path="vision" element={<Vision />} />
        <Route path="mission" element={<Mission />} />
        <Route path="contact" element={<Contact />} />
        <Route path="customer-support" element={<CustomerService />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />

        {/* Dashboard Routes with Sidebar Layout */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          {/* Goals Routes */}
          <Route path="goal">
            <Route index element={<Goals />} /> {/* Main Goals Page */}
            <Route path="1" element={<NationalIntegrity />} />
            <Route path="2" element={<EqualOpportunity />} />
            <Route path="3" element={<GoodHealth />} />
            <Route path="4" element={<AgainstMuscle />} />
            <Route path="5" element={<UpholdSecularism />} />
            <Route path="6" element={<IndustrialDev />} />
            <Route path="7" element={<EmploymentGrowth />} />
            <Route path="8" element={<JusticePeace />} />
            <Route path="9" element={<UpliftFarmers />} />
            <Route path="10" element={<QualityEducation />} />
          </Route>

          <Route path="wallet" element={<Wallet />} />
          <Route path="events" element={<Events />} />




          <Route path="donate" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><Donate /></ProtectedRoute>} />
          <Route path="referral" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><Referral /></ProtectedRoute>} />
          <Route path="profile" element={<Profile />} />
          <Route path="professional-profile" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><ProfessionalProfile /></ProtectedRoute>} />
          <Route path="membership" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><Membership /></ProtectedRoute>} />
          <Route path="community-contribution" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification restrictedFor="business"><ComingSoon /></ProtectedRoute>} />
          <Route path="business-community-join" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification restrictedFor="primary"><ComingSoon /></ProtectedRoute>} />
          <Route path="account" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><AccountSettingsPage /></ProtectedRoute>} />
          <Route path="transaction" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><Transactions /></ProtectedRoute>} />
          <Route path="add-fund" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><AddFund /></ProtectedRoute>} />
          <Route path="withdraw" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><WithdrawPage /></ProtectedRoute>} />
          <Route path="renewal" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><RenewalsPage /></ProtectedRoute>} />
          <Route path="certificate" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><MembershipCertificate /></ProtectedRoute>} />
          <Route path="add-donation" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><DonationPage /></ProtectedRoute>} />
          <Route path="register-case" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><CaseRegistrationForm /></ProtectedRoute>} />
          <Route path="voting" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><Voting /></ProtectedRoute>} />
          <Route path="track" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><Track /></ProtectedRoute>} />
          <Route path="track-details" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><TrackingDetails /></ProtectedRoute>} />
          <Route path="payment-gateway" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><Payment /></ProtectedRoute>} />
          <Route path="privacy-policy" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><PrivacyPolicy /></ProtectedRoute>} />
          <Route path="appearance" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><div>Appearance Settings</div></ProtectedRoute>} />
          <Route path="notifications" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><div>Notifications Settings</div></ProtectedRoute>} />
        </Route>

        {/* Independent Pages */}
        <Route path="/download-app" element={<DownloadAppPage />} />

        {/* 404 Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <PopupManager />
    </>
  );
};

export default AppRoutes;








// // src/routes/AppRoutes.tsx (relevant snippet)
// <Route
//   path="dashboard"
//   element={
//     <ProtectedRoute isAuthenticated={isAuthenticated}>
//       <DashboardLayout />
//     </ProtectedRoute>
//   }
// >
//   <Route index element={<Dashboard />} />
//   <Route path="goal" element={<Goals />} />
//   <Route path="wallet" element={<Wallet />} />
//   <Route path="donate" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><Donate /></ProtectedRoute>} />
//   <Route path="referral" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><Referral /></ProtectedRoute>} />
//   <Route path="profile" element={<Profile />} />
//   <Route path="professional-profile" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><ProfessionalProfile /></ProtectedRoute>} />
//   <Route path="membership" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><Membership /></ProtectedRoute>} />
//   <Route path="community-contribution" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification restrictedFor="business"><ComingSoon /></ProtectedRoute>} />
//   <Route path="business-community-join" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification restrictedFor="primary"><ComingSoon /></ProtectedRoute>} />

//   {/* Updated Settings Routes */}
//   <Route path="settings">
//     <Route path="account" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><AccountSettingsPage /></ProtectedRoute>} />
//     <Route path="appearance" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><div>Appearance Settings</div></ProtectedRoute>} />
//     <Route path="notifications" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><div>Notifications Settings</div></ProtectedRoute>} />
//     <Route path="terms-and-conditions" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><TermsAndConditions /></ProtectedRoute>} />
//     <Route path="privacy-policy" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><PrivacyPolicy /></ProtectedRoute>} />
//   </Route>

//   <Route path="customer-support" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><CustomerService /></ProtectedRoute>} />
//   <Route path="transaction" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><Transactions /></ProtectedRoute>} />
//   <Route path="add-fund" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><AddFund /></ProtectedRoute>} />
//   <Route path="withdraw" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><WithdrawPage /></ProtectedRoute>} />
//   <Route path="renewal" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><RenewalsPage /></ProtectedRoute>} />
//   <Route path="certificate" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><MembershipCertificate /></ProtectedRoute>} />
//   <Route path="add-donation" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><DonationPage /></ProtectedRoute>} />
//   <Route path="register-case" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><CaseRegistrationForm /></ProtectedRoute>} />
//   <Route path="voting" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><Voting /></ProtectedRoute>} />
//   <Route path="track" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><Track /></ProtectedRoute>} />
//   <Route path="track-details" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><TrackingDetails /></ProtectedRoute>} />
//   <Route path="payment-gateway" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredVerification><Payment /></ProtectedRoute>} />
// </Route>