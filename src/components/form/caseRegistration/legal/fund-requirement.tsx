import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FundRequirementFormValues } from '@/schema/caseRegistrationSchema/legal/schema';
import { IndianRupee } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { PercentageAmountInput } from './PercentageAmountInput';

export function FundRequirementForm() {
    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext<FundRequirementFormValues>();

    // Watch the total cost and other fields
    const totalCost = useWatch({ control, name: 'totalCost' });
    const selfAmount = useWatch({ control, name: 'selfAmount' });
    const familyFriendsAmount = useWatch({ control, name: 'familyFriendsAmount' });
    const workplaceAmount = useWatch({ control, name: 'workplaceAmount' });
    const otherInstitutesAmount = useWatch({ control, name: 'otherInstitutesAmount' });

    // Calculate percentages and remaining amount
    const calculatePercentage = (amount: number) => {
        if (!totalCost || totalCost <= 0) return 0;
        return ((amount / totalCost) * 100).toFixed(2);
    };

    const remainingAmount =
        totalCost - (selfAmount || 0) - (familyFriendsAmount || 0) - (workplaceAmount || 0) - (otherInstitutesAmount || 0);

    // Enable/disable fields based on total cost
    const isTotalCostEntered = !!totalCost && totalCost > 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Fund Requirement</CardTitle>
                <CardDescription className="py-2">This facility is available in org legal aid</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <div className="space-y-4 text-start">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="totalCost" className="block text-sm font-medium text-primary">
                                Total cost of your case*
                            </Label>
                            <Input
                                id="totalCost"
                                className="block w-full p-2 border rounded-md"
                                {...register('totalCost', { valueAsNumber: true })}
                            />
                        </div>
                    </div>

                    <PercentageAmountInput
                        percentageName="selfPercentage"
                        amountName="selfAmount"
                        label="SELF"
                        errors={errors}
                        disabled={!isTotalCostEntered}
                        onAmountChange={(value) => {
                            setValue('selfPercentage', calculatePercentage(value));
                        }}
                    />

                    <PercentageAmountInput
                        percentageName="familyFriendsPercentage"
                        amountName="familyFriendsAmount"
                        label="Family & Friends"
                        errors={errors}
                        disabled={!isTotalCostEntered}
                        onAmountChange={(value) => {
                            setValue('familyFriendsPercentage', calculatePercentage(value));
                        }}
                    />

                    <PercentageAmountInput
                        percentageName="workplacePercentage"
                        amountName="workplaceAmount"
                        label="Workplace"
                        errors={errors}
                        disabled={!isTotalCostEntered}
                        onAmountChange={(value) => {
                            setValue('workplacePercentage', calculatePercentage(value));
                        }}
                    />

                    <PercentageAmountInput
                        percentageName="otherInstitutesPercentage"
                        amountName="otherInstitutesAmount"
                        label="Other Institutes"
                        errors={errors}
                        disabled={!isTotalCostEntered}
                        onAmountChange={(value) => {
                            setValue('otherInstitutesPercentage', calculatePercentage(value));
                        }}
                    />

                    <div>
                        <Label htmlFor="totalAmountRequested" className="block text-sm font-medium text-primary">
                            Total amount requested*
                        </Label>
                        <div className="flex rounded-lg shadow-sm shadow-black/5">
                            <Input
                                id="totalAmountRequested"
                                className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
                                placeholder="Total amount"
                                value={totalCost - remainingAmount}
                                readOnly
                            />
                            <button
                                className="inline-flex w-9 items-center justify-center rounded-e-lg border border-input bg-background text-sm text-muted-foreground/80 outline-offset-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Total amount"
                            >
                                <IndianRupee size={16} strokeWidth={2} aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <div>
                        <Label className="block text-sm font-medium text-primary">
                            Remaining Amount: {remainingAmount}
                        </Label>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}