"use client";

import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { bookmarks, films } from "@/db/schema";

type Props = {
  films: (typeof films.$inferSelect)[];
  bookmarks: (typeof bookmarks.$inferSelect)[];
};

export const Trending = ({ films, bookmarks }: Props) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {films.map((film) => {
          const isBookmarked = bookmarks.some(
            (bookmark) => bookmark.filmId === film.id,
          );
          return (
            <CarouselItem
              key={film.id}
              className="basis-[240px] md:basis-[470px]"
            >
              <Card film={film} isTrending isBookmarked={isBookmarked} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};
