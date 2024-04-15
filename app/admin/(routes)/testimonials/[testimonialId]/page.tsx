import { LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";

import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { Banner } from "@/components/banner";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { TestimonialVideoForm } from "./_components/testimonial-video-form";
import { LocationForm } from "./_components/location-form";
import { StudentForm } from "./_components/student-form";
import { ImageForm } from "./_components/image-form";
import { TestimonialActions } from "./_components/testimonial-actions";

const TestimonialIdPage = async ({
  params,
}: {
  params: { testimonialId: string };
}) => {
  const testimonial = await db.testimonials.findUnique({
    where: {
      id: params.testimonialId,
    },
  });

  if (!testimonial) {
    return redirect("/");
  }

  const requiredFields = [testimonial.studentName, testimonial.imageUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completedText = `${completedFields}/${totalFields}`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!testimonial.isPublished && (
        <Banner
          variant="warning"
          label="This testimonial is unpublished. It will not be visible on the website."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Testimonial Setup</h1>
            <span className="text-sm text-slate-700">
              Complete the all required fields {completedText}
            </span>
          </div>
          <TestimonialActions
            disabled={!isComplete}
            testimonialId={params.testimonialId}
            isPublished={testimonial.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize Testimonial</h2>
            </div>
            <StudentForm
              initialData={testimonial}
              testimonialId={testimonial.id}
            />
            <TitleForm
              initialData={testimonial}
              testimonialId={testimonial.id}
            />
            <DescriptionForm
              initialData={testimonial}
              testimonialId={testimonial.id}
            />
            <LocationForm
              initialData={testimonial}
              testimonialId={testimonial.id}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-md">Testimonial Assets</h2>
              </div>
              <ImageForm
                initialData={testimonial}
                testimonialId={testimonial.id}
              />
              <TestimonialVideoForm
                initialData={testimonial}
                testimonialId={testimonial.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialIdPage;
