import Grid from "./Grid";
import Home from "./Home";
import { fetchPopularRepos } from "./api";

interface IRoute {
  path: string;
  component: any;
  exact?: boolean;
  fetchInitialData?(path: string): Promise<any>;
}

const routes: IRoute[] =  [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/popular/:id",
    component: Grid,
    fetchInitialData: (path = "") => fetchPopularRepos(
        path.split("/").pop()
    ),
  },
];

export default routes;
