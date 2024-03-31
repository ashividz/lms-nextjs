"use client";

interface CourseFeatureItemProps {
  title: string;
  value: string;
}

const CourseFeatureItem = ({ title, value }: CourseFeatureItemProps) => {
  return (
    <div className="flex mx-2 my-4  border-b-2 border-gray-200 items-center justify-between">
      <div>
        <span className="text-gray-600 font-bold mr-2">{title}</span>
      </div>
      <div>
        <span className="text-black">{value}</span>
      </div>
    </div>
  );
};

export default CourseFeatureItem;
