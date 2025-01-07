import About from '@/components/About';
import Login from '@/components/form/loginForm/index';
import BussinessCommunitySignup from '@/components/form/mutistepForm/bussinessCommunitySignup';
import MultiStepForm from '@/components/form/mutistepForm/signupForm';
import { useAuth } from '@/context/AuthContext';
import CommitmentToProgress from '@/pages/About/CommitmentToProgress';
import GetToKnow from '@/pages/About/GetToKnow';
import Goals from '@/pages/About/Goals';
import LogoMediaRequest from '@/pages/About/LogoMediaRequest';
import Volunteer from '@/pages/About/Volunteer';
import ForgetPin from '@/pages/auth/ForgetPin';
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from '@/pages/auth/ResetPassword';
import ResetPin from '@/pages/auth/ResetPin';
import EthicsVendorsSuppliers from '@/pages/BusinessCommunity/EthicsVendorsSuppliers';
import VendorSupplier from '@/pages/BusinessCommunity/VendorSupplier';
import Contact from '@/pages/Contact/Contact';
import CommunityContribution from '@/pages/contribution/CommunityContribution';
import HowItWorks from '@/pages/contribution/HowItWorks';
import DashboardPage from '@/pages/Dashboard';
import AccountSettingsPage from '@/pages/Dashboard/Account';
import CaseRegistrationForm from '@/pages/Dashboard/Community/CaseRegistration';
import Contribution from '@/pages/Dashboard/Community/contribution';
import Voting from '@/pages/Dashboard/Community/Voting';
import DonatePage from '@/pages/Dashboard/Donate';
import DonationPage from '@/pages/Dashboard/Donate/Donation';
import GoalsPage from '@/pages/Dashboard/Goals';
import Membership from '@/pages/Dashboard/Membership';
import MembershipCertificate from '@/pages/Dashboard/Membership/Certificate';
import ReferralPage from '@/pages/Dashboard/Membership/Referral';
import RenewalsPage from '@/pages/Dashboard/Membership/Renewals';
import ProfilePage from '@/pages/Dashboard/Profile';
import ProfessionalPage from '@/pages/Dashboard/Profile/professional';
import Track from '@/pages/Dashboard/Track';
import TrackingDetails from '@/pages/Dashboard/Track/TrackingDetails';
import WalletPage from '@/pages/Dashboard/Wallet';
import AddFund from '@/pages/Dashboard/Wallet/AddFund';
import Transactions from '@/pages/Dashboard/Wallet/Transactions';
import WithdrawPage from '@/pages/Dashboard/Wallet/Withdraw';
import Home from '@/pages/Home/Home';
import CollaborativeNetwork from '@/pages/join/CollaborativeNetwork';
import TransparentDecisionMaking from '@/pages/join/DecisionMaking';
import DirectParticipation from '@/pages/join/DirectParticipation';
import EarnRepresentation from '@/pages/join/EarnRepresentation';
import ActiveMembershipTerm from '@/pages/Membership/ActiveMembershipTerm';
import Join from '@/pages/Membership/JoinNow';
import MembershipPrivilege from '@/pages/Membership/MembershipPrivilege';
import MembershipRenewal from '@/pages/Membership/MembershipRenewal';
import Mission from '@/pages/Mission/Mission';
import PageNotFound from '@/pages/NotFound/PageNotFound';
import { Payment } from '@/pages/Payment/Payment';
import PrivacyPolicy from '@/pages/PrivacyPolicy/PrivacyPolicy';
import CustomerService from '@/pages/support/CustomerService';
import TermsAndConditions from '@/pages/TermsAndCondtions/TermsAndCondtions';
import Vision from '@/pages/Vision/Vision';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();
    return (
            <Routes>
                {/* Main Routes */}
                <Route path="/" element={<Home />} />

                {/* Auth Routes */}
                <Route path="auth">
                    {/* <Route path="signup" element={<Register />} /> */}
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
                    <Route path="bpp-goals" element={<Goals />} />
                    <Route path="get-to-know-bpp" element={<GetToKnow />} />
                    <Route path="commitment-progress" element={<CommitmentToProgress />} />
                    <Route path="volunteer" element={<Volunteer />} />
                    <Route path="logo-media-request" element={<LogoMediaRequest />} />
                </Route>

                {/* Membership Routes */}
                <Route path="membership">
                    <Route path="join-now" element={<Join />} />
                    <Route path="renewals" element={<MembershipRenewal />} />
                    <Route path="membership-privilege" element={<MembershipPrivilege />} />
                    <Route path="membership-term" element={<ActiveMembershipTerm />} />
                </Route>

                {/* Business Community Routes */}
                <Route path="business-community">
                    <Route path="vendor-suppliers" element={<VendorSupplier />} />
                    <Route path="ethics" element={<EthicsVendorsSuppliers />} />
                </Route>

                {/* Join Now Routes */}
                <Route path="join">
                    <Route path="direct-participation" element={<DirectParticipation />} />
                    <Route path="collaborative-networks" element={<CollaborativeNetwork />} />
                    <Route path="transparent-decision-making" element={<TransparentDecisionMaking />} />
                    <Route path="earn-representation" element={<EarnRepresentation />} />
                </Route>


                {/* community Contribution Routes */}
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



                <Route
                    path="dashboard/*"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Routes>
                                <Route path="home" element={<DashboardPage />} />
                                <Route path="goal" element={<GoalsPage />} />
                                <Route path="profile" element={<ProfilePage />} />
                                <Route path="professional-profile" element={<ProfessionalPage />} />
                                <Route path="account" element={<AccountSettingsPage />} />
                                <Route path="wallet" element={<WalletPage />} />
                                <Route path="transaction" element={<Transactions />} />
                                <Route path="add-fund" element={<AddFund />} />
                                <Route path="withdraw" element={<WithdrawPage />} />
                                <Route path="referral" element={<ReferralPage />} />
                                <Route path="renewal" element={<RenewalsPage />} />
                                <Route path="certificate" element={<MembershipCertificate />} />
                                <Route path="donate" element={<DonatePage />} />
                                <Route path="add-donation" element={<DonationPage />} />
                                <Route path="register-case" element={<CaseRegistrationForm />} />
                                <Route path="community-contribution" element={<Contribution />} />
                                <Route path="voting" element={<Voting />} />
                                <Route path="track" element={<Track />} />
                                <Route path="track-details" element={<TrackingDetails />} />
                                <Route path="payment-gateway" element={<Payment />} />

                                {/* membership */}
                                <Route path="membership" element={<Membership />} />
                            </Routes>
                        </ProtectedRoute>
                    }
                />

                {/* 404 Route */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
    );
};

export default AppRoutes;