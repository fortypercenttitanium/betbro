import Fetcher from './Fetcher';
import testStats from '../../testData/testStats.json';

export default class StatsFetcher extends Fetcher {
  async getStats() {
    try {
      if (process.env.REACT_APP_TESTING === 'true') return testStats;

      return await this.fetch(this.baseUrl + '/stats');
    } catch (err) {
      console.error(err);
    }
  }
}
