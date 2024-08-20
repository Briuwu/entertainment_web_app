import { Search } from "@/components/search";
import { Trending } from "./components/trending";

function Home() {
  return (
    <main className="container space-y-6">
      <Search />
      <Trending />
    </main>
  );
}
export default Home;
