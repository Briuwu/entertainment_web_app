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
import { films } from "@/db/schema";

type Props = {
  films: (typeof films.$inferSelect)[];
};

export const Trending = ({ films }: Props) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {films.map((film) => (
          <CarouselItem
            key={film.id}
            className="basis-[240px] md:basis-[470px]"
          >
            <Card film={film} isTrending />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
