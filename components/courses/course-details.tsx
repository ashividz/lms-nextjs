"use client";

import { useState, useEffect, useRef } from "react";

import MenuItem from "@/components/courses/menu-item";
import CourseContent from "@/components/courses/course-content";
import CourseDetailsContent from "@/components/courses/course-details-content";
import CourseFaqs from "@/components/courses/course-faqs";
import Coursefaculty from "@/components/courses/course-faculty";
import CourseCareer from "@/components/courses/course-career";
import CourseOverview from "@/components/courses/course-overview";
import { Categories, Chapters, Courses, Faqs } from "@prisma/client";

const menuItems = [
  {
    title: "Overview",
    id: 1,
  },
  {
    title: "Course Content",
    id: 2,
  },
  {
    title: "Details",
    id: 3,
  },
  {
    title: "Faculty",
    id: 4,
  },
  {
    title: "FAQs",
    id: 5,
  },
  {
    title: "Career",
    id: 6,
  },
];

type CourseWithProgressWithCategory = Courses & {
  category: Categories | null;
  chapters: Chapters[];
  faqs: Faqs[];
  progress: number | null;
};

interface CourseDetailsProps {
  course: CourseWithProgressWithCategory;
}

const CourseDetails = ({ course }: CourseDetailsProps) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const sectionRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
    Overview: useRef<HTMLDivElement>(null),
    "Course Content": useRef<HTMLDivElement>(null),
    Details: useRef<HTMLDivElement>(null),
    Faculty: useRef<HTMLDivElement>(null),
    FAQs: useRef<HTMLDivElement>(null),
    Career: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  });

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    const tabElement = document.getElementById(tabName);
    if (tabElement) {
      tabElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative">
      <div className="sticky top-[70px] z-10 bg-white w-full rounded-md shadow-sm transition my-4 py-4 flex overflow-x-auto ">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            tabTitle={item.title}
            isActive={activeTab === item.title}
            onClick={() => handleTabClick(item.title)}
            className="flex-shrink-0"
          />
        ))}
      </div>

      {menuItems.map((item) => (
        <div
          key={item.id}
          id={item.title}
          ref={sectionRefs[item.title]}
          className={`tab-content bg-white w-full rounded-md shadow-sm transition my-4 p-4 ${
            activeTab === item.title ? "active" : ""
          }`}
        >
          {item.title === "Overview" && (
            <>
              <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                About {course.title}
              </h2>
              <CourseOverview course={course} />
            </>
          )}
          {item.title === "Course Content" && (
            <>
              <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                Course Content
              </h2>
              <CourseContent chapters={course.chapters} />
            </>
          )}
          {item.title === "Details" && (
            <>
              <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                Course Details
              </h2>
              <CourseDetailsContent
                technologyRequirement="Laptop and high speed internet."
                eligibility="Anybody with a zeal for healthy nutrition."
                disclaimer="Not for clinical practice."
              />
            </>
          )}
          {item.title === "Faculty" && (
            <>
              <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                Faculty
              </h2>
              <Coursefaculty />
            </>
          )}
          {item.title === "FAQs" && (
            <>
              <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                FAQs
              </h2>
              <CourseFaqs faqs={course.faqs} />
            </>
          )}
          {item.title === "Career" && (
            <>
              <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                Career
              </h2>
              <CourseCareer />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseDetails;
