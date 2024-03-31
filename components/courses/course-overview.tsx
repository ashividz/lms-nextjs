"use client";

import CourseFeatureItem from "@/components/courses/course-feature-item";

interface CourseOverviewProps {
  course: {
    description: string | null;
  };
}

const CourseOverview = ({ course }: CourseOverviewProps) => {
  return (
    <div className="w-full items-start justify-start">
      <p className="text-lg text-gray-600">{course.description}</p>

      <CourseFeatureItem title="Duration" value="3 Months" />
      <CourseFeatureItem title="Mode" value="100% Online Courses" />
      <CourseFeatureItem title="Certificate" value="Yes" />
      <CourseFeatureItem title="Exams" value="Yes" />
      <CourseFeatureItem
        title="Experience Level"
        value="No experience required"
      />
      <CourseFeatureItem
        title="Study material"
        value="Included in the course"
      />
      <CourseFeatureItem title="Additional Book" value="Everyday Ayurveda" />
      <CourseFeatureItem title="Language" value="English - Hindi" />
    </div>
  );
};

export default CourseOverview;
