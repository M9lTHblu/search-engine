import _ from 'lodash';

export default (documents) => new Search(documents);

class Search {
  constructor(data = []) {
    this.docs = data
    this.termsAndDocs = this.invertIndex(data)
  }

  getDocsCount(docs) {
    return docs.length;
  }

  getTermDocsCount(term) {
    return this.termsAndDocs[term].length;
  }

  getWordsOfDocCount(docId) {
    const { text } = this.docs[docId];
    return this.process(text).length;
  }

  getMatchedDocs(term) {
    return this.docs
      .filter(({ text }) => this.process(text).includes(term));
  }

  process(str) {
    return _.words(str.toLowerCase())
  }

  invertIndex() {
    const allWordsOfDocs = this.docs.flatMap(({ text }) =>
      _.uniq(this.process(text)));

    const termsAndDocs = allWordsOfDocs.reduce((acc, term) => {
      const matchedDocs = this.getMatchedDocs(term);
      const docsCount = this.getDocsCount(matchedDocs);
      const totalDocsCount = this.getDocsCount(this.docs);
      const idf = Math.log(totalDocsCount / docsCount);

      const addedMetrics = matchedDocs.map((doc) => {
        const words = this.process(doc.text);
        const tf = words.filter(word => word === term).length / words.length;
        return { ...doc, tf, idf, tfIdf: tf * idf }
      })

      return { ...acc, [term]: addedMetrics }
    }, {});

    return termsAndDocs
  }

  search(str) {
    if (str === '') {
      return [];
    }
    const res = this.process(str).flatMap((term) => {
      const docs = this.termsAndDocs[term];
      return  docs.reduce((acc, { id, tfIdf }) => {
        if (acc[id]) {
          acc[id] += tfIdf;
        } else {
          acc[id] = tfIdf;
        }
        return acc
      }, {})
    })
    return Object.entries(res[0]).sort(([, value1], [, value2]) => value2 - value1).map(([id, ]) => id)
  }
}