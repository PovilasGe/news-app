import { categories } from "../constants";
import fetchNews from "../lib/fetchNews";

async function Homepage() {
  //fetch news
  const news: NewsResponse = await fetchNews(categories.join(','));


  return (
    <div>
      {/* NewsList news */}
    </div>
  )
}

export default Homepage