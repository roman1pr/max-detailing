"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export type RevealVariant = "up" | "left" | "right" | "scale" | "blur";

const hidden: Record<RevealVariant, { opacity: number; x?: number; y?: number; scale?: number; filter: string }> = {
  up: { opacity: 0, y: 40, filter: "blur(8px)" },
  left: { opacity: 0, x: -36, filter: "blur(6px)" },
  right: { opacity: 0, x: 36, filter: "blur(6px)" },
  scale: { opacity: 0, scale: 0.92, filter: "blur(10px)" },
  blur: { opacity: 0, y: 16, filter: "blur(12px)" },
};

const shown = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  as?: ElementType;
  once?: boolean;
  amount?: number;
  id?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  as: Tag = "div",
  once = true,
  amount = 0.18,
  id,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      id={id}
      className={className}
      initial={reduce ? false : hidden[variant]}
      whileInView={shown}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </MotionTag>
  );
}

const staggerContainer = (stagger = 0.09, delayChildren = 0.06): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

const staggerItem = (variant: RevealVariant): Variants => ({
  hidden: hidden[variant],
  show: {
    ...shown,
    transition: { duration: 0.75, ease },
  },
});

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: ElementType;
  once?: boolean;
  amount?: number;
};

/** Parent for staggered children — wrap with RevealItem. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delay = 0.04,
  as: Tag = "div",
  once = true,
  amount = 0.12,
}: RevealGroupProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion.create(Tag);

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -6% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  as?: ElementType;
};

export function RevealItem({
  children,
  className,
  variant = "up",
  as: Tag = "div",
}: RevealItemProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion.create(Tag);

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={staggerItem(variant)}>
      {children}
    </MotionTag>
  );
}

type HeroRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
};

/** Entrance on first paint (hero), not scroll. */
export function HeroReveal({
  children,
  className,
  delay = 0,
  variant = "up",
}: HeroRevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : hidden[variant]}
      animate={shown}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
