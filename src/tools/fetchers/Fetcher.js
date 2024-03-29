export default class JsonFetcher {
  baseUrl =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_DEV_URL
      : process.env.REACT_APP_URL;

  async fetch(url) {
    try {
      const query = await fetch(url, { mode: 'cors' });
      if (query.ok) {
        const result = await query.json();

        if (result) {
          return result;
        }
      }

      throw new Error('Failed to fetch');
    } catch (err) {
      console.error(err);
    }
  }
}
