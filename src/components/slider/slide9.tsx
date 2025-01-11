import { BadgeDollarSign } from "lucide-react";
import { motion } from "framer-motion";
import Employment from '@/assets/images/backgrounds/sliders/EMPLOYMENT & ECONOMIC GROWTH.jpeg';
import { useNavigate } from "react-router-dom";

export function Slide9() {
  const navigate = useNavigate()


  return (
    <div className="relative w-full h-[80vh]">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Employment})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </motion.div>
      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-6"
        >
          <BadgeDollarSign className="text-white" size={48} />
          <h2 className="text-white text-5xl font-bold">GOAL 7</h2>
        </motion.div>
        <motion.h1
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          Employment and Economic Growth
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white text-xl max-w-6xl mb-8"
        >
          BPP is committed to promoting decent work and sustained economic growth by creating job opportunities, ensuring fair wages and improving working conditions for all citizens. The party aims to empower individuals particularly in rural and marginalized communities through skill development, entrepreneurship, and access to employment.
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="bg-[#e85a32] hover:bg-[#d14f2c] text-white px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={()=> navigate('/about/bpp-goals')}
          >
            Learn More
          </button>
        </motion.div>
      </div>
    </div>
  );
}
