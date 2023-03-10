import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean
) => {
    // GraphQL query
    const query = gql`
    query myQuery(
        $access_key: String!
        $categories: String!
        $keywords: String
    ) {
        myQuery(
            access_key: $access_key
            categories: $categories
            countries: "gb"
            sort: "published_desc"
            keywords: $keywords
        ){
            data{
                author
                category
                country
                description
                image
                language
                source
                title
                url
            }
            pagination{
                count
                limit
                offset
                total
            }
        }
    }
    `;

    //Fetch function with Next.js 13 cashing

    const res = await fetch('https://lingal.stepzen.net/api/aspiring-seagull/__graphql', {
        method: 'POST',
        cache: isDynamic ? 'no-cache' : 'default',
        next: isDynamic ? { revalidate: 0 } : { revalidate: 60 },
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
        },

        body: JSON.stringify({
            query,
            variables: {
                access_key: process.env.MEDIASTACK_API_KEY,
                categories: category,
                keywords: keywords,
            },
        }),
    },
    );


    const newsResponse = await res.json();


    //sort function by images vs not images present

    const news = sortNewsByImage(newsResponse.data.myQuery);

    return news;
}

export default fetchNews

// stepzen import curl "http://api.mediastack.com/v1/news?access_key=3e30c896f6495428866a792092340867&countries=us%2Cgb&limit=100&offset=0&sort=published_desc"
