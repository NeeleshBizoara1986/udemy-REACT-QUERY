import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.py4e.com/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetching } = useInfiniteQuery({
    queryKey: ["sw-species"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  })
  // TODO: get data for InfiniteScroll via React Query
  // const species = data.pages?.flatMap((pageData) => pageData.results) || [];

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  if (isError) {
    return <div className="error">Error fetching data.</div>;
  }
  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={() => { if (!isFetching) fetchNextPage(); }}
      >
        {data.pages.map((pageData) => {
          return pageData.results.map((specie) => {
            return (
            <Species
              key={specie.name}
              name={specie.name}
              language={specie.language}
              averageLifespan={specie.average_lifespan}
            />
          )})
        })}
      </InfiniteScroll>
    </>
  );
}
