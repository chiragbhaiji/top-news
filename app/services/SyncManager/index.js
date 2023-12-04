export function SyncManager(store, fetcher) {
  async function getData() {
    const data = store.getArticles();

    if (
      data === undefined ||
      data === null ||
      (Array.isArray(data) && data.length === 0)
    ) {
      return await fetchAndStore();
    }

    return data;
  }

  async function fetchAndStore(page = 1) {
    const data = await fetcher(page);
    const storedData = store.saveArticles(data);

    return storedData;
  }

  return {getData};
}
