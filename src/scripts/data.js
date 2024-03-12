const allArticlesRequest = {
    query: `{
        allArticles {
            id
            title
            slug
            excerpt
            publishDate
            coverImage {
                alt
                url
            }
            tags
            content {
                value
            }
        }
    }`,
}

async function postRequest(request) {
    const response = await fetch("https://graphql.datocms.com/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${import.meta.env.DATOCMS_API_KEY}`,
        },
        body: JSON.stringify(request),
    });

    const parsedResponse = await response.json();
    return parsedResponse.data
}

export async function getAllArticles() {
    const response = await postRequest(allArticlesRequest);
    return response.allArticles
}