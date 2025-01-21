import { Church } from "lucide-react";
import { motion } from "framer-motion";
import Secularism from '@/assets/images/backgrounds/sliders/INDIA UPHOLD SECULARISM .jpeg';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Slide7() {
    const navigate = useNavigate();
    const { t } = useTranslation('homePage');

    return (
        <div className="relative w-full h-[80vh]">
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${Secularism})`,
                }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
            </motion.div>

            <div className="relative h-full max-w-5xl mx-auto flex flex-col justify-center px-8 md:px-16 lg:px-24">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-4 mb-3"
                >
                    <Church className="text-white" size={30} />
                    <h2 className="text-white text-3xl font-bold">{t('Slider.Goal5.tittle')}</h2>
                </motion.div>

                <motion.h1
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                >
                    {t('Slider.Goal5.subTittle')}
                </motion.h1>

                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white text-md mb-4"
                >
                    {t('Slider.Goal5.description')}
                </motion.p>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <button
                        className="bg-[#e85a32] hover:bg-[#d14f2c] text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                        onClick={() => navigate('/about/bpp-goals')}
                    >
                        {t('Slider.Goal5.button')}
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
