import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaqTitleForm } from "./_components/faq-title-form";
import { FaqDescriptionForm } from "./_components/faq-description-form";

import { Banner } from "@/components/banner";

import { FaqActions } from "./_components/faq-actions";

const FAQIdPage = async ({
  params,
}: {
  params: { courseId: string; faqId: string };
}) => {
  const faq = await db.faqs.findUnique({
    where: {
      id: params.faqId,
      courseId: params.courseId,
    },
  });
  if (!faq) {
    return redirect("/");
  }

  const requiredFields = [faq.title, faq.description];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completedText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!faq.isPublished && (
        <Banner
          variant="warning"
          label="This faq is unpublished. It will not be visible in the course module."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/admin/courses/${faq.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Faq Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields to publish a faq {completedText}
                </span>
              </div>
              <FaqActions
                disabled={!isComplete}
                courseId={params.courseId}
                faqId={params.faqId}
                isPublished={faq.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-16 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-md font-medium">Customize your faq </h2>
              </div>
              <FaqTitleForm
                initialData={faq}
                courseId={faq.courseId}
                faqId={faq.id}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-md font-medium">
                Customize your faq description
              </h2>
            </div>
            <FaqDescriptionForm
              initialData={faq}
              courseId={faq.courseId}
              faqId={faq.id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQIdPage;
