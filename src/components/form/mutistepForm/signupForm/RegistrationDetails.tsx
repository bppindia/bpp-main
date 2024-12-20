import { FileInput } from "@/components/FileInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { FormWrapper } from "./FormWrapper";

type RegistrationData = {
    aadhaarNumber: string;
    aadhaarCard: File | null;
    voterId?: string;
    voterCard?: File | null;
    serveCommunityAccepted?: boolean;
};

type RegistrationFormProps = RegistrationData & {
    updateFields: (fields: Partial<RegistrationData>) => void;
};

export function RegistrationForm({
    aadhaarNumber,
    voterId,
    updateFields,
}: RegistrationFormProps) {
    const [serveCommunity, setServeCommunity] = useState<boolean | null>(null);

    const handleServeAccepted = (value: boolean) => {
        setServeCommunity(value);
        updateFields({ serveCommunityAccepted: value });
    };

    return (
        <FormWrapper title="User Details">
            <div className="grid gap-6">
                {/* Row 1: Name Fields */}
                <div className="text-xs text-center text-muted-foreground font-semibold">
                    * Providing your Aadhar card details is mandatory for completing this process.
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="aadhaarNumber">Aadhaar Number <span className="text-red-700">*</span></Label>
                        <Input
                            id="aadhaarNumber"
                            placeholder="Enter Aadhaar Number"
                            value={aadhaarNumber}
                            required
                            onChange={(e) => updateFields({ aadhaarNumber: e.target.value })}
                        />
                    </div>
                    <div>
                        <FileInput
                            id="aadhaarCard"
                            label="Aadhaar Card"
                            required
                            onChange={(file) => {
                                if (file && !['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
                                    toast.error('Please upload a valid file (JPEG, PNG, or PDF)');
                                    return;
                                }
                                if (file && file.size > 5 * 1024 * 1024) {
                                    toast.error('File size should be less than 5 MB');
                                    return;
                                }
                                updateFields({ aadhaarCard: file });
                            }}
                        />
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
                    <span className="mx-4 text-neutral-500 dark:text-neutral-400">or</span>
                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
                </div>
                <div className="text-xs text-center text-muted-foreground font-semibold">
                    * Providing our Voter ID card details is optional.
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="voterId">Voter ID / Electoral Card </Label>
                        <Input
                            id="voterId"
                            placeholder="Enter Voter ID"
                            value={voterId}
                            onChange={(e) => updateFields({ voterId: e.target.value })}
                        />
                    </div>
                    <div>
                        <FileInput
                            id="voterCard"
                            label="Voter / Electoral Card"
                            onChange={(file) => {
                                if (file && !['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
                                    toast.error('Please upload a valid file (JPEG, PNG, or PDF)');
                                    return;
                                }
                                if (file && file.size > 5 * 1024 * 1024) {
                                    toast.error('File size should be less than 5 MB');
                                    return;
                                }
                                updateFields({ voterCard: file });
                            }}
                        />
                    </div>
                </div>
                <div>If you wish to serve the community as a professional? <span className="text-red-700">*</span></div>
                <div className="flex gap-4">
                    <Label>
                        <Checkbox
                            checked={serveCommunity === true}
                            onCheckedChange={() => handleServeAccepted(true)}
                        />
                        Yes
                    </Label>
                    <Label>
                        <Checkbox
                            checked={serveCommunity === false}
                            onCheckedChange={() => handleServeAccepted(false)}
                        />
                        No
                    </Label>
                </div>
                <div className="text-xs text-center text-red-500 font-semibold">
                    * upload clear image of Aadhaar and voter ID
                </div>
            </div>
        </FormWrapper>
    );
}
