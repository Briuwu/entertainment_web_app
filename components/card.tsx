/* eslint-disable @next/next/no-img-element */
import { films } from "@/db/schema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

type Props = {
  film: typeof films.$inferSelect;
  isTrending?: boolean;
};

export const Card = ({ film, isTrending }: Props) => {
  let sanitizedTitle = film.title
    .replaceAll(" ", "-")
    .replaceAll(":", "")
    .replaceAll("'", "")
    .toLowerCase();

  let sanitizedCategory = film.category.replaceAll(" ", "-").toLowerCase();
  sanitizedCategory =
    sanitizedCategory === "movie" ? "movies" : sanitizedCategory;

  return (
    <div
      className={cn(
        "group relative block max-w-fit overflow-hidden rounded-sm",
        !isTrending && "space-y-2",
      )}
    >
      <div>
        <Image
          src={`/assets/thumbnails/${sanitizedTitle}/small.jpg`}
          alt={film.title}
          className="block rounded-sm transition-transform duration-300 group-hover:scale-105 md:hidden"
          width={328}
          height={220}
        />
        <Image
          src={`/assets/thumbnails/${sanitizedTitle}/medium.jpg`}
          alt={film.title}
          className="hidden rounded-sm transition-transform duration-300 group-hover:scale-105 md:block lg:hidden"
          width={480}
          height={280}
        />
        <Image
          src={`/assets/thumbnails/${sanitizedTitle}/large.jpg`}
          alt={film.title}
          className="hidden rounded-sm transition-transform duration-300 group-hover:scale-105 lg:block"
          width={560}
          height={348}
        />
      </div>
      <Link
        href={`/${sanitizedCategory}/${sanitizedTitle}`}
        className={cn(
          "absolute inset-0 grid place-content-center",
          !isTrending && "bottom-12",
        )}
      >
        <div className="absolute inset-0 bg-transparent group-hover:bg-black/10" />
        <div className="flex h-12 w-[117px] items-center justify-center gap-3 rounded-full bg-white/25 opacity-0 group-hover:opacity-100">
          <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
              fill="#FFF"
            />
          </svg>
          <span>Play</span>
        </div>
      </Link>
      <Link
        href={`/${sanitizedCategory}/${sanitizedTitle}`}
        className={cn("block", isTrending && "absolute bottom-0 z-10 p-4")}
      >
        <div className="text-[12px] opacity-75">
          {film.year} &#x2022; {film.category} &#x2022; {film.rating}
        </div>
        <p className="text-[15px] font-semibold">{film.title}</p>
      </Link>
      <Button className="absolute right-0 top-0 z-20 m-2 grid h-8 w-8 place-content-center rounded-full bg-blue-900 bg-opacity-50">
        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
            stroke="#FFF"
            stroke-width="1.5"
            fill="none"
          />
        </svg>
      </Button>
    </div>
  );
};
