"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Award, CheckCircle, X } from "lucide-react";
import { LucideIcon } from "@/components/LucideIcon";

/**
 * View-model props, mapped from PROJECTS_PAGE_QUERY by the server page.
 *
 * The filter bars are fully data-driven: the main tabs come from the
 * client-managed Categories collection, and each sub-filter row comes from a
 * Filter Group (shown under the categories listed in its `appliesTo`).
 * This replaces the previously hardcoded brand/sector arrays — adding a new
 * category or filter in the Studio requires zero code changes.
 */
export type ProjectsPageData = {
  hero: {
    chip?: string | null;
    title?: string | null;
    titleAccent?: string | null;
    titleEnd?: string | null;
    subtitle?: string | null;
    backgroundUrl?: string | null;
    backgroundAlt?: string | null;
  };
  emptyStateText?: string | null;
  categories: { slug: string; name: string; icon?: string | null }[];
  filterGroups: {
    slug: string;
    allLabel: string;
    /** Category slugs this row appears under; empty = every category. */
    appliesTo: string[];
    filters: { slug: string; name: string }[];
  }[];
  projects: {
    slug: string;
    name: string;
    categorySlug?: string | null;
    categoryTitle?: string | null;
    categoryIcon?: string | null;
    filterSlugs: string[];
    imageUrl?: string | null;
    coverUrl?: string | null;
    imageAlt?: string | null;
    location?: string | null;
    client?: string | null;
    capacity?: string | null;
    year?: string | null;
    status?: string | null;
    highlights: string[];
  }[];
};

type Project = ProjectsPageData["projects"][number];

export default function ProjectsPage({ data }: { data: ProjectsPageData }) {
  const { hero, categories, filterGroups, projects, emptyStateText } = data;

  const [selectedCategory, setSelectedCategory] = useState("all");
  // One selection per filter group: groupSlug → filter slug | "all".
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter rows shown for the current category tab.
  const activeGroups = filterGroups.filter(
    (group) =>
      selectedCategory !== "all" &&
      group.filters.length > 0 &&
      (group.appliesTo.length === 0 || group.appliesTo.includes(selectedCategory)),
  );

  // Filter projects based on category and every active filter row.
  const filteredProjects = projects.filter((project) => {
    if (selectedCategory !== "all" && project.categorySlug !== selectedCategory) {
      return false;
    }
    for (const group of activeGroups) {
      const selection = selectedFilters[group.slug];
      if (selection && selection !== "all" && !project.filterSlugs.includes(selection)) {
        return false;
      }
    }
    return true;
  });

  const handleCategoryChange = (catSlug: string) => {
    setSelectedCategory(catSlug);
    setSelectedFilters({}); // Reset sub-filters on primary change
  };

  return (
    <div className="bg-ras-light min-h-screen pb-24 pt-[76px] lg:pt-[80px] relative overflow-hidden">
      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          {hero.backgroundUrl && (
            <Image
              src={hero.backgroundUrl}
              alt={hero.backgroundAlt || "Ras Al Assad landmark infrastructure portfolio"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-60"
              priority
            />
          )}
          {/* Premium Black Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 to-black/55" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pb-16 pt-40 w-full">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#AB8857] mb-4 block"
          >
            {hero.chip}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
          >
            {hero.title}
            {hero.titleAccent && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AB8857] via-[#D4B282] to-[#AB8857]">
                {hero.titleAccent}
              </span>
            )}
            {hero.titleEnd}
          </motion.h1>
          {hero.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg text-white/85 max-w-2xl leading-relaxed"
            >
              {hero.subtitle}
            </motion.p>
          )}
        </div>
      </section>

      <div className="wrapper max-w-7xl mx-auto px-6 relative z-10 pt-16">

        {/* Categories / Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-6 border-b border-ras-grey/15 pb-6">
          {[{ slug: "all", name: "All Projects" }, ...categories.map((c) => ({ slug: c.slug, name: c.name }))].map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95 ${
                selectedCategory === cat.slug
                  ? "bg-ras-gold text-ras-charcoal shadow-[0_6px_20px_-6px_rgba(197,168,128,0.7)]"
                  : "bg-ras-charcoal/5 border border-ras-charcoal/15 text-ras-charcoal hover:bg-ras-charcoal/10 hover:border-ras-charcoal/30 hover:-translate-y-0.5"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Secondary Sub-Category Filter Bars (one per applicable filter group) */}
        <AnimatePresence mode="wait">
          {activeGroups.map((group) => {
            const selection = selectedFilters[group.slug] ?? "all";
            return (
              <motion.div
                key={`${selectedCategory}-${group.slug}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap gap-2 mb-12 p-2 bg-ras-charcoal/5 rounded-2xl border border-ras-charcoal/10"
              >
                {[{ slug: "all", name: group.allLabel }, ...group.filters].map((chip) => (
                  <button
                    key={chip.slug}
                    onClick={() =>
                      setSelectedFilters((prev) => ({ ...prev, [group.slug]: chip.slug }))
                    }
                    className={`px-4 py-2 rounded-xl text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 ${
                      selection === chip.slug
                        ? "bg-white text-ras-charcoal shadow-sm"
                        : "text-ras-charcoal/60 hover:text-ras-charcoal hover:bg-ras-charcoal/5"
                    }`}
                  >
                    {chip.name}
                  </button>
                ))}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedProject(project)}
                className="group relative rounded-[28px] overflow-hidden aspect-[0.8] w-full border border-ras-grey/10 bg-white cursor-pointer hover:border-ras-gold/30 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ras-charcoal via-ras-charcoal/30 to-transparent z-10 transition-opacity group-hover:opacity-95" />

                <div className="absolute inset-0 overflow-hidden">
                  {project.imageUrl && (
                    <Image
                      src={project.imageUrl}
                      alt={project.imageAlt || project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Card Elements */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between text-white">

                  {/* Category icon badge */}
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/15">
                      <LucideIcon name={project.categoryIcon} fallback="Cpu" className="w-5.5 h-5.5 text-ras-gold" />
                    </div>
                    <span className="text-[9px] uppercase tracking-widest bg-ras-gold text-ras-charcoal px-2.5 py-1 rounded-full font-bold">
                      View Specifications
                    </span>
                  </div>

                  {/* Text details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-ras-gold">
                      <MapPin className="h-3 w-3" />
                      <span>{(project.location ?? "").split(",")[0]}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-light tracking-tight leading-snug">
                      {project.name}
                    </h2>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state (client-editable message) */}
        {filteredProjects.length === 0 && (
          <p className="text-center text-sm text-ras-grey py-16">
            {emptyStateText || "No projects in this category yet"}
          </p>
        )}

        {/* Specification Detail Lightbox/Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ras-charcoal/90 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-ras-charcoal border border-white/10 rounded-[32px] overflow-hidden max-w-4xl w-full max-h-[85vh] flex flex-col lg:flex-row relative z-50 shadow-2xl"
              >

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-black/40 text-white hover:bg-ras-gold hover:text-ras-charcoal transition-all border border-white/15"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Project Left Panel (Image) */}
                <div className="relative lg:w-1/2 aspect-video lg:aspect-auto lg:h-auto min-h-[250px] overflow-hidden bg-black flex-shrink-0">
                  {(selectedProject.coverUrl || selectedProject.imageUrl) && (
                    <Image
                      src={selectedProject.coverUrl || selectedProject.imageUrl!}
                      alt={selectedProject.imageAlt || selectedProject.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ras-charcoal via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ras-charcoal pointer-events-none" />
                </div>

                {/* Project Right Panel (Details) */}
                <div className="p-8 lg:p-12 flex flex-col justify-between overflow-y-auto max-h-[85vh] lg:max-h-none flex-grow">
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-1.5 text-ras-gold font-semibold text-xs tracking-wider uppercase mb-1">
                        <Award className="h-4 w-4" />
                        <span>{(selectedProject.categoryTitle ?? "").toUpperCase()} PROJECT</span>
                      </div>
                      <h2 className="text-3xl font-light tracking-tight text-white leading-tight">
                        {selectedProject.name}
                      </h2>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-4 border-t border-b border-white/10 py-5 text-sm">
                      <div className="space-y-1">
                        <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Client</p>
                        <p className="text-white font-medium">{selectedProject.client}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Location</p>
                        <p className="text-white font-medium">{selectedProject.location}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Rating / Capacity</p>
                        <p className="text-ras-gold font-bold">{selectedProject.capacity}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Year Completed</p>
                        <div className="flex items-center gap-1 text-white font-medium">
                          <Calendar className="h-4 w-4 text-ras-gold" />
                          <span>{selectedProject.year}</span>
                        </div>
                      </div>
                    </div>

                    {/* Engineering highlights */}
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-widest text-white/50 font-bold">Engineering Deliverables</p>
                      <ul className="space-y-2.5">
                        {selectedProject.highlights.map((item, index) => (
                          <li key={index} className="flex items-start gap-2.5 text-sm text-ras-light/75 leading-relaxed font-normal">
                            <CheckCircle className="h-4.5 w-4.5 text-ras-gold mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Status Banner */}
                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
                    <span>STATUS</span>
                    <span className="font-bold uppercase tracking-wider text-ras-gold bg-ras-gold/10 px-3 py-1 rounded-full border border-ras-gold/20">
                      {selectedProject.status}
                    </span>
                  </div>

                </div>

              </motion.div>
              {/* Backing Dismissal */}
              <div
                className="absolute inset-0 z-40 pointer-events-auto"
                onClick={() => setSelectedProject(null)}
              />
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
