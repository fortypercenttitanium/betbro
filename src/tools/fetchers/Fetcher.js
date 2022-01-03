export default class JsonFetcher {
  async fetch(url) {
    try {
      const query = await fetch(url);

      if (query.ok) {
        const result = await query.json();

        if (result) {
          return result;
        }
      }

      return {
        error: 'Failed to fetch',
      };
    } catch (err) {
      console.error(err);
    }
  }
}
