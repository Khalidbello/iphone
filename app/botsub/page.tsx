import FAQ from "@/Components/bot_sub_new_landng/faq";
import Footer from "@/Components/bot_sub_new_landng/footer";
import HeroFeatureWithScroll from "@/Components/bot_sub_new_landng/hero_test";
import HorizontalCardSlider from "@/Components/bot_sub_new_landng/horizontal_card";
import ResponsiveNavbar from "@/Components/bot_sub_new_landng/nav_bar";
import WhatsaapFeature from "@/Components/bot_sub_new_landng/on_whatsapp";
import WhatsAppTestimonials from "@/Components/bot_sub_new_landng/whats_app_reviews";
import React from "react";

const Page = () => {
  return (
    <div className="w-screen h-screen bg-white">
      <ResponsiveNavbar />
      {/* <Hero /> */}
      <HeroFeatureWithScroll />
      <HorizontalCardSlider />
      <WhatsaapFeature />
      <WhatsAppTestimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
