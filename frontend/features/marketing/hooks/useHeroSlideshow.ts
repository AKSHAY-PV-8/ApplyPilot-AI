"use client";
import { useEffect, useState } from "react";
import { heroSlides } from "../data";

const SLIDE_INTERVAL_MS = 3200;
const TRANSITION_MS = 400;

export function useHeroSlideshow() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setSlideIndex((i) => (i + 1) % heroSlides.length);
        setAnimating(false);
      }, TRANSITION_MS);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return { slide: heroSlides[slideIndex], slideIndex, setSlideIndex, animating };
}