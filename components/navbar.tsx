"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const pathname = usePathname();
  const nav_items = [
    {
      label: "Home",
      icon: "/assets/icon-nav-home.svg",
      active: pathname === "/",
      href: "/",
    },
    {
      label: "Movies",
      icon: "/assets/icon-nav-movies.svg",
      active: pathname === "/movies",
      href: "/movies",
    },
    {
      label: "TV Series",
      icon: "/assets/icon-nav-tv-series.svg",
      active: pathname === "/tv-series",
      href: "/tv-series",
    },
    {
      label: "Bookmark",
      icon: "/assets/icon-nav-bookmark.svg",
      active: pathname === "/bookmark",
      href: "/bookmark",
    },
  ];
  return (
    <header className="mb-6 flex items-center justify-between bg-blue-700 px-4 py-5 lg:fixed lg:bottom-4 lg:left-8 lg:top-4 lg:mb-0 lg:w-24 lg:flex-col lg:rounded-lg">
      <Link href="/">
        <Image src="/assets/logo.svg" alt="" width={33} height={27} />
      </Link>
      <nav>
        <ul className="flex items-center gap-6 lg:flex-col">
          {nav_items.map((item, idx) => (
            <li key={idx}>
              <Link href={item.href}>
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={cn(
                    "opacity-50 hover:opacity-75",
                    item.active && "opacity-100",
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <UserButton />
    </header>
  );
};
