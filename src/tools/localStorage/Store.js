export default class Store {
  constructor() {
    this.sportsbookStoreKey = 'betbro_sportsbook_selection';
    this.statsSelectionKey = 'betbro_stats_selections';
  }

  getBookSelection() {
    return localStorage.getItem(this.sportsbookStoreKey);
  }

  setBookSelection(book) {
    localStorage.setItem(this.sportsbookStoreKey, book);
  }

  getStatSelections() {
    return JSON.parse(localStorage.getItem(this.statsSelectionKey));
  }

  setStatSelections(selections) {
    localStorage.setItem(this.sportsbookStoreKey, JSON.stringify(selections));
  }
}
