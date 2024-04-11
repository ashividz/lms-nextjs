"use client";

import EnrolledCourses from "../_components/enrolled-course";
import Tabs from "../_components/tabs";

const EnrolledCoursePage = () => {
  const tabs = [
    {
      label: "Enrolled Courses",
      content: <EnrolledCourses />,
    },
    {
      label: "Active Courses",
      content: <div>No Active Course</div>,
    },
    {
      label: "Completed Courses",
      content: <div>No Completed Course</div>,
    },
  ];
  return (
    <div className="bg-white rounded-md shadow-sm transition p-4">
      <h1 className="text-3xl font-bold border-b-2 border-slate-200 pb-2 text-gray-700">
        Enrolled Courses
      </h1>
      <div className="flex flex-col justify-between w-full py-2">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default EnrolledCoursePage;
