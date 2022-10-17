import Fetcher from './Fetcher';
import testStats from '../../testData/testStats.json';

export default class StatsFetcher extends Fetcher {
  async getStats() {
    try {
      if (process.env.REACT_APP_TESTING === 'true') return testStats;

      return await this.fetch(
        this.baseUrl + `/v1/nfl/teamStats?testing=${this.testing.toString()}`,
      );
    } catch (err) {
      console.error(err);
    }
  }
}
