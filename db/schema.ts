import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const ratingsEnum = pgEnum("rating", ["G", "PG", "E", "18+"]);

export const categoryEnum = pgEnum("category", ["TV Series", "Movie"]);

export const films = pgTable("films", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  year: integer("year").notNull(),
  rating: ratingsEnum("rating").notNull(),
  category: categoryEnum("category").notNull(),
  isTrending: boolean("is_trending").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  filmId: integer("film_id").references(() => films.id),
});

export const bookmarkRelations = relations(bookmarks, ({ one }) => ({
  film: one(films, {
    fields: [bookmarks.filmId],
    references: [films.id],
  }),
}));
