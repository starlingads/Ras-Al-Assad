import Hero from "@/components/Hero";
import ExpertiseSlider from "@/components/ExpertiseSlider";
import StatsSection from "@/components/StatsSection";
import InteractiveMap from "@/components/InteractiveMap";
import HighlighterServices from "@/components/HighlighterServices";
import ProjectsSlider from "@/components/ProjectsSlider";
import LatestNews from "@/components/LatestNews";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section with Parallax Background */}
      <Hero />

      {/* Expertise Slider Carousel */}
      <ExpertiseSlider />

      {/* Stats and Figure Analytics Card */}
      <StatsSection />

      {/* Geolocational Project Reach Vector Map */}
      <InteractiveMap />

      {/* Highlighter Accordion Services Section */}
      <HighlighterServices />

      {/* Featured Operational Projects Slider */}
      <ProjectsSlider />

      {/* Latest Publications and News Grid */}
      <LatestNews />
    </div>
  );
}
