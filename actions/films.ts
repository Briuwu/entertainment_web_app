"use server";

import { db } from "@/db";
import { bookmarks, films } from "@/db/schema";
import { and, eq, ilike, sql } from "drizzle-orm";
import { cache } from "react";

export const getAllFilms = cache(async () => {
  const data = await db.query.films.findMany();

  return data;
});

export const getRecommendedFilms = cache(async () => {
  const data = await db
    .select()
    .from(films)
    .orderBy(sql`RANDOM()`)
    .limit(20);

  return data;
});

export const getSearchedFilms = cache(async (query: string) => {
  const data = await db
    .select()
    .from(films)
    .where(ilike(films.title, `%${query}%`));

  return data;
});

export const getFilmsByTvSeries = cache(async () => {
  const data = await db
    .select()
    .from(films)
    .where(eq(films.category, "TV Series"));

  return data;
});

export const getSearchedFilmsByTvSeries = cache(async (query: string) => {
  const data = await db
    .select()
    .from(films)
    .where(
      and(eq(films.category, "TV Series"), ilike(films.title, `%${query}%`)),
    );

  return data;
});

export const getFilmsByMovies = cache(async () => {
  const data = await db.select().from(films).where(eq(films.category, "Movie"));

  return data;
});

export const getSearchedFilmsByMovies = cache(async (query: string) => {
  const data = await db
    .select()
    .from(films)
    .where(and(eq(films.category, "Movie"), ilike(films.title, `%${query}%`)));

  return data;
});
