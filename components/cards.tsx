import { getAllBookmarks, isBookmarked } from "@/actions/bookmark";
import { Card } from "@/components/card";
import { films } from "@/db/schema";
import { CarouselItem } from "./ui/carousel";

type Props = {
  films: (typeof films.$inferSelect)[];
};

export const Cards = async ({ films }: Props) => {
  const bookmarks = await getAllBookmarks();

  if (films.length === 0) {
    return <p className="pb-5 uppercase opacity-75">No films found</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7 lg:grid-cols-4 lg:gap-10">
      {films.map((film) => {
        const isBookmarked = bookmarks.some(
          (bookmark) => bookmark.filmId === film.id,
        );
        return <Card key={film.id} film={film} isBookmarked={isBookmarked} />;
      })}
    </div>
  );
};
