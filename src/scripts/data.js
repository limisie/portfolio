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
                blocks {
                    id
                    image {
                      alt
                      url
                      title
                      width
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
            date
            endDate
            description
            roles
            technologies
            githubLink
            coverImage {
                alt
                url
                width
              }
            screenshots {
              alt
              url
              title
              width
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

async function getAllProjects() {
    const response = await postRequest(allProjectsRequest);
    return response.allProjects
}

async function getAllArticles() {
    const response = await postRequest(allArticlesRequest);
    return response.allArticles
}

export const data = {
    articles: await getAllArticles(),
    projects: await getAllProjects()
}