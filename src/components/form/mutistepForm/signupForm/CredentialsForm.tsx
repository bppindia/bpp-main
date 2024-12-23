import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormWrapper } from "./FormWrapper";
import { PasswordInput } from "@/components/features/password-input";

type CredentialsData = {
  password: string;
  confirmPassword: string;
  referralCode: string;
};

type CredentialsFormProps = CredentialsData & {
  updateFields: (fields: Partial<CredentialsData>) => void;
};

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  password,
  confirmPassword,
  referralCode,
  updateFields,
}) => {
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  }, [password, confirmPassword]);

  return (
    <FormWrapper title="Credentials Details">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div>
          <Label htmlFor="password">
            Password <span className="text-red-700">*</span>
          </Label>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => updateFields({ password: e.target.value })}
            autoComplete="password"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">
            Confirm Password <span className="text-red-700">*</span>
          </Label>
          <PasswordInput
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) =>
              updateFields({ confirmPassword: e.target.value })
            }
            autoComplete="confirm-password"
          />
          {passwordError && (
            <p className="text-red-600 text-xs">{passwordError}</p>
          )}
        </div>
        <div>
          <Label htmlFor="referralCode">Referral Code (Optional)</Label>
          <Input
            id="referralCode"
            type="text"
            placeholder="Referral code"
            value={referralCode}
            onChange={(e) => updateFields({ referralCode: e.target.value })}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default CredentialsForm;
