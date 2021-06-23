import _ from 'lodash';

export default (docs) => (
  {
    coll: docs,
    processText: (text) => text.match(/\w+/g),
    search(str) {
      if (str === '') {
        return [];
      }
      const [processedStr] = this.processText(str);
      const filtered = this.coll.filter(({ text }) => this.processText(text).includes(processedStr))
        .map((item) => {
          const count = _.words(item.text).filter((word) => word === processedStr).length;
          return { ...item, metricCount: count };
        });
      return _.sortBy(filtered, 'metricCount').map(({ id }) => id).reverse();
    },
  }
);
