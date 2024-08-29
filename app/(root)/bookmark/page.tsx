import { getAllBookmarks, getSearchedBookmarks } from "@/actions/bookmark";
import { getAllFilms, getSearchedFilmsByTvSeries } from "@/actions/films";
import { Cards } from "@/components/cards";
import { Search } from "@/components/search";

async function BookmarkPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const data = await getAllFilms();
  const bookmarks = await getAllBookmarks();

  const searchedFilms = await getSearchedBookmarks(searchParams.q || "");

  const films = data.filter((film) => {
    return bookmarks.some((bookmark) => bookmark.filmId === film.id);
  });

  let movieFilms = films.filter((film) => film.category === "Movie");
  let tvSeriesFilms = films.filter((film) => film.category === "TV Series");

  return (
    <main>
      <div className="space-y-6 px-4">
        <Search placeholder="Search for bookmarked shows" />
        {searchParams.q ? (
          <section className="space-y-4">
            <h2 className="text-xl">
              Search results for &quot;{searchParams.q}&quot;
            </h2>
            <Cards films={searchedFilms} />
          </section>
        ) : (
          <div className="space-y-12">
            <section className="space-y-4">
              <h1 className="text-xl">Bookmarked Movies</h1>
              <Cards films={movieFilms} />
            </section>
            <section className="space-y-4">
              <h2 className="text-xl">Bookmarked TV Series</h2>
              <Cards films={tvSeriesFilms} />
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
export default BookmarkPage;
