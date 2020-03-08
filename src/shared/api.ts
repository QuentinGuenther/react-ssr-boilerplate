import * as fetch from "isomorphic-fetch";

export async function fetchPopularRepos(language = "all") {
  const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

  try {
        const data = await fetch(encodedURI);
        const repos = await data.json();
        return repos.items;
    } catch (error) {
        // tslint:disable-next-line: no-console
        console.warn(error);
        return [];
    }
}
