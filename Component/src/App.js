import Component from './core/Component.js';
import ItemAppender from './components/ItemAppeder.js';
import ItemFilter from './components/ItemFilter.js';
import Items from './components/Items.js';

export default class App extends Component {
  setup() {
    this.$state = {
      isFilter: 0,
      items: [
        { seq: 1, contents: 'item1', active: false },
        { seq: 2, contents: 'item2', active: true },
      ],
    };
  }

  template() {
    return `
      <header data-component="item-appender"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `;
  }

  mounted() {
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = document.querySelector(
      '[data-component="item-appender"]'
    );
    const $items = document.querySelector('[data-component="items"]');
    const $itemFilter = document.querySelector(
      '[data-component="item-filter"]'
    );

    new ItemAppender($itemAppender, { addItem: addItem.bind(this) });
    new Items($items, {
      filteredItems,
      toggleItem: toggleItem.bind(this),
      deleteItem: deleteItem.bind(this),
    });
    new ItemFilter($itemFilter, { filterItem: filterItem.bind(this) });
  }

  get filteredItems() {
    const { isFilter, items } = this.$state;
    return items.filter(
      ({ active }) =>
        (isFilter === 1 && active) ||
        (isFilter === 2 && !active) ||
        isFilter === 0
    );
  }

  addItem(contents) {
    const { items } = this.$state;
    const seq = Math.max(0, ...items.map((item) => item.seq)) + 1;
    const active = false;
    this.setState({ items: [...items, { seq, contents, active }] });
  }

  deleteItem(seq) {
    const items = [...this.$state.items];
    items.splice(
      items.findIndex((v) => v.seq === seq),
      1
    );
    this.setState({ items });
  }

  toggleItem(seq) {
    const items = [...this.$state.items];
    const index = items.findIndex((v) => v.seq === seq);
    items[index].active = !items[index].active;
    this.setState({ items });
  }

  filterItem(isFilter) {
    this.setState({ isFilter });
  }
}
