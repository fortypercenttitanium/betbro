export default class Store {
  constructor() {
    this.sportsbookStoreKey = 'betbro_sportsbook_selection';
    this.statsSelectionKey = 'betbro_stats_selections';
    this.layoutKey = 'betbro_layout';
  }

  getLayout() {
    return localStorage.getItem(this.layoutKey);
  }

  setLayout(layout) {
    localStorage.setItem(this.layoutKey, layout);
  }

  getBookSelection() {
    return localStorage.getItem(this.sportsbookStoreKey);
  }

  setBookSelection(book) {
    localStorage.setItem(this.sportsbookStoreKey, book);
  }

  getStatSelections() {
    const selections = JSON.parse(localStorage.getItem(this.statsSelectionKey));

    // if the stored selections match the API, return them, otherwise return null
    return selections?.every(
      (sel) => sel.hasOwnProperty('category') && sel.hasOwnProperty('name'),
    )
      ? selections
      : null;
  }

  setStatSelections(selections) {
    localStorage.setItem(this.statsSelectionKey, JSON.stringify(selections));
  }
}
