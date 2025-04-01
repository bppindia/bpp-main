import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const ProfessionalPage = () => {
    return (
        <>
            <>
                <div className="mt-4">
                    <div className="grid grid-cols-1 gap-6 mt-2 md:grid-cols-1 lg:grid-cols-1">
                        {/* Professional Profile Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">Professional Profile</CardTitle>
                                <CardDescription>Update your profile information.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="grid gap-4">
                                    {/* Basic Information */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <Label htmlFor="qualification">Qualification</Label>
                                            <Input id="qualification" defaultValue="Masters in Chemistry" disabled />
                                        </div>
                                        <div>
                                            <Label htmlFor="profession">Profession</Label>
                                            <Select disabled>
                                                <SelectTrigger id="profession">
                                                    <SelectValue placeholder="Select your profession" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="medical">Medical</SelectItem>
                                                    <SelectItem value="lawyer">Lawyer</SelectItem>
                                                    <SelectItem value="engineer">Engineer</SelectItem>
                                                    <SelectItem value="social-worker">Social Worker</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="position">Position</Label>
                                            <Input disabled id="position" type="text" placeholder="E.g., Manager, Team Lead" />
                                        </div>
                                    </div>

                                    {/* Expertise Section */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <Label htmlFor="expertise">Select Your Expertise</Label>
                                            <Input id="expertise" placeholder="E.g., Software Development, Healthcare" />
                                        </div>
                                        <div>
                                            <Label htmlFor="current-expertise">Current Expertise</Label>
                                            <Input id="current-expertise" placeholder="E.g., React Developer, Cardiologist" />
                                        </div>
                                    </div>

                                    {/* Education Details */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <Label htmlFor="education">Education</Label>
                                            <Input id="education" placeholder="E.g., MBBS, LLB, MSW" />
                                        </div>
                                        <div>
                                            <Label htmlFor="university">University</Label>
                                            <Input id="university" placeholder="E.g., Harvard University" />
                                        </div>
                                        <div>
                                            <Label htmlFor="degree">Degree</Label>
                                            <Input id="degree" placeholder="E.g., Doctorate, Bachelor's" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <Label htmlFor="passout-year">Passout Year</Label>
                                            <Input id="passout-year" type="number" placeholder="E.g., 2020" />
                                        </div>
                                        <div>
                                            <Label htmlFor="quality">Quality</Label>
                                            <Input id="quality" placeholder="E.g., Leadership, Creativity" />
                                        </div>
                                    </div>

                                    {/* Upload Supporting Documents */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="documents">Upload Supporting Documents</Label>
                                        <Input type="file" id="documents" placeholder="Upload certifications, resumes, or proofs" multiple />
                                    </div>

                                    {/* Social Media Links */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <Label htmlFor="linkedin">LinkedIn Profile (optional)</Label>
                                            <Input id="linkedin" type="url" placeholder="E.g., https://www.linkedin.com/in/username" />
                                        </div>
                                        <div>
                                            <Label htmlFor="portfolio">Portfolio (optional)</Label>
                                            <Input id="portfolio" type="url" placeholder="E.g., https://portfolio.example.com" />
                                        </div>
                                    </div>

                                    {/* Professional Skills */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="skills">Professional Skills</Label>
                                        <Textarea id="skills" rows={3} placeholder="List your key professional skills (e.g., Team Management, Python, Data Analysis)" />
                                    </div>

                                    {/* References/Recommendations */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="references">References/Recommendations</Label>
                                        <Textarea id="references" rows={3} placeholder="Provide professional references or recommendations" />
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter className="p-6 border-t">
                                <Button>Save Changes</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </>
        </>
    );
};

export default ProfessionalPage;
