import fetchNews from "../../lib/fetchNews";
import NewsList from "../NewsList";

type Props = {
    searchParams?: { term: string };
};

async function SearchPage({ searchParams }: Props) {
    const news: NewsResponse = await fetchNews(
        "general",
        searchParams?.term,
        true
    );

    return (
        <div>
            <h1 className="text-4xl font-serif capitalize px-10 pt-5 underline decoration-orange-400 decoration-2 underline-offset-4 ">
                Search Results for:{searchParams?.term}</h1>

            <NewsList news={news} />
        </div>
    )
}

export default SearchPage