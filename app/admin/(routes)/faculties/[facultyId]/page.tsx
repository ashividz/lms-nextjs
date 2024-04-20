import { LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";

import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { Banner } from "@/components/banner";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { FacultyForm } from "./_components/faculty-form";
import { ShortDescriptionForm } from "./_components/short-description-form";
import { FacultyActions } from "./_components/faculty-actions";

const FacultyIdPage = async ({ params }: { params: { facultyId: string } }) => {
  const faculty = await db.faculty.findUnique({
    where: {
      id: params.facultyId,
    },
  });

  if (!faculty) {
    return redirect("/");
  }

  const requiredFields = [faculty.name, faculty.imageUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completedText = `${completedFields}/${totalFields}`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!faculty.isPublished && (
        <Banner
          variant="warning"
          label="This faculty is unpublished. It will not be visible on the website."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Faculty Setup</h1>
            <span className="text-sm text-slate-700">
              Complete the all required fields {completedText}
            </span>
          </div>
          <FacultyActions
            disabled={!isComplete}
            facultyId={params.facultyId}
            isPublished={faculty.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize Faculty</h2>
            </div>
            <FacultyForm initialData={faculty} facultyId={faculty.id} />
            <ShortDescriptionForm
              initialData={faculty}
              facultyId={faculty.id}
            />
            <DescriptionForm initialData={faculty} facultyId={faculty.id} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-md">Faculty Assets</h2>
              </div>
              <ImageForm initialData={faculty} facultyId={faculty.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyIdPage;
