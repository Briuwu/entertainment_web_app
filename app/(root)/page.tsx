import { Search } from "@/components/search";
import { Trending } from "./components/trending";
import {
  getAllFilms,
  getRecommendedFilms,
  getSearchedFilms,
} from "@/actions/films";
import { Cards } from "@/components/cards";
import { getAllBookmarks } from "@/actions/bookmark";

async function Home({ searchParams }: { searchParams: { q?: string } }) {
  const films = await getAllFilms();
  const recommendedFilms = await getRecommendedFilms();

  const trendingFilms = films.filter((film) => film.isTrending === true);

  const searchedFilms = await getSearchedFilms(searchParams?.q || "");

  const bookmarks = await getAllBookmarks();
  return (
    <main>
      <div className="space-y-6 px-4">
        <Search placeholder="Search for movies or TV series" />
        {searchParams.q ? (
          <section className="space-y-4">
            <h2 className="text-xl">
              Search results for &quot;{searchParams.q}&quot;
            </h2>
            <Cards films={searchedFilms} />
          </section>
        ) : (
          <>
            <section className="space-y-4">
              <h1 className="text-xl">Trending</h1>
              <Trending films={trendingFilms} bookmarks={bookmarks} />
            </section>
            <section className="space-y-4">
              <h2 className="text-xl">Recommended for you</h2>
              <Cards films={recommendedFilms} />
            </section>
          </>
        )}
      </div>
    </main>
  );
}
export default Home;
