import { db } from "@/lib/db";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
const TestimonialsAdminPage = async () => {
  const testimonials = await db.testimonials.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="p-6">
      <DataTable
        columns={columns}
        data={testimonials}
        title="Testimonials"
        href="/admin/testimonials/create"
      />
    </div>
  );
};

export default TestimonialsAdminPage;
