export default (docs) => (
  {
    coll: docs,
    search(str) {
      if (str === '') return [];
      return this.coll
        .filter(({ text }) => text.split(' ').includes(str))
        .map(({ id }) => id);
    },
  }
);
