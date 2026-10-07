import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BodyScan() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const beamY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.7, 0.9], [0, 1, 1, 0]);
  const dissolve = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  // Body silhouette points
  const points = [
    { x: 50, y: 10, r: 4 },
    { x: 50, y: 18, r: 2 },
    { x: 35, y: 26, r: 3 },
    { x: 65, y: 26, r: 3 },
    { x: 28, y: 42, r: 2.5 },
    { x: 72, y: 42, r: 2.5 },
    { x: 25, y: 58, r: 2 },
    { x: 75, y: 58, r: 2 },
    { x: 50, y: 38, r: 2.5 },
    { x: 45, y: 60, r: 3 },
    { x: 55, y: 60, r: 3 },
    { x: 45, y: 78, r: 3 },
    { x: 55, y: 78, r: 3 },
    { x: 45, y: 92, r: 2.5 },
    { x: 55, y: 92, r: 2.5 },
  ];

  const connections: [number, number][] = [
    [0, 1], [1, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [1, 8], [8, 9], [8, 10],
    [9, 11], [10, 12], [11, 13], [12, 14],
  ];

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-400/[0.05] blur-[120px]" />
        <div className="grid-bg absolute inset-0 opacity-20" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 sm:px-10">
        <div className="relative h-[480px] w-full max-w-md sm:h-[560px]">
          {/* Body silhouette */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
          >
            {/* Outline body shape */}
            <motion.path
              d="M50 8 C 55 8, 58 12, 58 16 C 58 20, 55 22, 50 22 C 45 22, 42 20, 42 16 C 42 12, 45 8, 50 8 Z
                 M 38 24 L 62 24 L 68 28 L 70 50 L 65 55 L 65 75 L 60 80 L 60 95 L 56 95 L 56 75 L 44 75 L 44 95 L 40 95 L 40 80 L 35 75 L 35 55 L 30 50 L 32 28 Z"
              fill="none"
              stroke="#5eead4"
              strokeWidth="0.4"
              strokeOpacity="0.4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5 }}
            />

            {/* Joint points */}
            {points.map((p, i) => (
              <motion.g key={i}>
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={p.r * 0.3}
                  fill="#67e8f9"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                />
              </motion.g>
            ))}

            {/* Connection lines */}
            {connections.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={points[a].x}
                y1={points[a].y}
                x2={points[b].x}
                y2={points[b].y}
                stroke="#5eead4"
                strokeWidth="0.2"
                strokeOpacity="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 + i * 0.05 }}
              />
            ))}

            {/* Motion vectors */}
            <motion.g style={{ opacity: dissolve }}>
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const cx = 50;
                const cy = 50;
                const x2 = cx + Math.cos(angle) * 30;
                const y2 = cy + Math.sin(angle) * 30;
                return (
                  <motion.line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={x2}
                    y2={y2}
                    stroke="#67e8f9"
                    strokeWidth="0.3"
                    strokeOpacity="0.4"
                    animate={{ strokeOpacity: [0.1, 0.6, 0.1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                );
              })}
            </motion.g>
          </svg>

          {/* Scanning beam */}
          <motion.div
            style={{ top: beamY, opacity: beamOpacity }}
            className="pointer-events-none absolute inset-x-0 z-20 h-1/4"
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-mint-400 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mint-400/10 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Animated text */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="mt-12 text-center"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-mint-400">
            BODY SCAN
          </div>
          <h3 className="mt-3 font-display text-3xl font-bold text-clinical sm:text-4xl">
            Scanning movement pathways.
          </h3>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Visualizing the architecture of human motion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
