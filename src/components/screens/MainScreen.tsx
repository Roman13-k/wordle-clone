"use client";

import {
  MouseEvent,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { Button } from "@/components/ui/shared/buttons/button";
import { Input } from "@/components/ui/shared/input";
import { ArrowRight, Calendar, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { useGetUser } from "@/hooks/api/queries/useGetUser";
import { useThrottle } from "@/hooks/useThrottle";
import { isUUID } from "@/utils/functions/isUUID";
import { useRouter } from "next/navigation";
import { isValidDate } from "@/utils/functions/isValidDate";
import { useToastStore } from "@/stores/toastStore";
import { useTheme } from "@/hooks/useTheme";

//! i dont no how to fix it

export default function MainScreen() {
  const { data: user } = useGetUser();
  const { addToast } = useToastStore();
  const [percent, setPercent] = useState(50);
  const [px, setPx] = useState(0);
  const throttledPercent = useThrottle(percent, 50);
  const throttledPx = useThrottle(px, 50);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const {} = useTheme();

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const clampedX = Math.max(0, Math.min(x, width));

    const p = (clampedX / width) * 100;
    setPercent(p);
    console.log(p);
    setPx(clampedX);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPercent(50);
  }, []);

  const handleSearch = useCallback(() => {
    if (isUUID(searchValue)) {
      router.push(`/game?id=${searchValue}`);
    } else if (isValidDate(searchValue)) {
      router.push(`/game?date=${searchValue}`);
    } else {
      addToast("Предупреждение", "Неправельный формат даты или id", "warning");
    }
  }, [searchValue, router, addToast]);

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [textRange, setTextRange] = useState({
    start: 0,
    end: 0,
  });

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const titleRect = titleRef.current.getBoundingClientRect();

    const start = titleRect.left - containerRect.left;
    const end = start + titleRect.width;

    console.log(start, end);
    setTextRange({ start, end });
  }, []);

  const textProgress = useMemo(() => {
    if (!textRange.start && !textRange.end) return 0;

    if (throttledPx < textRange.start) return 0;
    if (throttledPx > textRange.end) return 100;

    return (
      ((throttledPx - textRange.start) / (textRange.end - textRange.start)) *
      100
    );
  }, [throttledPx, textRange]);

  const intensities = useMemo(
    () => ({
      left: 1 - throttledPercent / 100,
      right: throttledPercent / 100,
      max: Math.max(1 - throttledPercent / 100, throttledPercent / 100),
    }),
    [throttledPercent],
  );

  const backgroundStyle = useMemo(
    () => ({
      background: `linear-gradient(-60deg, var(--primary) 0%, var(--primary) 50%, var(--muted) 50%, var(--muted) 100%)`,
      backgroundSize: "200% 100%",
      backgroundPosition: `${throttledPercent + 10}% 0%`,
      transition: "background-position 0.1s ease-out",
    }),
    [throttledPercent],
  );

  const titleStyle = useMemo(
    () => ({
      backgroundImage: `linear-gradient(-60deg, var(--muted) 0%, var(--muted) 50%, var(--primary) 50%, var(--primary) 100%)`,
      backgroundSize: "200% 100%",
      backgroundPosition: `${textProgress}% 0%`,
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
    }),
    [textProgress],
  );

  const isPrimaryDominant = throttledPercent > 50;

  return (
    <section
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="w-full h-screen relative overflow-hidden flex flex-col items-center justify-center"
    >
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={backgroundStyle}
      />

      <h1
        ref={titleRef}
        className="absolute top-10 text-8xl tracking-[0.2em] font-bold z-10 text-transparent bg-clip-text"
        style={titleStyle}
      >
        WORDIX
      </h1>

      <div className="z-10 w-full max-w-5xl flex justify-between items-center px-10">
        <div
          className="flex flex-col items-start gap-6 w-1/2 transition-all duration-300"
          style={{
            color: `rgba(255,255,255,${intensities.left + 0.1})`,
            transform: `scale(${1 + intensities.left * 0.15})`,
            willChange: "transform, color",
          }}
        >
          <h2 className="text-2xl font-semibold">Играть игру дня</h2>

          <Button
            asChild
            size="lg"
            className="gap-2 transition-all duration-300"
            style={{
              backgroundColor:
                intensities.left > 0.7 ? "var(--primary)" : undefined,
              borderColor:
                intensities.left > 0.7 ? "var(--primary)" : undefined,
              color: intensities.left > 0.5 ? "white" : undefined,
            }}
          >
            <Link href="/game">
              <Calendar size={18} />
              Играть
            </Link>
          </Button>
        </div>

        <div
          className="flex flex-col items-end gap-6 w-1/2 transition-all duration-300"
          style={{
            color: `rgba(255,255,255,${intensities.right + 0.1})`,
            transform: `scale(${1 + intensities.right * 0.15})`,
            willChange: "transform, color",
          }}
        >
          <h2 className="text-2xl font-semibold text-right">
            Ввести день или ID игры
          </h2>

          <div className="flex flex-col gap-2 w-full max-w-xs">
            <div className="flex gap-2">
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="dd-MM-yyyy или UUID"
                className="transition-all duration-300"
                style={{
                  backgroundColor: `rgba(255, 255, 255, ${isPrimaryDominant ? 0.15 : 0.1})`,
                  borderColor: `rgba(255, 255, 255, ${intensities.right + 0.3})`,
                  color: isPrimaryDominant ? "white" : "var(--foreground)",
                }}
              />

              <Button
                onClick={handleSearch}
                variant={"ghost"}
                size={"icon-lg"}
                className="transition-all duration-300"
              >
                <ArrowRight size={40} />
              </Button>
            </div>

            <p
              className="text-[13px] text-right leading-snug transition-colors duration-300"
              style={{
                color: `rgba(255,255,255,${intensities.right + 0.3})`,
              }}
            >
              Введите дату в формате{" "}
              <span className="font-medium">2026-02-15</span>
              <br />
              или ID игры (например:{" "}
              <span className="font-mono">
                a2e42729-248b-43e2-bf84-e80ecb20c66c
              </span>
              )
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 flex gap-6 z-10 transition-all duration-300">
        {user ? (
          <>
            <Button
              asChild
              variant="outline"
              className="transition-all duration-300"
              style={{
                backgroundColor:
                  intensities.max > 0.7 ? "rgba(255,255,255,0.1)" : undefined,
                borderColor: `rgba(255,255,255,${intensities.max + 0.2})`,
                color: intensities.max > 0.5 ? "white" : undefined,
              }}
            >
              <Link href={"/profile"}>Перейти в профиль</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="transition-all duration-300"
              style={{
                backgroundColor:
                  intensities.max > 0.7 ? "rgba(255,255,255,0.1)" : undefined,
                borderColor: `rgba(255,255,255,${intensities.max + 0.2})`,
                color: intensities.max > 0.5 ? "white" : undefined,
              }}
            >
              <Link href={"/calendar"}>Перейти в календарь</Link>
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              className="gap-2 transition-all duration-300"
              style={{
                backgroundColor:
                  intensities.max > 0.7 ? "rgba(255,255,255,0.1)" : undefined,
                borderColor: `rgba(255,255,255,${intensities.max + 0.2})`,
                color: intensities.max > 0.5 ? "white" : undefined,
              }}
            >
              <LogIn size={18} />
              Войти
            </Button>

            <Button
              className="gap-2 transition-all duration-300"
              style={{
                backgroundColor:
                  intensities.max > 0.7 ? "var(--primary)" : undefined,
              }}
            >
              <UserPlus size={18} />
              Зарегистрироваться
            </Button>
          </>
        )}
      </div>

      <style jsx global>{`
        input::placeholder {
          color: ${isPrimaryDominant
            ? "rgba(255, 255, 255, 0.7)"
            : `rgba(0, 0, 0, ${0.5 + intensities.right * 0.3})`} !important;
          opacity: 1;
          transition: color 0.3s ease;
        }
      `}</style>
    </section>
  );
}
