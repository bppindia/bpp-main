import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function Slide2() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full h-[80vh]">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-vector/flat-vector-illustration-people-with-different-skin-colors-raising-their-hands-seamless-border_91515-528.jpg?w=900')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </motion.div>

      <div className="relative h-full flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 text-center">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white text-3xl md:text-4xl lg:text-6xl font-bold mb-8"
        >
          Community Contribution
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white text-sm md:text-lg lg:text-xl max-w-3xl mb-12"
        >
          This Bharatiya Popular Party app empowers you to exchange financial assistance, essential guidance, consultation, support, and services with each-other whenever emergencies or urgent situations arise, ensuring no one is left behind in times of need. Click to download the 'Community-Contribution' app and be part of the change.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center items-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#e85a32] hover:bg-[#d14f2c] text-white px-6 py-4 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={()=> navigate('/auth/signup')}
          >
            Join Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white text-white px-6 py-4 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={()=> navigate('/community-contribution/introduction')}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}