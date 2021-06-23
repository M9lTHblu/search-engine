export default (docs) => (
  {
    coll: docs,

    search(str) {
      if (str === '') {
        return [];
      }

      return this.coll
        .map((item) => {
          const count = str
            .match(/\w+/g)
            .reduce((acc, word) => (item.text.match(/\w+/g).includes(word) ? acc + 1 : acc), 0);

          return { ...item, count };
        })
        .filter((item) => item.count > 0)
        .sort((a, b) => a.count - b.count)
        .map(({ id }) => id)
        .reverse();
    },
  }
);
