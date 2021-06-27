import union from 'lodash/union';

export default (data) => (
  {
    docs: data,

    process(str) {
      return str.match(/\w+/g);
    },

    ranging(words, docs) {
      return (
        docs.map((doc) => {
          const matches = words.reduce((acc, word) => {
            const count = this.process(doc.text).filter((wordOfDoc) => wordOfDoc === word).length;
            return acc + count;
          }, 0);
          return { ...doc, matches };
        })
      );
    },

    sort(docs) {
      return docs
        .filter((doc) => doc.matches > 0)
        .sort((docA, docB) => docB.matches - docA.matches);
    },

    invertIndex(docs) {
      const texts = docs.flatMap(({ text }) => this.process(text));

      return texts.reduce((inverted, word) => {
        const filteredDocs = docs.filter(({ text }) => text.includes(word));
        return { ...inverted, [word]: filteredDocs };
      }, {});
    },

    search(str) {
      if (str === '') {
        return [];
      }
      const processedStr = this.process(str);
      const invertedIndex = this.invertIndex(this.docs);
      const keywords = Object.keys(invertedIndex);

      const actualDocs = processedStr.reduce((acc, word) => {
        if (keywords.includes(word)) {
          return union(acc, invertedIndex[word]);
        }
        return acc;
      }, []);

      const rangingDocs = this.ranging(processedStr, actualDocs);

      return this.sort(rangingDocs).map(({ id }) => id);
    },
  }
);
