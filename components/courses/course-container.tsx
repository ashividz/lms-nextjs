"use client";

interface ContainerProps {
  children?: React.ReactNode;
}
const CourseContainer = ({ children }: ContainerProps) => {
  return (
    <div className="max-w-[2520px] w-full  xl:px-20 md:px-10 sm:px-2 px-4">
      {children}
    </div>
  );
};

export default CourseContainer;
