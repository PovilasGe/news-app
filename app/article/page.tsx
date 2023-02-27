import { notFound } from "next/navigation"

type Props = {
    searchParams?: Article;
}

function page({ searchParams }: Props) {
    if (
        (searchParams && Object.entries(searchParams).length === 0) ||
        !searchParams
    ) {
        return notFound();
    }

    const article: Article = searchParams
    return (
        <article>
            <section className="flex flex-col lg:flex-row pb-24 px-0 lg:px-10">
                {article.image && (
                    <img
                        className="h-50 max-w-md mx-auto md:max-w-lg lg:max-w-xl object-cover rounded-lg shadow-md"
                        src={article.image}
                        alt={article.title}
                    />
                )}
                <div className="px-10">
                    <h1 className="text-4xl font-serif capitalize px-10 pt-5 underline decoration-orange-400 decoration-2 underline-offset-4 pb-10">
                        {article.title}
                    </h1>

                    <div className="flex divide-x-2 space-x-4">
                        <h2 className="font-bold">By: {article.author}</h2>
                        <h2 className="font-bold pl-4">Source: {article.source}</h2>
                    </div>
                    <p className="pt-4">{article.description}</p>
                </div>
            </section>
        </article>
    )
}

export default page