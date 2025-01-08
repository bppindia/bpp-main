import { Building2 } from "lucide-react";
import { motion } from "framer-motion";

export function Slide4() {
    return (
        <div className="relative w-full h-screen">
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/src/assets/images/banners/NATIONAL INTEGRITY.jpeg')`,
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
                    <Building2 className="text-white" size={48} />
                    <h2 className="text-white text-5xl font-bold">GOAL 1</h2>
                </motion.div>

                <motion.h1
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                >
                    National Integrity
                </motion.h1>

                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white text-xl max-w-6xl mb-8"
                >
                    Bharatiya Popular Party shall bear true faith and allegiance to the constitution of India as by law established, and to the principles of socialism, secularism and democracy and would uphold the sovereignty, unity and integrity of India.
                </motion.p>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <button className="bg-[#e85a32] hover:bg-[#d14f2c] text-white px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                        Learn More
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
