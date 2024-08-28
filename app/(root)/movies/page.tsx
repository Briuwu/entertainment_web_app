import { getFilmsByMovies, getSearchedFilmsByMovies } from "@/actions/films";
import { Cards } from "@/components/cards";
import { Search } from "@/components/search";

async function MoviesPage({ searchParams }: { searchParams: { q?: string } }) {
  const films = await getFilmsByMovies();

  const searchedFilms = await getSearchedFilmsByMovies(searchParams.q || "");

  return (
    <main>
      <div className="space-y-6 px-4">
        <Search placeholder="Search for movies" />
        {searchParams.q ? (
          <section className="space-y-4">
            <h2 className="text-xl">
              Search results for &quot;{searchParams.q}&quot;
            </h2>
            <Cards films={searchedFilms} />
          </section>
        ) : (
          <section className="space-y-4">
            <h1 className="text-xl">Movies</h1>
            <Cards films={films} />
          </section>
        )}
      </div>
    </main>
  );
}
export default MoviesPage;
