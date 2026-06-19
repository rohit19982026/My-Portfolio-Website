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
      className="h-[44rem] sm:h-[52rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
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
      {/* iPad Pro Silver — brushed aluminum chassis */}
      <div
        style={{
          position: "relative",
          /*
           * Aluminum lighting model: bright top-left (light source from above-left),
           * darkening toward bottom-right. The three-stop gradient gives the subtle
           * "brushed" look without needing an image.
           */
          background: [
            "linear-gradient(155deg,",
            "  #f2f2f4 0%,",       /* top-left specular highlight */
            "  #dcdcde 28%,",      /* mid silver */
            "  #cacaca 55%,",      /* standard aluminum */
            "  #b8b8ba 80%,",      /* shadow side */
            "  #aeaeaf 100%",      /* bottom-right darkest */
            ")",
          ].join(""),
          borderRadius: "28px",
          padding: "12px 22px",
          boxShadow: [
            /* outer hairline — gives crisp edge definition */
            "0 0 0 1px rgba(0,0,0,0.13)",
            /* inner top-left bright rim (simulates light hitting the chamfered edge) */
            "0 0 0 1.5px rgba(255,255,255,0.88) inset",
            /* very subtle inner bottom-right darkening */
            "0 -1px 0 rgba(0,0,0,0.06) inset",
            /* main depth shadow — slightly warm so it doesn't read as pure black */
            "0 60px 130px rgba(10,10,20,0.28)",
            "0 24px 56px rgba(10,10,20,0.18)",
            /* ambient blue glow matching portfolio accent */
            "0 0 80px rgba(10,132,255,0.07)",
          ].join(", "),
        }}
      >
        {/* FaceID / TrueDepth camera — left short edge in landscape */}
        <div
          style={{
            position: "absolute",
            left: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "3.5px",
            height: "22px",
            background: "linear-gradient(180deg, #1a1a1c 0%, #0e0e10 100%)",
            borderRadius: "2px",
            boxShadow: "0 0 0 0.5px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          {/* camera dot */}
          <div style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "2px",
            height: "2px",
            borderRadius: "50%",
            background: "#050508",
            boxShadow: "0 0 0 0.5px rgba(255,255,255,0.06)",
          }} />
        </div>

        {/* Volume Up — top long edge */}
        <div style={{
          position: "absolute",
          top: "-2.5px",
          left: "33%",
          width: "36px",
          height: "5px",
          background: "linear-gradient(180deg, #e8e8ea 0%, #c8c8ca 100%)",
          borderRadius: "2px 2px 0 0",
          boxShadow: "0 -1px 3px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.1)",
        }} />

        {/* Volume Down — top long edge */}
        <div style={{
          position: "absolute",
          top: "-2.5px",
          left: "calc(33% + 44px)",
          width: "36px",
          height: "5px",
          background: "linear-gradient(180deg, #e8e8ea 0%, #c8c8ca 100%)",
          borderRadius: "2px 2px 0 0",
          boxShadow: "0 -1px 3px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.1)",
        }} />

        {/* Power / Sleep — right short edge */}
        <div style={{
          position: "absolute",
          right: "-2.5px",
          top: "28%",
          width: "5px",
          height: "42px",
          background: "linear-gradient(90deg, #c4c4c6 0%, #e0e0e2 100%)",
          borderRadius: "0 2px 2px 0",
          boxShadow: "2px 0 4px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.1)",
        }} />

        {/* Left speaker grills — subtle, matching aluminum tone */}
        <div style={{
          position: "absolute",
          left: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              width: "1.5px",
              height: "9px",
              background: "rgba(0,0,0,0.22)",
              borderRadius: "1px",
              boxShadow: "0 0 0 0.5px rgba(255,255,255,0.3)",
            }} />
          ))}
        </div>

        {/* Right speaker grills */}
        <div style={{
          position: "absolute",
          right: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              width: "1.5px",
              height: "9px",
              background: "rgba(0,0,0,0.22)",
              borderRadius: "1px",
              boxShadow: "0 0 0 0.5px rgba(255,255,255,0.3)",
            }} />
          ))}
        </div>

        {/* Screen — thin dark gap between aluminum and glass, then glass itself */}
        <div
          className="h-[30rem] md:h-[40rem] overflow-hidden"
          style={{
            borderRadius: "15px",
            border: "1px solid rgba(0,0,0,0.18)",
            /*
             * The inset shadow gives the screen a slightly recessed look,
             * as if the glass sits behind the aluminum bezel.
             */
            boxShadow: "0 0 0 0.5px rgba(0,0,0,0.12) inset, 0 2px 6px rgba(0,0,0,0.06) inset",
            background: "#f2f2f7",
          }}
        >
          <div className="h-full w-full overflow-hidden" style={{ borderRadius: "14px", background: "#f2f2f7" }}>
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
