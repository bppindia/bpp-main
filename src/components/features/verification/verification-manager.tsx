import { useEffect, useState } from "react";
import { postData } from "@/api/apiClient";
import { needsVerification, needsPrimaryMembership } from "@/utils/roleAccess";
import { UserRole } from "@/utils/roleAccess";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ActiveMemberPaymentRequiredDialog } from "./active-member-payment-required-dialog";
import { PaymentRequiredDialog } from "./payment-required-dialog";
import { VerificationPendingDialog } from "./verification-pending-dialog";
import { DocumentResubmissionDialog } from "./document-resubmission-dialog";

type NotificationType = "PRIMARY" | "ACTIVE";

export function VerificationManager() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showActiveMemberDialog, setShowActiveMemberDialog] = useState(false);
  const [showResubmissionDialog, setShowResubmissionDialog] = useState(false);
  const [hasRequestedNotification, setHasRequestedNotification] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Check if user is rejected with unverified documents
    if (
      user.status === "REJECTED" &&
      user.unverifiedDocuments &&
      user.unverifiedDocuments.length > 0
    ) {
      setShowResubmissionDialog(true);
    }
    // Check if user needs verification
    else if (needsVerification(user)) {
      setShowVerificationDialog(true);
    }
    // Check if user needs to upgrade to primary membership
    else if (needsPrimaryMembership(user) && !hasRequestedNotification) {
      setShowPaymentDialog(true);
    }
    // Check if user is eligible for active membership upgrade
    else if (
      user.role === UserRole.PRIMARY_MEMBER &&
      user.membership?.type === "PRIMARY" &&
      user.referralProfile?.successfulReferrals &&
      user.referralProfile.successfulReferrals >= 10
    ) {
      setShowActiveMemberDialog(true);
    }
  }, [user, hasRequestedNotification]);

  const handleNotifyMe = async (notificationType: NotificationType = "PRIMARY") => {
    if (!user?._id || !user?.email) return;

    try {
      const response = await postData<{ success: boolean; message: string }>(
        "/users/membership/notification/notify",
        {
          userId: user._id,
          email: user.email,
          notificationType,
        }
      );

      if (response.data.success) {
        setHasRequestedNotification(true);
        toast({
          title: "Success",
          description: response.data.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.data.message || "Failed to submit notification request",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to submit notification request. Please try again later.",
      });
    }
  };

  return (
    <>
      {showResubmissionDialog && user && (
        <DocumentResubmissionDialog
          unverifiedDocuments={user.unverifiedDocuments || []}
          rejectionRemark={user.rejectionRemark || ""}
        />
      )}
      {showVerificationDialog && <VerificationPendingDialog />}
      {showPaymentDialog && (
        <PaymentRequiredDialog onNotifyMe={() => handleNotifyMe("PRIMARY")} />
      )}
      {showActiveMemberDialog && (
        <ActiveMemberPaymentRequiredDialog
          onNotifyMe={() => handleNotifyMe("ACTIVE")}
        />
      )}
    </>
  );
}