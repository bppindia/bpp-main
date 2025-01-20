import WelcomeBanner from '@/assets/images/backgrounds/sliders/WELCOME TO BPP.png';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

export function Slide1() {
  const navigate = useNavigate()
      const { t } = useTranslation('homePage');
  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh]">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${WelcomeBanner})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </motion.div>

      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white text-3xl md:text-3xl lg:text-6xl font-bold"
        >
  {t('Slider.Welcome.tittle')}
        </motion.h1>
        <motion.h1
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white text-3xl md:text-3xl lg:text-6xl font-bold mb-4"
        >
         {t('Slider.Welcome.subTittle')}
        </motion.h1>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex  flex-col justify-between align-middle"
        >
          <div className="mb-4">
            <h3 className="text-white text-3xl md:text-3xl lg:text-4xl font-semibold">
            {t('Slider.Welcome.description')}
            </h3>
            <h3 className="text-white text-3xl md:text-3xl lg:text-4xl font-semibold">
            {t('Slider.Welcome.description2')}
            </h3>
          </div>

          <motion.div
            className="flex mt-6"
          >
            <button className="bg-[#e85a32] hover:bg-[#d14f2c] text-white px-5 py-3 rounded-full text-xs font-semibold transition-all duration-300 shadow-lg"
              onClick={() => navigate('/auth/signup')}
            >
                 {t('Slider.Welcome.button')}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}