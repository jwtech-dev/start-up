"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function AnimatedCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const updatePosition = useCallback(() => {
    const { x, y } = positionRef.current;
    if (outerRef.current) {
      outerRef.current.style.transform = `translate(${x - 16}px, ${y - 16}px) scale(${isPointer ? 1.5 : 1})`;
    }
    if (innerRef.current) {
      innerRef.current.style.transform = `translate(${x - 3}px, ${y - 3}px) scale(${isPointer ? 0 : 1})`;
    }
  }, [isPointer]);

  useEffect(() => {
    // Only show on devices with fine pointer (desktop) and no reduced motion preference
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        window.getComputedStyle(target).cursor === "pointer";
      setIsPointer(isClickable);

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updatePosition]);

  // Update transform when pointer state changes
  useEffect(() => {
    if (isVisible) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updatePosition);
    }
  }, [isPointer, isVisible, updatePosition]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={outerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent/50 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transition: "transform 0.15s cubic-bezier(0.25, 0.4, 0.25, 1)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      {/* Inner dot */}
      <motion.div
        ref={innerRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none z-[9999]"
        style={{ transition: "transform 0.08s linear" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    </>
  );
}
