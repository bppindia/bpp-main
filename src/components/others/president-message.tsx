import sirPhoto from "@/assets/images/sirPhoto.png";

const PresidentMessage = () => {
    return (
        <div className="w-full max-w-5xl mx-auto font-poppins">
            <div className="my-3">
                {/* Header */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-6 text-[#3b82f6]">
                    A Message from the Party's President
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-start">
                    {/* Image Column */}
                    <div className="flex justify-center xl:justify-end items-center col-span-1">
                        <div className="relative">
                            <img
                                src={sirPhoto}
                                alt="Party President"
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Message Column */}
                    <div className="col-span-2 flex flex-col">
                        <div className="container">
                            <p className="text-sm mb-3 md:text-md leading-relaxed text-gray-800">
                            I would like to extend a heartfelt thanks to you for your trust in joining the party. Your support is truly appreciated.
                            </p>

                            <p className="text-sm mb-3 md:text-md leading-relaxed text-gray-800">
                            I promise to stay committed to the party's goals like creating jobs for all, empowering farmers, ensuring equality for everyone, and more. Above all, community contribution will always be at the top of our priorities.
                            </p>

                            <p className="text-sm mb-3 md:text-md leading-relaxed text-gray-800">
                            To help create a stronger support system of 'Community-Contribution', I invite you to join the party’s app. This app will enable all to connect and exchange necessary financial and other supports to one another as we work towards achieving our common goals.
                            </p>
                            <p className="text-sm mb-3 md:text-md leading-relaxed text-gray-800">
                            Together, let us begin the change and build a brighter, stronger future for all.
                            </p>

                             {/* Signature Section */}
                        <div>
                            <p className="text-md font-semibold text-[#e85a32]">- Shri Jaheer Bukhari</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PresidentMessage;
