import sirPhoto from "@/assets/images/sirPhoto.png";
import { useTranslation } from "react-i18next";

const PresidentMessage = () => {
    const { t } = useTranslation('homePage');
    return (
        <div className="w-full max-w-6xl mx-auto font-poppins">
            <div className="mt-3">
                {/* Header */}
                <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-center mb-6 text-[#3b82f6]">
                   {t('PresidentMessage.heading')}
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
                            <div>
                                <p className="text-md font-semibold text-[#e85a32]">-    {t('PresidentMessage.presidentName')}</p>
                                <p className="text-md font-semibold text-[#e85a32] mx-3">   {t('PresidentMessage.designation')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Message Column */}
                    <div className="col-span-2 flex flex-col">
                        <div className="container">
                            <p className="text-sm mb-3 md:text-md leading-relaxed text-gray-800">
                            {t('PresidentMessage.description')}
                            </p>

                            <p className="text-sm mb-3 md:text-md leading-relaxed text-gray-800">
                            {t('PresidentMessage.description2')}
                            </p>

                            <p className="text-sm mb-3 md:text-md leading-relaxed text-gray-800">
                            {t('PresidentMessage.description3')}
                            </p>
                            <p className="text-sm mb-3 md:text-md leading-relaxed text-gray-800">
                            {t('PresidentMessage.description4')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PresidentMessage;
