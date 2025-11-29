import { pauseImg, playImg, replayImg } from "@/utils";
import Image from "next/image";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { videos } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const MyCarousel = () => {
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const progressBarRefs = useRef<HTMLDivElement[]>([]);
  const progressSlider = useRef<HTMLDivElement[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // function to play current video
  const playVideo = (i: number) => {
    videoRefs.current[i]?.play().catch(console.error);
  };

  const pauseVideos = () => {
    videoRefs.current.forEach((ele) => ele.pause());
  };

  // function to run when video ends
  const videoEndedHandler = (i: number) => {
    const nextIndex = (i + 1) % videos.length;

    if (nextIndex === 0) {
      setIsPlaying(false);
      setEnded(true);
      return;
    }

    setCurrentVideoIndex(nextIndex);

    const timeline = animateVideoTransition(i, nextIndex);

    if (!timeline) return;

    timeline.eventCallback("onComplete", () => playVideo(nextIndex));
  };

  const animateVideoTransition = (from: number, to: number) => {
    if (!carouselWrapperRef.current || !carouselWrapperRef.current.firstChild)
      return;

    const itemWidth =
      // @ts-expect-error getBoundingClientRect is valid
      carouselWrapperRef.current.firstChild.getBoundingClientRect().width;

    console.log("Inner width: in animate video transiton", itemWidth);

    const timeline = gsap.timeline();

    timeline.to(progressBarRefs.current[from], {
      width: 15,
      duration: 0.5,
    });

    timeline.to(progressBarRefs.current[to], {
      width: 60,
      duration: 0.5,
    });

    timeline.to(progressSlider.current[from], {
      width: `0%`,
      duration: 0.1,
    });

    timeline.to(carouselWrapperRef.current, {
      x: -itemWidth * to,
      duration: 1,
    });

    return timeline;
  };

  const handleTimeUpdate = (i: number) => {
    const video = videoRefs.current[i];

    if (video && video.duration) {
      const progress = (video.currentTime / video.duration) * 100;

      gsap.to(progressSlider.current[i], {
        width: `${progress}%`,
        duration: 0.05,
      });
    }
  };

  // function to reset video
  const restartVideo = () => {
    const timeline = animateVideoTransition(currentVideoIndex, 0);
    if (!timeline) return;

    timeline.eventCallback("onComplete", () => playVideo(0));

    videoRefs.current.forEach((ele, i) => {
      if (i === 0) return;

      ele.pause();

      gsap.to(progressBarRefs.current[i], {
        width: 15,
        duration: 0.5,
      });

      gsap.to(progressSlider.current[i], {
        width: `0%`,
        duration: 0.1,
      });
    });

    setIsPlaying(true);
    setEnded(false);
  };

  // fucntion to toggle video play
  const togglePlay = (state: string) => {
    switch (state) {
      case "play":
        setIsPlaying((pre) => !pre);
        playVideo(currentVideoIndex);
        break;
      case "pause":
        setIsPlaying((pre) => !pre);
        pauseVideos();
        break;
      case "restart":
        restartVideo();
        break;
      default:
        return;
    }
    if (!isPlaying) {
    } else {
    }
  };

  useGSAP(() => {
    // Set initial progress for first video
    if (progressBarRefs.current[0]) {
      gsap.set(progressBarRefs.current[0], { width: 60 });
    }

    ScrollTrigger.create({
      trigger: carouselWrapperRef.current,
      start: "top 70%",
      end: "bottom 30%",
      onEnter: () => {
        restartVideo();
      },
      onLeave: () => {
        pauseVideos();
        setIsPlaying(false);
      },
      onEnterBack: () => {
        restartVideo();
      },
      onLeaveBack: () => {
        pauseVideos();
        setIsPlaying(false);
      },
    });
  });

  return (
    <div className="mx-auto overflow-hidden">
      {/* carousel */}

      <div
        ref={carouselWrapperRef}
        id="carousel-wrapper"
        className="flex flex-nowrap"
      >
        {videos.map((ele, i) => (
          <div
            key={i}
            className="relative shrink-0 w-full max-w-[650px] rounded-3xl p-4"
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[i] = el;
              }}
              muted
              playsInline
              onEnded={() => videoEndedHandler(i)}
              onTimeUpdate={() => handleTimeUpdate(i)}
              className="w-full h-full object-cover rounded-3xl"
            >
              <source src={ele.video} />
            </video>
            <div className="absolute top-10 left-[8%]">
              {ele.textLists.map((ele, i) => (
                <p key={i} className="text-xl font-medium">
                  {ele}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* indicatior progress */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <div className="flex gap-2 bg-gray-900 p-4 rounded-3xl">
          {videos.map((_, i) => (
            <div
              ref={(ele) => {
                if (ele) progressBarRefs.current[i] = ele;
              }}
              key={i}
              className="w-[15px] h-[15px] bg-gray-800 rounded-full"
            >
              <div
                ref={(ele) => {
                  if (ele) progressSlider.current[i] = ele;
                }}
                className="w-0 h-full bg-blue-200 rounded-full"
              ></div>
            </div>
          ))}
        </div>
        <button className="w-12 h-12 cursor-pointer rounded-full bg-gray-800 flex justify-center">
          <Image
            onClick={() =>
              togglePlay(ended ? "restart" : isPlaying ? "pause" : "play")
            }
            src={ended ? replayImg : isPlaying ? pauseImg : playImg}
            alt="play"
          />
        </button>
      </div>
    </div>
  );
};

export default MyCarousel;
