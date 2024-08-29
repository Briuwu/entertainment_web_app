"use server";

import { db } from "@/db";
import { bookmarks, films } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getAllBookmarks = cache(async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const data = await db.query.bookmarks.findMany({
    where: eq(bookmarks.userId, userId),
  });

  return data;
});

export const isBookmarked = cache(async (filmId: number) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const data = await db.query.bookmarks.findFirst({
    where: and(eq(bookmarks.userId, userId), eq(bookmarks.filmId, filmId)),
  });

  return !!data;
});

export const saveBookmark = cache(async (filmId: number) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.insert(bookmarks).values({
    userId,
    filmId,
  });

  revalidatePath("/");
  revalidatePath("/bookmark");
  revalidatePath("/tv-series");
  revalidatePath("/movies");
});

export const deleteBookmark = cache(async (filmId: number) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db
    .delete(bookmarks)
    .where(and(eq(bookmarks.userId, userId), eq(bookmarks.filmId, filmId)));

  revalidatePath("/");
  revalidatePath("/bookmark");
  revalidatePath("/tv-series");
  revalidatePath("/movies");
});

export const getSearchedBookmarks = cache(async (query: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const data = await db.query.bookmarks.findMany({
    with: {
      film: true,
    },
  });

  const searchData = data.filter((bookmark) => {
    return bookmark.film!.title.toLowerCase().includes(query.toLowerCase());
  });

  const filmData = searchData.map((bookmark) => bookmark.film!);

  return filmData;
});
