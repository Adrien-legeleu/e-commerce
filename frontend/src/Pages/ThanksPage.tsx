import { Link } from "react-router-dom";
import GridPattern from "../components/design/GridPattern";
import { cn } from "../utils/cn";
import { Home } from "lucide-react";
import Confetti, { ConfettiRef } from "../components/filter/Confetti";
import { useRef, useEffect } from "react";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";

defineElement(lottie.loadAnimation);

export const ThanksPage = () => {
  const confettiRef = useRef<ConfettiRef>(null);

  const ConfettiSideCannons = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confettiRef.current?.fire({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confettiRef.current?.fire({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };
  useEffect(() => {
    ConfettiSideCannons();
  }, []);

  return (
    <div className="relative flex flex-col gap-32 h-screen w-full items-center justify-center font-montserrat">
      <h1 className="z-10 tracking-wider text-5xl font-semibold text-blackGray">
        Merci d'avoir commandé !!
      </h1>
      <Link to="/" className="z-10">
        <button className="p-5 bg-white shadow-2xl hover:scale-105 ease-in-out duration-300 rounded-3xl w-20 h-20 flex items-center justify-center">
          <Home className="w-full h-full" />
        </button>
      </Link>
      <button
        onClick={ConfettiSideCannons}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 p-3 capitalize font-medium text-sm text-white  rounded-xl bg-blackGray z-10 flex items-end justify-center gap-5"
      >
        <p className="relative ">confettis </p>
        <lord-icon
          src="https://cdn.lordicon.com/fkmafinl.json"
          trigger="morph"
          style={{ width: "25px", height: "25px" }}
        ></lord-icon>
      </button>
      <GridPattern
        numSquares={15}
        maxOpacity={0.3}
        duration={3}
        repeatDelay={1}
        className={cn(
          "fixed inset-0 w-full h-screen skew-y-12 mask-radial-gradient"
        )}
      />
      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-0 h-full w-full"
      />
    </div>
  );
};
