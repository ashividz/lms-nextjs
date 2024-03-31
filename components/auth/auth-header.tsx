import AdminLogo from "@/app/admin/_components/admin-logo";

interface AuthHeaderProps {
  label: string;
}

export const AuthHeader = ({ label }: AuthHeaderProps) => {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <AdminLogo />
      <h2 className="text-md text-muted-foreground">{label}</h2>
    </div>
  );
};
