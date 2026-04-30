---

## Infinite Queries & Infinite Scroll (React Query)

### Key Concepts
- **useInfiniteQuery** is used for infinite scrolling (fetching more data as the user scrolls).
- It manages pages of data and provides helpers for loading more pages.

### How to Use `useInfiniteQuery`
1. **Import the hook:**
    ```js
    import { useInfiniteQuery } from '@tanstack/react-query';
    ```
2. **Call in your component:**
    ```js
    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
      queryKey: ['sw-people'],
      queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    });
    ```
    - **data**: Contains all loaded pages (`data.pages`).
    - **fetchNextPage**: Function to load the next page (used by infinite scroll UI).
    - **hasNextPage**: Boolean, true if there’s more data to load.

3. **Query Function:**
    - Receives an object with `pageParam` (the URL for the next page).
    - On first load, `pageParam` is undefined, so set a default (e.g., `initialUrl`).
    - The function fetches data from the Star Wars API using the URL.

4. **getNextPageParam Option:**
    - Determines what the next `pageParam` should be after each fetch.
    - For SWAPI, the API response includes a `next` property (URL for the next page, or `null` if no more pages).
    - Return `lastPage.next` if it exists, otherwise `undefined` (which disables further fetching).

5. **How Infinite Scroll Works:**
    - When the user scrolls, call `fetchNextPage()` to load more data.
    - If `hasNextPage` is `false`, there’s no more data to load.

### Example (Star Wars People)
```js
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['sw-people'],
  queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
  getNextPageParam: (lastPage) => lastPage.next || undefined,
});
```

- `data.pages` is an array of all loaded pages.
- `fetchNextPage()` loads the next page using the URL from `lastPage.next`.
- `hasNextPage` is `true` if there’s a next page (i.e., `lastPage.next` is not null).

### Summary Table
| Property         | Purpose                                  |
|------------------|------------------------------------------|
| data.pages       | Array of all loaded pages                |
| fetchNextPage    | Function to load the next page           |
| hasNextPage      | Boolean, true if more data is available  |
| pageParam        | URL for the next page (managed by hook)  |

### Interview-Ready Summary
> `useInfiniteQuery` in React Query enables infinite scrolling by managing pages of data, providing helpers to fetch the next page, and determining if more data is available. It uses a `pageParam` to track the next page and a `getNextPageParam` function to extract the next page’s URL from the API response.

---
