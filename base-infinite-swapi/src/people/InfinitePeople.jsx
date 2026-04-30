import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from '@tanstack/react-query';

// const initialUrl = "api/people/";
const initialUrl = "https://swapi.py4e.com/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  debugger;
  if (!response.ok) {
    console.error("Error fetching data from", url);
    throw new Error("Network response was not ok");
  }
  console.log("Successfully fetched data from", url);
  // const data = await response.json();
  // console.log("Fetched data from", url, ":", data);
  const text = await response.text();
  console.log("Raw response text:", text);
  const data = JSON.parse(text);
  console.log("Fetched data from", url, ":", data);
  return data;
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetching } = useInfiniteQuery({
    queryKey: ["sw-people"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  })

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
      {data && data.pages
        ? data.pages.flatMap((pageData) =>
          pageData.results.map((person) => (
            <Person
              key={person.name}
              name={person.name}
              hairColor={person.hair_color}
              eyeColor={person.eye_color}
            />
          ))
        )
        : null}
    </InfiniteScroll>
    </>
  )
  // return <InfiniteScroll loadMore={() => {
  //   if (!isFetching) {
  //     fetchNextPage();
  //   }
  // }}
  //   hasMore={hasNextPage} loader={
  //   <div key="loader">Loading...</div>}>
  //   {data?.pages.map((pageData) =>
  //     pageData.results.map((person) =>
  //       <Person
  //         key={person.name}
  //         name={person.name}
  //         hairColor={person.hair_color}
  //         eyeColor={person.eye_color} />)
  //   )}
  // </InfiniteScroll>;
}
