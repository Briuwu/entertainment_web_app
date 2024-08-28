import { Card } from "@/components/card";
import { films } from "@/db/schema";

type Props = {
  films: (typeof films.$inferSelect)[];
};

export const Cards = ({ films }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7 lg:grid-cols-4 lg:gap-10">
      {films.map((film) => (
        <Card key={film.id} film={film} />
      ))}
    </div>
  );
};
