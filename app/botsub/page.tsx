import Hero from "@/Components/bot_sub_new_landng/Hero";
import HorizontalCardSlider from "@/Components/bot_sub_new_landng/horizontal_card";
import ResponsiveNavbar from "@/Components/bot_sub_new_landng/nav_bar";
import WhatsaapFeature from "@/Components/bot_sub_new_landng/on_whatsapp";
import ScrollImageSequence from "@/Components/bot_sub_new_landng/Video_comp";
import WhatsAppTestimonials from "@/Components/bot_sub_new_landng/whats_app_reviews";
import React from "react";

const Page = () => {
  return (
    <div className="w-screen h-screen bg-white">
      <ResponsiveNavbar />
      <Hero />
      <ScrollImageSequence />
      <HorizontalCardSlider />
      <WhatsaapFeature />
      <WhatsAppTestimonials />
    </div>
  );
};

export default Page;
