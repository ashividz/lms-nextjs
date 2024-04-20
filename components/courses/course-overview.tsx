"use client";

import CourseFeatureItem from "@/components/courses/course-feature-item";
import { Courses } from "@prisma/client";

interface CourseOverviewProps {
  course: Courses;
}

const CourseOverview = ({ course }: CourseOverviewProps) => {
  return (
    <div className="w-full items-start justify-start">
      <p className="text-lg text-gray-600">{course.description || "N/A"}</p>

      <CourseFeatureItem title="Duration" value={course.duration || "N/A"} />
      <CourseFeatureItem
        title="Mode"
        value={
          course.mode || "Live interactive classes at the comfort of your home"
        }
      />
      <CourseFeatureItem
        title="Certificate"
        value={
          course.certificate ||
          "Yes, Unitus academy will reward a course completion certificate"
        }
      />
      <CourseFeatureItem
        title="Exams"
        value={
          course.exams ||
          "Exam to be conducted after the completion of the course"
        }
      />
      <CourseFeatureItem
        title="Experience Level"
        value={course.experienceLevel || "No prior experience required"}
      />
      <CourseFeatureItem
        title="Study material"
        value={course.studyMaterial || "Included in the course"}
      />
      <CourseFeatureItem
        title="Additional Book"
        value={course.additionalBook || "N/A"}
      />
      <CourseFeatureItem
        title="Language"
        value={course.language || "English - Hindi"}
      />
    </div>
  );
};

export default CourseOverview;
