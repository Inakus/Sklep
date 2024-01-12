import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function Carousel({ slides }: { slides: string[] }) {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition duration-75 ease-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, i) => {
          return <img key={i} src={s} />;
        })}
      </div>

      <div className="absolute top-0 flex h-full w-full items-center justify-between px-10 text-3xl text-white">
        <button onClick={previousSlide}>
          <ChevronLeft size={40} />
        </button>
        <button onClick={nextSlide}>
          <ChevronRight size={40} />
        </button>
      </div>

      <div className="absolute bottom-0 flex w-full justify-center gap-3 py-4">
        {slides.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`h-5 w-5 cursor-pointer rounded-full  ${
                i == current ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
