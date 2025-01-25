import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Percent, IndianRupee } from 'lucide-react';
import { FundRequirementFormValues } from '@/schemas';

interface PercentageAmountInputProps {
    percentageName: string;
    amountName: string;
    label: string;
    errors: any;
}

export function PercentageAmountInput({ percentageName, amountName, label, errors }: PercentageAmountInputProps) {
    const { register } = useFormContext<FundRequirementFormValues>();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Percentage Input */}
            <div>
                <Label>Percentage <span className="text-red-700">*</span></Label>
                <div className="flex rounded-lg shadow-sm shadow-black/5">
                    <Input
                        id={percentageName}
                        {...register(percentageName as keyof FundRequirementFormValues)}
                        className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
                        placeholder="Percentage"
                    />
                    <button
                        className="inline-flex w-9 items-center justify-center rounded-e-lg border border-input bg-background text-sm text-muted-foreground/80 outline-offset-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Percentage"
                    >
                        <Percent size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                </div>
                {errors[percentageName] && (
                    <span className="text-sm text-destructive">{errors[percentageName].message}</span>
                )}
            </div>
            {/* Amount Input */}
            <div>
                <Label>Amount (in INR) <span className="text-red-700">*</span></Label>
                <div className="flex rounded-lg shadow-sm shadow-black/5">
                    <Input
                        id={amountName}
                        {...register(amountName as keyof FundRequirementFormValues)}
                        className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
                        placeholder="Amount"
                    />
                    <button
                        className="inline-flex w-9 items-center justify-center rounded-e-lg border border-input bg-background text-sm text-muted-foreground/80 outline-offset-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Amount"
                    >
                        <IndianRupee size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                </div>
                {errors[amountName] && (
                    <span className="text-sm text-destructive">{errors[amountName].message}</span>
                )}
            </div>
            <div className="flex items-center">
                <span>{label}</span>
            </div>
        </div>
    );
}