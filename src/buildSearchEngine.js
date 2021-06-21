export default (docs) => (
  {
    coll: docs,
    processedText(text) {
      return text.match(/\w+/g);
    },
    search(str) {
      if (str === '') {
        return [];
      }

      const [processedStr] = this.processedText(str);
      return this.coll.filter(({ text }) => this.processedText(text).includes(processedStr))
        .map(({ id }) => id);
    },
  }
);
