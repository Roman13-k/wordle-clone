import { TimeOfYearType } from "@/types";
import { ReactElement } from "react";

export const SEASON_PARTICLES: Record<
  TimeOfYearType,
  { svgs: ReactElement[]; color: string }
> = {
  winter: {
    color: "text-chart-1",
    svgs: [
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0v24M0 12h24M4.5 4.5l15 15M19.5 4.5l-15 15" />{" "}
      </svg>,
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l1 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" />{" "}
      </svg>,
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="4" />{" "}
      </svg>,
    ],
  },

  spring: {
    color: "text-green-500",
    svgs: [
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c4 0 8 4 8 8s-4 6-8 10c-4-4-8-6-8-10s4-8 8-8z" />
      </svg>,
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="6" />
      </svg>,
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" />
      </svg>,
    ],
  },

  summer: {
    color: "text-yellow-400",
    svgs: [
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="5" />
      </svg>,
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0v4M12 20v4M0 12h4M20 12h4" />
      </svg>,
    ],
  },

  autumn: {
    color: "text-orange-500",
    svgs: [
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c4 6 6 10 0 20-6-10-4-14 0-20z" />
      </svg>,
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 12c6-6 10-6 16 0-6 6-10 6-16 0z" />
      </svg>,
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="3" />
      </svg>,
    ],
  },
};
