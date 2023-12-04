export function SyncManager(store, fetcher, onEvent) {
  async function sync() {
    try {
      const data = await fetcher();
      const storedData = store.save(data);
      onEvent?.({
        event: 'success',
        data: storedData,
      });
    } catch (error) {
      onEvent?.({
        event: 'error',
        error,
      });
    }
  }

  return {sync};
}
