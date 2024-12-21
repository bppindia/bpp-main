import { FileInput } from "@/components/FileInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FormWrapper } from "./FormWrapper";

type RegistrationData = {
    aadhaarNumber: string;
    voterId?: string;
    aadhaarFront: File | null;
    aadhaarBack: File | null;
    voterFront?: File | null;
    voterBack?: File | null;
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
    const [serveCommunity, setServeCommunity] = useState<boolean | false>(false);
    const [aadhaarError, setAadhaarError] = useState<string>("");
    const [voterIdError, setVoterIdError] = useState<string>("");

    const handleServeAccepted = (value: boolean) => {
        setServeCommunity(value);
        updateFields({ serveCommunityAccepted: value });
    };

    const validateAadhaarNumber = (value: string) => {
        const aadhaarRegex = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
        return aadhaarRegex.test(value);
    };

    const validateVoterId = (value: string) => {
        const voterIdRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return voterIdRegex.test(value);
    };

    const formatAadhaarNumber = (value: string) => {
        // Remove all spaces from the input
        const digitsOnly = value.replace(/\s/g, "");

        // Only allow numbers
        const numbersOnly = digitsOnly.replace(/[^\d]/g, "");

        // Limit to 12 digits
        const truncated = numbersOnly.slice(0, 12);

        // Add spaces after every 4 digits
        const formatted = truncated.replace(/(\d{4})/g, "$1 ").trim();

        return formatted;
    };

    const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const formattedValue = formatAadhaarNumber(rawValue);

        updateFields({ aadhaarNumber: rawValue });

        if (!formattedValue) {
            setAadhaarError("Aadhaar number is required");
        } else if (formattedValue.replace(/\s/g, "").length === 12) {
            if (!validateAadhaarNumber(formattedValue)) {
                setAadhaarError("Please enter a valid Aadhaar number (e.g., 2345 6789 0123)");
            } else {
                setAadhaarError("");
            }
        } else {
            setAadhaarError("Aadhaar number must be 12 digits");
        }
    };

    return (
        <FormWrapper title="User Details">
            <div className="grid gap-2">
                <div className="text-xs text-center text-muted-foreground font-semibold">
                    * Providing your Aadhaar card details is mandatory for completing this process.
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <Label htmlFor="aadhaarNumber">
                            Aadhaar Number <span className="text-red-700">*</span>
                        </Label>
                        <Input
                            id="aadhaarNumber"
                            placeholder="eg 2345 6789 0123"
                            value={aadhaarNumber}
                            required
                            maxLength={12} // 12 digits + 2 spaces
                            className={aadhaarError ? "border-red-500 focus:ring-red-500" : ""}
                            onChange={handleAadhaarChange}
                        />
                        {aadhaarError && (
                            <p className="text-xs text-red-500 mt-1">{aadhaarError}</p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <FileInput
                            id="aadhaarFront"
                            label="Aadhaar Card Front"
                            required
                            onChange={(file) => {
                                if (file && !['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
                                    return;
                                }
                                if (file && file.size > 5 * 1024 * 1024) {
                                    return;
                                }
                                updateFields({ aadhaarFront: file });
                            }}
                        />
                    </div>
                    <div>
                        <FileInput
                            id="aadhaarBack"
                            label="Aadhaar Card Back"
                            required
                            onChange={(file) => {
                                if (file && !['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
                                    return;
                                }
                                if (file && file.size > 5 * 1024 * 1024) {
                                    return;
                                }
                                updateFields({ aadhaarBack: file });
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
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <Label htmlFor="voterId">Voter ID / Electoral Card</Label>
                        <Input
                            id="voterId"
                            placeholder="Enter Voter ID"
                            value={voterId}
                            className={voterIdError ? "border-red-500 focus:ring-red-500" : ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                updateFields({ voterId: value });

                                if (value && !validateVoterId(value)) {
                                    setVoterIdError("Please enter a valid Voter ID Number");
                                } else {
                                    setVoterIdError("");
                                }
                            }}
                        />
                        {voterIdError && (
                            <p className="text-xs text-red-500 mt-1">{voterIdError}</p>
                        )}
                    </div>
                    <div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <FileInput
                                    id="voterFront"
                                    label="Voter Card Front"
                                    onChange={(file) => {
                                        if (file && !['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
                                            return;
                                        }
                                        if (file && file.size > 5 * 1024 * 1024) {
                                            return;
                                        }
                                        updateFields({ voterFront: file });
                                    }}
                                />
                            </div>
                            <div>
                                <FileInput
                                    id="voterBack"
                                    label="Voter Card Back"
                                    onChange={(file) => {
                                        if (file && !['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
                                            return;
                                        }
                                        if (file && file.size > 5 * 1024 * 1024) {
                                            return;
                                        }
                                        updateFields({ voterBack: file });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        Do you want to serve the community as a professional? <span className="text-red-700">*</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        <em>Serving the community as a professional member can help winning the confidence and increase your chances of being nominated as block head.</em>
                    </div>
                </div>

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