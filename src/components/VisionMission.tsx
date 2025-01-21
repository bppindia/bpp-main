import {
    ChevronRightIcon,
    GraduationCapIcon,
    Handshake,
    ShieldCheck,
    ShieldCheckIcon,
    Target,
    Users,
    UsersRound
} from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const VisionMission = () => {
    const { t } = useTranslation('homePage');

    return (
        <section className="max-w-7xl container">
            <div className="container px-4 mx-auto">
                <Tabs defaultValue="vision" className="w-full mx-auto">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-lg p-1">
                        <TabsTrigger
                            value="vision"
                            className="data-[state=active]:bg-[#e85a32] data-[state=active]:text-primary-foreground transition-all duration-300"
                        >
                            {t('VisionMission.vision.title')}
                        </TabsTrigger>
                        <TabsTrigger
                            value="mission"
                            className="data-[state=active]:bg-[#e85a32] data-[state=active]:text-primary-foreground transition-all duration-300"
                        >
                            {t('VisionMission.mission.title')}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="vision" className="mt-8">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                            <div className="order-2 lg:order-1">
                                <div>
                                    <span className="inline-block rounded-lg bg-[#e85a32] px-3 py-2 text-xs text-gray-50 dark:text-gray-900 shadow-md">
                                    {t('VisionMission.vision.visionStatement.heading')}
                                    </span>

                                    <h2 className="mt-4 scroll-m-20 font-bold border-b pb-4 text-3xl tracking-tight transition-colors first:mt-0 sm:text-4xl xl:text-5xl">
                                    {t('VisionMission.vision.visionStatement.heading2')}{' '}
                                        <span className="block mt-2">
                                            <span className="text-[#e85a32] animate-in fade-in duration-500">  {t('VisionMission.vision.visionStatement.heading3')}</span>{' '}
                                            <span className="text-blue-500 animate-in fade-in duration-700">  {t('VisionMission.vision.visionStatement.heading4')}</span>{' '}
                                            <span className="animate-in fade-in duration-1000">  {t('VisionMission.vision.visionStatement.heading5')}</span>
                                        </span>
                                    </h2>
                                    <p className="mt-3 text-muted-foreground">
                                        {t('VisionMission.vision.visionStatement.text1')}
                                    </p>
                                    <p className="mt-3 text-muted-foreground">
                                        {t('VisionMission.vision.visionStatement.text2')}
                                    </p>
                                    <p className="mt-5">
                                        <Link
                                            className="inline-flex items-center gap-x-2 group font-medium hover:underline underline-offset-4 text-primary hover:text-primary/90"
                                            to="/vision"
                                        >
                                            {t('VisionMission.vision.link.text')}
                                            <ChevronRightIcon className="flex-shrink-0 w-4 h-4 transition-all ease-in-out group-hover:translate-x-1" />
                                        </Link>
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2 lg:space-y-2 order-1 lg:order-2">
                                <div className="flex p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 transform hover:-translate-y-1">
                                    <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-[#e85a32] text-white shadow-lg">
                                        <UsersRound className="flex-shrink-0 w-5 h-5 text-white" />
                                    </span>
                                    <div className="ms-5 sm:ms-8">
                                        <h3 className="text-base sm:text-lg font-semibold">
                                            {t('VisionMission.vision.features.items.0.title')}
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {t('VisionMission.vision.features.items.0.description')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 transform hover:-translate-y-1">
                                    <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-[#e85a32] text-white shadow-lg">
                                        <GraduationCapIcon className="flex-shrink-0 w-5 h-5 text-white" />
                                    </span>
                                    <div className="ms-5 sm:ms-8">
                                        <h3 className="text-base sm:text-lg font-semibold">
                                            {t('VisionMission.vision.features.items.1.title')}
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {t('VisionMission.vision.features.items.1.description')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 transform hover:-translate-y-1">
                                    <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-[#e85a32] text-white shadow-lg">
                                        <ShieldCheckIcon className="flex-shrink-0 w-5 h-5 text-white" />
                                    </span>
                                    <div className="ms-5 sm:ms-8">
                                        <h3 className="text-base sm:text-lg font-semibold">
                                            {t('VisionMission.vision.features.items.2.title')}
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {t('VisionMission.vision.features.items.2.description')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="mission" className="mt-8">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                            <div className="space-y-2 lg:space-y-2">
                                <div className="flex p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 transform hover:-translate-y-1">
                                    <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-[#e85a32] text-white shadow-lg">
                                        <Users className="flex-shrink-0 w-5 h-5 text-white" />
                                    </span>
                                    <div className="ms-5 sm:ms-8">
                                        <h3 className="text-base sm:text-lg font-semibold">
                                            {t('VisionMission.mission.features.items.0.title')}
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {t('VisionMission.mission.features.items.0.description')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 transform hover:-translate-y-1">
                                    <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-[#e85a32] text-white shadow-lg">
                                        <Target className="flex-shrink-0 w-5 h-5 text-white" />
                                    </span>
                                    <div className="ms-5 sm:ms-8">
                                        <h3 className="text-base sm:text-lg font-semibold">
                                            {t('VisionMission.mission.features.items.1.title')}
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {t('VisionMission.mission.features.items.1.description')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 transform hover:-translate-y-1">
                                    <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-[#e85a32] text-white shadow-lg">
                                        <ShieldCheck className="flex-shrink-0 w-5 h-5 text-white" />
                                    </span>
                                    <div className="ms-5 sm:ms-8">
                                        <h3 className="text-base sm:text-lg font-semibold">
                                            {t('VisionMission.mission.features.items.2.title')}
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {t('VisionMission.mission.features.items.2.description')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 transform hover:-translate-y-1">
                                    <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-[#e85a32] text-white shadow-lg">
                                        <Handshake className="flex-shrink-0 w-5 h-5 text-white" />
                                    </span>
                                    <div className="ms-5 sm:ms-8">
                                        <h3 className="text-base sm:text-lg font-semibold">
                                            {t('VisionMission.mission.features.items.3.title')}
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {t('VisionMission.mission.features.items.3.description')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span className="inline-block rounded-lg bg-[#e85a32] px-3 py-2 text-xs text-white shadow-md">
                                    {t('VisionMission.mission.missionStatement.heading')}
                                </span>

                                <h2 className="mt-4 scroll-m-20 font-bold border-b pb-4 text-3xl tracking-tight transition-colors first:mt-0 sm:text-4xl xl:text-5xl">
                                {t('VisionMission.mission.missionStatement.heading2')}{' '}
                                    <span className="block mt-2">
                                        <span className="text-[#e85a32] animate-in fade-in duration-500">  {t('VisionMission.mission.missionStatement.heading3')}</span>{' '}
                                        <span className="text-blue-500 animate-in fade-in duration-700">{t('VisionMission.mission.missionStatement.heading4')}</span>{' '}
                                        <span className="animate-in fade-in duration-1000">{t('VisionMission.mission.missionStatement.heading5')}</span>
                                    </span>
                                </h2>
                                <p className="mt-3 text-muted-foreground">
                                    {t('VisionMission.mission.missionStatement.text1')}
                                </p>
                                <p className="mt-3 text-muted-foreground">
                                    {t('VisionMission.mission.missionStatement.text2')}
                                </p>
                                <p className="mt-3 text-muted-foreground">
                                    {t('VisionMission.mission.missionStatement.text3')}
                                </p>
                                <p className="mt-3 text-muted-foreground">
                                    {t('VisionMission.mission.missionStatement.text4')}
                                </p>
                                <p className="mt-5">
                                    <Link
                                        className="inline-flex items-center gap-x-2 group font-medium hover:underline underline-offset-4 text-primary hover:text-primary/90"
                                        to="/mission"
                                    >
                                        {t('VisionMission.mission.link.text')}
                                        <ChevronRightIcon className="flex-shrink-0 w-4 h-4 transition-all ease-in-out group-hover:translate-x-1" />
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

export default VisionMission;
