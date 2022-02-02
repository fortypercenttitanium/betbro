export default class JsonFetcher {
  baseUrl =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_DEV_URL
      : process.env.REACT_APP_URL;

  testing = process.env.REACT_APP_TESTING ? true : false;

  async fetch(url) {
    try {
      const query = await fetch(url);
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
