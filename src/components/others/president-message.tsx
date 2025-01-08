import sirPhoto from "@/assets/images/sirPhoto.png";
const PresidentMessage = () => {
    return (
        <div className="w-full max-w-5xl mx-auto font-poppins">
            <div className="p-8 md:p-12">
                {/* Header */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-8 text-[#e85a32]">
                    A Message from the Party's President
                </h1>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    {/* Image Column */}
                    <div className="w-full lg:w-1/3 flex justify-center">
                        <div className="relative">
                            <img
                                src={sirPhoto}
                                alt="Party President"
                                className="w-sm max-w-32 lg:max-w-60"
                            />
                        </div>
                    </div>

                    {/* Message Column */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-6 space-y-6">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-md mb-3 md:text-md leading-relaxed text-gray-800">
                                I would like to extend a heartfelt thanks to you for your trust in joining the party. Your
                                support is truly appreciated.
                            </p>

                            <p className="text-md mb-3 md:text-md leading-relaxed text-gray-800">
                                I promise to stay committed to the party's goals like creating jobs for all, empowering
                                farmers, ensuring equality for everyone, and more. Above all, community
                                contribution will always be at the top of our priorities.
                            </p>

                            <p className="text-md mb-3 md:text-md leading-relaxed text-gray-800">
                                Together, let us begin the change and build a brighter, stronger future for all.
                            </p>
                        </div>

                        {/* Signature Section */}
                        <div>
                            <p className="text-xl font-semibold text-[#e85a32]">- Shri Jaheer Bukhari</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PresidentMessage;