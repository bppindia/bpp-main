import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MembersInfoFormValues } from '@/schema/caseRegistrationSchema/legal/schema';
import { useFormContext } from 'react-hook-form';

export function LocationInfoForm() {
    const {
        register,
        formState: { errors },
    } = useFormContext<MembersInfoFormValues>();

    return (
        <>
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Your current location</CardTitle>
                {/* <CardDescription className="py-2">
                    Please provide your details for electronic signature*
                </CardDescription> */}
                <Separator />
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* State Field */}
                    <div>
                        <Label htmlFor="state" className="block text-sm font-medium text-primary">
                            State*
                        </Label>
                        <Input
                            id="state"
                            {...register('state')}
                            className="block w-full p-2 border rounded-md"
                        />
                        {errors.state && (
                            <span className="text-sm text-destructive">{errors.state.message}</span>
                        )}
                    </div>

                    {/* District Field */}
                    <div>
                        <Label htmlFor="district" className="block text-sm font-medium text-primary">
                            District*
                        </Label>
                        <Input
                            id="district"
                            {...register('district')}
                            className="block w-full p-2 border rounded-md"
                        />
                        {errors.district && (
                            <span className="text-sm text-destructive">{errors.district.message}</span>
                        )}
                    </div>

                    {/* Pincode Field */}
                    <div>
                        <Label htmlFor="pincode" className="block text-sm font-medium text-primary">
                            Pincode*
                        </Label>
                        <Input
                            id="pincode"
                            {...register('pincode')}
                            className="block w-full p-2 border rounded-md"
                        />
                        {errors.pincode && (
                            <span className="text-sm text-destructive">{errors.pincode.message}</span>
                        )}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                {/* Footer content (if any) */}
            </CardFooter>
        </Card>


        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">You are almost Done</CardTitle>
                <CardDescription className="py-2">
                    After you submit this form, we will review your case. Decision to accept or reject concerns will be made at the <strong>sole discretion</strong> of the Bharatiya Popular Party administration.
                </CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <div className="space-y-4 text-start">
                    <p>
                        You will receive an email confirming that we received your submission. After we've reviewed your application, we'll send you an email to let you know if it's been approved or declined.
                    </p>

                    <h3 className="text-xl font-bold">Agreement</h3>
                    <p>
                        By submitting this application, you confirm that you are the Member of the Bharatiya Popular Party and agree to the conditions described below.
                    </p>

                    <ul className="list-disc list-inside space-y-2">
                        <li>You agree to comply with the terms and conditions of the Bharatiya Popular Party.</li>
                        <li>All information provided in this application is true and accurate to the best of your knowledge. Any false or misleading information may result in the immediate disqualification of the request.</li>
                        <li>You consent to receive notifications and updates from BPP through email, SMS, regarding this submission and any related matters.</li>
                        <li>You understand that approval of your application does not imply an obligation by BPP to provide further assistance beyond the agreed scope.</li>
                        <li>You acknowledge that the decision of the BPP administration is final and binding, and no appeals will be entertained.</li>
                    </ul>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="agreement" />
                        <Label htmlFor="agreement">
                            I verify that I am a member of the Bharatiya Popular Party and agree to the terms and conditions outlined above.
                        </Label>
                    </div>
                </div>
            </CardContent>
        </Card>
        </>
    );
}