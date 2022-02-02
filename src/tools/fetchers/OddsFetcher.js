import Fetcher from './Fetcher';

export default class OddsFetcher extends Fetcher {
  async getOdds() {
    try {
      return await this.fetch(
        this.baseUrl + `/odds?testing=${this.testing.toString()}`,
      );
    } catch (err) {
      console.error(err);
    }
  }
}
