import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldErrors } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { FundRequirementFormValues } from '@/schema/caseRegistrationSchema/legal/schema';
import { IndianRupee } from 'lucide-react';

interface PercentageAmountInputProps {
    percentageName: keyof FundRequirementFormValues;
    amountName: keyof FundRequirementFormValues;
    label: string;
    errors: FieldErrors<FundRequirementFormValues>;
    disabled?: boolean;
    onAmountChange: (value: number) => void;
}

export function PercentageAmountInput({
    percentageName,
    amountName,
    label,
    errors,
    disabled = false,
    onAmountChange,
}: PercentageAmountInputProps) {
    const { register } = useFormContext<FundRequirementFormValues>();

    return (
        <div>
            <Label className="block text-sm font-medium text-primary mb-2">
                {label}
            </Label>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="flex rounded-lg shadow-sm">
                        <Input
                            id={percentageName}
                            type="text"
                            disabled={disabled}
                            className="-me-px flex-1 rounded-e-none"
                            placeholder="Percentage"
                            {...register(percentageName)}
                        />
                        <div className="inline-flex w-9 items-center justify-center rounded-e-lg border border-input bg-background">
                            <span className="text-sm">%</span>
                        </div>
                    </div>
                    {errors[percentageName] && (
                        <span className="text-sm text-destructive">{errors[percentageName]?.message}</span>
                    )}
                </div>
                <div>
                    <div className="flex rounded-lg shadow-sm">
                        <Input
                            id={amountName}
                            type="number"
                            disabled={disabled}
                            className="-me-px flex-1 rounded-e-none"
                            placeholder="Amount"
                            {...register(amountName, {
                                valueAsNumber: true,
                                onChange: (e) => onAmountChange(parseFloat(e.target.value) || 0),
                            })}
                        />
                        <div className="inline-flex w-9 items-center justify-center rounded-e-lg border border-input bg-background">
                            <IndianRupee size={16} strokeWidth={2} />
                        </div>
                    </div>
                    {errors[amountName] && (
                        <span className="text-sm text-destructive">{errors[amountName]?.message}</span>
                    )}
                </div>
            </div>
        </div>
    );
}