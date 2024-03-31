"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Preview } from "@/components/preview";
import { Badge } from "@/components/ui/badge";
import WatchVideoButton from "@/components/courses/watch-video-button";

interface Chapter {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  createdAt: Date;
}

interface CourseContentProps {
  chapters: Chapter[];
}

const CourseContent = ({ chapters }: CourseContentProps) => {
  const firstChapterId = chapters.length > 0 ? chapters[0].id : null;

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const visibleChapters = showAll ? chapters : chapters.slice(0, 5);

  return (
    <div className="w-full">
      <Accordion
        type="single"
        defaultValue={firstChapterId || ""}
        collapsible
        className="w-full"
      >
        {visibleChapters.map((chapter) => (
          <AccordionItem key={chapter.id} value={chapter.id}>
            <div className="w-full">
              <AccordionTrigger className="flex items-center justify-between w-full bg-sky-100 hover:bg-sky-200 border px-4 py-4  border-sky-200 hover:no-underline">
                <div className="flex items-center justify-between gap-3 md:gap-0 w-full ">
                  <p className="text-lg font-bold w-full text-start">
                    {chapter.title}
                  </p>

                  <div className="ml-auto pr-2 flex items-center gap-x-2">
                    {chapter.isFree && (
                      <Badge className="bg-rose-500">Free</Badge>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
            </div>
            <AccordionContent className="border border-t-0 mt-0 border-sky-200">
              <Preview
                value={chapter.description || "No description available"}
              />
              <WatchVideoButton
                isFree={chapter.isFree}
                videoUrl={chapter.videoUrl || null}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
        {chapters.length > 5 && (
          <button
            onClick={toggleShowAll}
            className="text-white mt-4 block mx-auto px-4 py-2 rounded-md bg-emerald-600 hover:bg-sky-500 transition-colors duration-300"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        )}
      </Accordion>
    </div>
  );
};

export default CourseContent;
