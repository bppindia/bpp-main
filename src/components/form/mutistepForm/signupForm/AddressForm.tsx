import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormWrapper } from "./FormWrapper";
import { stateData } from "@/data/states";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type AddressData = {
    addressLine1: string;
    addressLine2: string;
    cityOrVillage: string;
    taluka: string;
    district: string;
    state: string;
    pincode: string;
};

type AddressFormProps = AddressData & {
    updateFields: (fields: Partial<AddressData>) => void;
};

export function AddressForm({
    addressLine1,
    addressLine2,
    cityOrVillage,
    taluka,
    district,
    state,
    pincode,
    updateFields,
}: AddressFormProps) {
    return (
        <FormWrapper title="Address Details">
            <div className="grid gap-4">
                {/* Address Line 1 */}
                <div className="text-center text-xs text-muted-foreground text-semibold">* Provide Address as given in Aadhaar Card</div>
                <div>
                    <Label htmlFor="addressLine1">Address Line 1 <span className="text-red-700">*</span></Label>
                    <Input
                        id="addressLine1"
                        placeholder="House/Flat No., Building Name, Street"
                        required
                        value={addressLine1}
                        onChange={(e) => updateFields({ addressLine1: e.target.value })}
                    />
                </div>

                {/* Address Line 2 */}
                <div>
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                        id="addressLine2"
                        placeholder="Area, Landmark"
                        value={addressLine2}
                        onChange={(e) => updateFields({ addressLine2: e.target.value })}
                    />
                </div>

                {/* City/Village, Taluka, District Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="cityOrVillage">City/Village <span className="text-red-700">*</span></Label>
                        <Input
                            id="cityOrVillage"
                            placeholder="Enter city/village"
                            value={cityOrVillage}
                            required
                            onChange={(e) => updateFields({ cityOrVillage: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="taluka">Taluka/Block <span className="text-red-700">*</span></Label>
                        <Input
                            id="taluka"
                            placeholder="Enter taluka"
                            value={taluka}
                            required
                            onChange={(e) => updateFields({ taluka: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="district">District <span className="text-red-700">*</span></Label>
                        <Input
                            id="district"
                            placeholder="Enter district"
                            value={district}
                            required
                            onChange={(e) => updateFields({ district: e.target.value })}
                        />
                    </div>
                </div>

                {/* State and Pincode Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="state">State <span className="text-red-700">*</span></Label>
                        <Select
                            onValueChange={(value) => updateFields({ state: value })}
                            defaultValue={state || ""}
                        >
                            <SelectTrigger id="state" className="w-full">
                                <SelectValue placeholder="Select your state" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(stateData).map(([stateCode, stateName]) => (
                                    <SelectItem key={stateCode} value={stateName}>
                                        {stateName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>              <div>
                        <Label htmlFor="pincode">Pincode <span className="text-red-700">*</span></Label>
                        <Input
                            id="pincode"
                            placeholder="Enter pincode"
                            value={pincode}
                            required
                            onChange={(e) => updateFields({ pincode: e.target.value })}
                        />
                    </div>
                </div>
            </div>
        </FormWrapper>
    );
}
