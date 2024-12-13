import React, { useEffect, useMemo, useRef, useState } from "react";
import YoutubeEmbed from "../YoutubeEmbed";
import ArrowIcon from "../../assets/svgIcon/ArrowSvg";

export interface ICarouselItem {
  title: string;
  link: string;
  artist: string;
  description?: string;
}

export interface CarouselProps {
  contentData: ICarouselItem[];
  onPaginationChange?: (index: number, orientation: "prev" | "next") => void;
  itemSize?: number;
}

export const Carousel = ({
  contentData,
  onPaginationChange,
  itemSize = 0.9,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToNext = () => {
    if (currentIndex + 1 === maxIndex) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrevious = () => {
    if (currentIndex - 1 < 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const divRef = useRef<HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState<string>("auto");
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
            `${divRef.current.getBoundingClientRect().width * itemSize}px`
          );
        }
      }, 100);
  }, [divRef.current, contentData]);

  const maxIndex = useMemo(() => {
    console.log(1 / itemSize);
    console.log(contentData.length - Math.trunc(1 / itemSize) + 1);
    return contentData.length - Math.trunc(1 / itemSize) + 1;
  }, [contentData]);

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
              transform: `translateX(calc((${currentIndex} * -${divWidth} - ${currentIndex} * 8px)`,
            }}
          >
            <div className="padding-space" />
            {divRef &&
              contentData.map((data) => (
                <div key={data.title}>
                  <div
                    className="bg-zinc-700 p-8 w-full h-full text-white rounded-md py-6"
                    style={{
                      minWidth: divWidth,
                      minHeight: divHeight,
                    }}
                  >
                    <div className="catalog-yt-video">
                      <YoutubeEmbed
                        embedId={data.link.replace(
                          "https://www.youtube.com/watch?v=",
                          ""
                        )}
                      />
                    </div>
                    <div className="mt-4">
                      <p className="medium-text-bold text-white">
                        {data.artist}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="medium-text text-stone-300">
                        {data.description}
                      </p>
                    </div>
                  </div>
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
          className={`-rotate-90 flex h-8 w-8 items-center justify-center rounded-full border border-neutral3 transition-all ${
            currentIndex + 1 !== 1
              ? "cursor-pointer hover:shadow-md hover:bg-purple-700"
              : "cursor-default"
          }`}
        >
          <ArrowIcon />
        </button>
        <button
          type="button"
          disabled={currentIndex + 1 === contentData.length}
          onClick={() => {
            goToNext();
            if (onPaginationChange) onPaginationChange(currentIndex, "next");
          }}
          className={`rotate-90 flex h-8 w-8 items-center justify-center rounded-full border border-neutral3 transition-all ${
            currentIndex + 1 !== maxIndex
              ? "cursor-pointer hover:shadow-md hover:bg-purple-700"
              : "cursor-default"
          }`}
        >
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
};
