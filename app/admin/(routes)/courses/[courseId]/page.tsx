import {
  BadgeIndianRupeeIcon,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";

import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChapterForm } from "./_components/chapter-form";
import { Banner } from "@/components/banner";
import { CourseActions } from "./_components/course-actions";
import { FAQForm } from "./_components/faq-form";
import { CourseDetailsForm } from "./_components/course-details-form";
import { CourseMetaDataForm } from "./_components/course-meta-data-form";
import { FacultyAssignForm } from "./_components/faculty-assign-form";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.courses.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachements: {
        orderBy: {
          createdAt: "desc",
        },
      },
      faqs: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const categories = await db.categories.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const faculties = await db.faculty.findMany({
    orderBy: {
      name: "asc",
    },
    where: {
      isPublished: true,
    },
  });

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    //course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completedText = `${completedFields}/${totalFields}`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner
          variant="warning"
          label="This course is unpublished. It will not be visible to the students."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course Setup</h1>
            <span className="text-sm text-slate-700">
              Complete the all required fields {completedText}
            </span>
          </div>
          <CourseActions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize Course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
            <FacultyAssignForm
              initialData={course}
              courseId={course.id}
              options={faculties.map((faculty) => ({
                label: faculty.name,
                value: faculty.id,
              }))}
            />

            <CourseMetaDataForm initialData={course} courseId={course.id} />
            <CourseDetailsForm initialData={course} courseId={course.id} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-md">Course Chapters</h2>
              </div>
              <ChapterForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={BadgeIndianRupeeIcon} />
                <h2 className="text-md">Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-md">Resources & attachments</h2>
              </div>
              <AttachmentForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-md">Course FAQs</h2>
              </div>
              <FAQForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
