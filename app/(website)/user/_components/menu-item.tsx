import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface MenuItemProps {
  label: string;
  href: string;
  menuIcon?: LucideIcon;
}

const MenuItem = ({ label, href, menuIcon: Icon }: MenuItemProps) => {
  return (
    <>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-x-2 text-sm  pl-6 transition-all text-slate-700 hover:bg-sky-500/10 hover:text-sky-700 font-bold"
        )}
      >
        <div className="flex items-center gap-x-2 py-4">
          {Icon && <Icon size={18} className="text-slate-500" />}
          {label}
        </div>
      </Link>
      <Separator />
    </>
  );
};

export default MenuItem;
