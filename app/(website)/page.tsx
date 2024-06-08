import Counter from "@/components/counter/counter";
import HeroBannerCard from "@/components/sections/hero-banner-card";
import OurFounder from "@/components/sections/our-founder";
import PopularCourses from "@/components/sections/popular-courses";
import WhoAreWe from "@/components/sections/who-are-we";
import HomeTestimonial from "@/components/testimonials/home-testimonials";
type Banner = {
  id: number;
  title: string;
  spanTxt: string;
  description: string;
  btnTxt: string;
  image: string;
};
const homeBanner: Banner = {
  id: 1,
  title: "Learn & Earn from Home with Our Courses",
  spanTxt: "Job Opportunities for Vedique Health Coach",
  description:
    "Unitus Health Academy, started by Dr Shikha Sharma,  is an online platform to bring different health sciences under one umbrella and provide upskilling opportunities to health professionals and health enthusiasts.",
  btnTxt: "Explore Courses",
  image: "/assets/slider/home.png",
};

const HomePage = () => {
  return (
    <div className="text-3xl">
      <HeroBannerCard
        banner={homeBanner}
        className="pt-5 lg:pt-5  mb-7 md:mb-8 xl:mb-10"
      />
      <OurFounder />
      <WhoAreWe />
      <PopularCourses />
      <HomeTestimonial />
      <Counter isDesc />
    </div>
  );
};

export default HomePage;
