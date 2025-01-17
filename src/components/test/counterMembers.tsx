import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NumberTicker from "../ui/number-ticker";

const CounterMembers = () => {
    return (
        <div className="bg-background dark:bg-gray-900">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl font-bold tracking-tight">
                                <NumberTicker
                                    initialValue={103786}
                                    incrementOptions={[2, 3, 4]}
                                    delay={3}
                                    className="text-blue-600 dark:text-white"
                                /> {' '}  USERS
                            </h1>
                            <h2 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
                                REGISTERED WITH US
                            </h2>
                        </div>

                        <div className="max-w-md">

                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-8 text-gray-900 dark:text-white">
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Email/Phone number"
                                className="flex-1"
                            />
                            <Button className="bg-blue-600 hover:bg-blue-900 text-white">
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CounterMembers;