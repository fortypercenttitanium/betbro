import Fetcher from './Fetcher';
import testOdds from '../../testData/testOdds.json';

export default class OddsFetcher extends Fetcher {
  async getOdds() {
    try {
      if (process.env.REACT_APP_TESTING === 'true') return testOdds;

      return await this.fetch(
        this.baseUrl + `/odds?testing=${this.testing.toString()}`,
      );
    } catch (err) {
      console.error(err);
    }
  }
}
