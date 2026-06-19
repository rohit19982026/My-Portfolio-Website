"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ rotateX: rotate, scale }}
      className="max-w-5xl -mt-12 mx-auto w-full"
    >
      {/* iPad Pro Space Gray chassis */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(160deg, #48484a 0%, #2c2c2e 45%, #1c1c1e 100%)",
          borderRadius: "28px",
          padding: "13px 22px",
          boxShadow: [
            "0 0 0 1px rgba(255,255,255,0.10)",
            "0 0 0 1.5px rgba(0,0,0,0.7) inset",
            "0 50px 120px rgba(0,0,0,0.55)",
            "0 20px 50px rgba(0,0,0,0.4)",
          ].join(", "),
        }}
      >
        {/* FaceID sensor bar — left short edge in landscape */}
        <div
          style={{
            position: "absolute",
            left: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "4px",
            height: "26px",
            background: "#080808",
            borderRadius: "2px",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "2.5px",
            height: "2.5px",
            borderRadius: "50%",
            background: "#0e0e10",
            border: "1px solid rgba(255,255,255,0.07)",
          }} />
        </div>

        {/* Volume Up — top edge */}
        <div style={{
          position: "absolute",
          top: "-3px",
          left: "34%",
          width: "34px",
          height: "5px",
          background: "linear-gradient(90deg, #222224, #383838, #222224)",
          borderRadius: "2px 2px 0 0",
          boxShadow: "0 -2px 5px rgba(0,0,0,0.6)",
        }} />

        {/* Volume Down — top edge */}
        <div style={{
          position: "absolute",
          top: "-3px",
          left: "calc(34% + 42px)",
          width: "34px",
          height: "5px",
          background: "linear-gradient(90deg, #222224, #383838, #222224)",
          borderRadius: "2px 2px 0 0",
          boxShadow: "0 -2px 5px rgba(0,0,0,0.6)",
        }} />

        {/* Power / Sleep — right short edge */}
        <div style={{
          position: "absolute",
          right: "-3px",
          top: "27%",
          width: "5px",
          height: "46px",
          background: "linear-gradient(180deg, #222224, #383838, #222224)",
          borderRadius: "0 2px 2px 0",
          boxShadow: "3px 0 6px rgba(0,0,0,0.5)",
        }} />

        {/* Left speaker grills */}
        <div style={{
          position: "absolute",
          left: "15px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ width: "1.5px", height: "9px", background: "rgba(0,0,0,0.6)", borderRadius: "1px" }} />
          ))}
        </div>

        {/* Right speaker grills */}
        <div style={{
          position: "absolute",
          right: "15px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ width: "1.5px", height: "9px", background: "rgba(0,0,0,0.6)", borderRadius: "1px" }} />
          ))}
        </div>

        {/* Screen */}
        <div
          className="h-[30rem] md:h-[40rem] overflow-hidden"
          style={{ borderRadius: "16px", background: "#000" }}
        >
          <div className="h-full w-full overflow-hidden" style={{ borderRadius: "15px", background: "#f2f2f7" }}>
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
