import { motion } from "framer-motion";
import fairy from "../assets/fairy.png";
import forestBg from "../assets/forest_bg2.jpg"; // ✅ 배경 이미지 import
import "../index.css";

const colors = [
  "from-pink-400 via-yellow-300 to-green-400",
  "from-green-400 via-blue-400 to-purple-400",
  "from-yellow-400 via-red-400 to-pink-400",
];

const Home = () => {
  const title = "이야기숲";

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* ✅ 반투명 배경 이미지 */}
      <img
        src={forestBg}
        alt="Forest Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      />

      {/* 콘텐츠 래퍼 */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 작은 설명 텍스트 */}
        <motion.h2
          className="font-ansim text-xl sm:text-2xl md:text-3xl text-gray-300 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          나만의 언어 표현력 키우미
        </motion.h2>

        {/* 광택나는 "이야기숲" */}
        <motion.div
          className="font-ansim2 text-6xl sm:text-7xl md:text-8xl font-black flex flex-wrap justify-center 
          text-transparent bg-clip-text 
          bg-gradient-to-r from-green-300 via-white to-green-300 
          bg-[length:200%_100%] bg-left animate-shimmer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {title}
      </motion.div>
      </div>

      {/* 둥실둥실 요정 이미지 */}
      <motion.img
        src={fairy}
        alt="Fairy"
        className="w-48 sm:w-56 md:w-64 absolute top-[16rem] left-[13rem] pointer-events-none z-20"
        animate={{
          y: [0, -10, 0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

    </div>

    
  );
};

export default Home;
