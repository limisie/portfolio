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
        }
    }`,
}

const allArticlesWithContentRequest = {
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
                blocks {
                    id
                    image {
                      alt
                      url
                      title
                    }
                  }
            }
        }
    }`,
}

const allProjectsRequest = {
    query: `{
        allProjects {
            category
            id
            slug
            title
            excerpt
            startDate
            endDate
            coverImage {
                alt
                url
              }
          }
      }`,
}

const allProjectsRequestWithContent = {
    query: `{
        allProjects {
            category
            id
            slug
            title
            startDate
            endDate
            description
            roles
            technologies
            screenshots {
              alt
              url
              title
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

export async function getAllProjects() {
    const response = await postRequest(allProjectsRequest);
    return response.allProjects
}

export async function getAllProjectsWithContent() {
    const response = await postRequest(allProjectsRequestWithContent);
    return response.allProjects
}

export async function getAllArticles() {
    const response = await postRequest(allArticlesRequest);
    return response.allArticles
}

export async function getAllArticlesWithContent() {
    const response = await postRequest(allArticlesWithContentRequest);
    return response.allArticles
}