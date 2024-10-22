import React, { useEffect, useRef, useState } from "react";

export interface ICarouselItem {
  title: string;
}

export interface CarouselProps {
  contentData: ICarouselItem[];
  onPaginationChange?: (index: number, orientation: "prev" | "next") => void;
}

export const Carousel = ({
  contentData,
  onPaginationChange,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToNext = () => {
    if (currentIndex + 1 === contentData.length) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrevious = () => {
    if (currentIndex - 1 < 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const divRef = useRef<HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState<string>("");
  const [divWidth, setDivWidth] = useState<string>("auto");
  useEffect(() => {
    if (divRef.current)
      setTimeout(() => {
        if (divRef.current) {
          if (divHeight === "") {
            setDivHeight("auto");
          } else
            setDivHeight(`${divRef.current.getBoundingClientRect().height}px`);
          setDivWidth(
            `${divRef.current.getBoundingClientRect().width * 0.9}px`
          );
        }
      }, 100);
  }, [divRef.current]);

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className="flex flex-col items-start justify-center w-full h-full"
        ref={divRef}
      >
        <div className="relative w-screen overflow-hidden">
          <div
            className={`flex gap-2 items-start transition-transform duration-500 ease-in-out`}
            style={{
              transform: `translateX(calc((${currentIndex} * -${divWidth} - ${currentIndex} * 8px) + ${
                currentIndex === contentData.length - 1
                  ? `${divWidth}/10 + 8px`
                  : "0px"
              }`,
            }}
          >
            {divRef &&
              contentData.map((data) => (
                <div
                  key={data.title}
                  style={{
                    height: divHeight,
                    minWidth: divWidth,
                  }}
                >
                  <div className="border border-stone-300 p-8 w-full h-full">{data.title}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center justify-center pt-6 pb-1">
        <button
          type="button"
          disabled={currentIndex + 1 === 1}
          onClick={() => {
            goToPrevious();
            if (onPaginationChange) onPaginationChange(currentIndex, "prev");
          }}
          className={`flex h-8 w-8 items-center justify-center rounded-full border border-neutral3 transition-all ${
            currentIndex + 1 !== 1 ? "cursor-pointer hover:shadow-md" : ""
          }`}
        >
          <div className="rotate-90">{">"} </div>
        </button>
        <p className="body-text text-neutral7">
          {currentIndex + 1} de {contentData.length}
        </p>
        <button
          type="button"
          disabled={currentIndex + 1 === contentData.length}
          onClick={() => {
            goToNext();
            if (onPaginationChange) onPaginationChange(currentIndex, "next");
          }}
          className={`flex h-8 w-8 items-center justify-center rounded-full border border-neutral3 transition-all ${
            currentIndex + 1 !== contentData.length
              ? "cursor-pointer hover:shadow-md"
              : ""
          }`}
        >
          <div className="-rotate-90">{">"}</div>
        </button>
      </div>
    </div>
  );
};
