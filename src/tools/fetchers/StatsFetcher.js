import Fetcher from './Fetcher';

export default class StatsFetcher extends Fetcher {
  async getStats() {
    try {
      return await this.fetch(
        this.baseUrl + `/v1/nfl/teamStats?testing=${this.testing.toString()}`,
      );
    } catch (err) {
      console.error(err);
    }
  }
}
