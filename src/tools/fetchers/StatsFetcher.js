import Fetcher from './Fetcher';

export default class StatsFetcher extends Fetcher {
  async getStats() {
    try {
      return await this.fetch(this.baseUrl + '/stats');
    } catch (err) {
      console.error(err);
    }
  }
}
