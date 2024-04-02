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
    hasChild: true,
    children: [
      {
        label: "Course 1",
        href: "/course-1",
      },
      {
        label: "Course 2",
        href: "/course-2",
      },
      {
        label: "Course 3",
        href: "/course-3",
      },
      {
        label: "Course 4",
        href: "/course-4",
      },
      {
        label: "Course 5",
        href: "/course-5",
      },
      {
        label: "Course 6",
        href: "/course-6",
      },
      {
        label: "Course 7",
        href: "/course-7",
      },
      {
        label: "Course 8",
        href: "/course-8",
      },
      {
        label: "Course 9",
        href: "/course-9",
      },
      {
        label: "Course 10",
        href: "/course-10",
      },
    ],
  },
  {
    label: "Alumni",
    href: "/alumni",
    hasChild: false,
  },
  {
    label: "Students Speaks",
    href: "/students-speak",
    hasChild: false,
  },
  {
    label: "Career",
    href: "/career",
    hasChild: false,
  },
  {
    label: "Online Workshop",
    href: "/online-workshop",
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
