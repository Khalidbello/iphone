// "use client";

// import { chipImg, frameImg } from "@/utils";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";
// import Image from "next/image";
// import React, { useRef } from "react";

// gsap.registerPlugin(ScrollTrigger);

// const HowItWorks = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useGSAP(() => {
//     gsap.from("#chip", {
//       scrollTrigger: {
//         trigger: "#chip",
//         start: "top 70%",
//         toggleActions: "play none none reverse restart",
//       },
//       opacity: 0,
//       scale: 3,
//       duration: 2,
//       ease: "power2.inOut",
//     });

//     gsap.to("#game_video", {
//       scrollTrigger: {
//         trigger: "#game_video",
//         start: "top 70%",
//         onEnter: () => videoRef.current?.play(),
//         onLeave: () => videoRef.current?.pause(),
//         onEnterBack: () => videoRef.current?.play(),
//         onLeaveBack: () => videoRef.current?.pause(),
//       },
//       onComplete: () => {
//         videoRef.current?.play();
//       },
//     });

//     gsap.from(".hiw_text", {
//       scrollTrigger: {
//         trigger: ".hiw_text",
//         start: "top 70%",
//         end: "bottom top",
//         toggleActions: "play none reverse reverse",
//       },
//       y: 30,
//       opacity: 0,
//       stagger: 0.2,
//     });

//     gsap.from(".big_text", {
//       scrollTrigger: {
//         trigger: ".big_text",
//         start: "top 70%",
//         end: "bottom top",
//         toggleActions: "play none reverse reverse",
//       },
//       y: 30,
//       opacity: 0,
//       stagger: 0.2,
//     });
//   }, []);

//   return (
//     <div className="sm:py-25 py-15 sm:px-20 px-10 overflow-hidden">
//       <div className="screen-max-width">
//         <div
//           id="chip"
//           className="flex items-center justify-center w-full my-20"
//         >
//           <Image
//             src={chipImg}
//             alt="chip iphone"
//             width={100}
//             height={100}
//             className="scale-160"
//           />
//         </div>
//         <div className="flex flex-col items-center">
//           <h2 className="text-4xl md:text-5xl font-semibold text-center">
//             A17 Pro chip
//             <br />A monster win for gaming
//           </h2>
//           <p className="text-[#86868b] font-semibold text-xl md:text-2xl py-10 text-center">
//             {"It's"} here. The biggest redesign in the hisotry of Apple GPUs.
//           </p>
//         </div>
//         <div className="mt-5 md:mt-15 mb-14">
//           <div className="flex flex-col items-center gap-2">
//             <div className="h-full relative">
//               <div className="relative z-10">
//                 <Image
//                   className="w-full h-full"
//                   src={frameImg}
//                   alt="iphone frame image"
//                 />
//               </div>
//               <div className="absolute top-[5%] left-[1%] w-[98%] rounded-[40px] overflow-hidden">
//                 <video
//                   playsInline
//                   muted
//                   ref={videoRef}
//                   id="game_video"
//                   className="w-full"
//                 >
//                   <source src="assets/videos/frame.mp4" />
//                 </video>
//               </div>
//             </div>
//             <p className="text-[#86868b] font-semibold">Honkai: Star Rail</p>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-y-20 gap-x-20">
//           <div className="space-y-5 col-start-1 col-span-2 md:col-span-1">
//             <p className="hiw_text text-[#86868b] text-lg">
//               Q17 Pro is an entirely new class of iPhone chip that delivers our{" "}
//               <span className="text-white">
//                 best graphic performance by far.
//               </span>
//             </p>
//             <p className="hiw_text text-[#86868b] text-lg">
//               Q17 Pro is an entirely new class of iPhone chip that delivers our{" "}
//               <span className="text-white">
//                 best graphic performance by far.
//               </span>
//             </p>
//           </div>
//           <div className="big_text col-start-1 col-span-2 md:col-start-2 md:col-span-1 flex flex-col gap-2 md:gap-8">
//             <p className="text-[#86868b] md:font-bold">New</p>
//             <p className="text-3xl md:text-4xl md:font-bold text-white">
//               Pro-class GPU
//             </p>
//             <p className="text-[#86868b] md:font-bold">with 6 cores</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HowItWorks;
