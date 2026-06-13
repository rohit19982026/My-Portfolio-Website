"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  const yBlue = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const yTeal = useTransform(scrollYProgress, [0, 1], [0, 320]);
  const yAmber = useTransform(scrollYProgress, [0, 1], [0, -160]);

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      <motion.div
        style={{
          y: yBlue,
          position: "absolute",
          top: "5%",
          left: "-10%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,78,216,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 60, -30, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{
          y: yTeal,
          position: "absolute",
          top: "45%",
          right: "-8%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(8,145,178,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, -50, 40, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{
          y: yAmber,
          position: "absolute",
          top: "80%",
          left: "20%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217,119,6,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ x: [0, 30, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
