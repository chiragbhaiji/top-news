export function SyncManager(store, fetcher) {
  async function getData() {
    const data = store.getArticles();

    if (Array.isArray(data) && data.length > 0) {
      return data;
    }

    return await fetchAndStore();
  }

  async function fetchAndStore(page = 1) {
    const data = await fetcher(page);
    const storedData = store.saveArticles(data);

    return storedData;
  }

  return {getData};
}
