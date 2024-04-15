"use client";

import NavbarItem from "@/components/header/navbar-item";

const navbarItems = [
  {
    label: "Home",
    href: "/",
    hasChild: false,
  },
  {
    label: "Courses",
    href: "/courses",
    hasChild: false,
  },
  {
    label: "Alumni",
    href: "/alumni",
    hasChild: false,
  },
  {
    label: "Student Speaks",
    href: "/student-speaks",
    hasChild: false,
  },
  {
    label: "Career",
    href: "/career",
    hasChild: false,
  },
  {
    label: "Faculty",
    href: "/faculty",
    hasChild: false,
  },
];

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center relative">
      <div className="flex gap-x-2">
        {navbarItems.map((item) => (
          <NavbarItem key={item.label} item={item} />
        ))}
      </div>
    </nav>
  );
};
