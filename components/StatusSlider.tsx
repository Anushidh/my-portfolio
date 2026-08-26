"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const statuses = [
  "Currently hacking on: an AI side-project",
  "Reading: Designing Data-Intensive Applications",
  "Listening to: Syntax FM Podcast",
  "Experimenting with: WebGL and Three.js",
  "Exploring: Advanced patterns in NestJS",
];

export default function StatusSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % statuses.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        marginTop: "5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        height: "32px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <span style={{ fontSize: "1.2rem" }}>💡</span>
      <div style={{ position: "relative", flex: 1, height: "100%" }}>
        <AnimatePresence mode="popLayout">
          <motion.p
            key={index}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "4px",
              left: 0,
              margin: 0,
              fontSize: "0.95rem",
              color: "var(--color-text-secondary)",
              whiteSpace: "nowrap",
            }}
          >
            {statuses[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
