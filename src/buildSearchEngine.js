

export default (docs) => (
  {
    coll: docs,
    search: function (str) {
      if (str === '') return [];
      return this.coll.filter((item) => {
        const words = item.text.split(' ');
        if (words.includes(str)) {
          return item;
        }
      }).map(({id}) => id)
    }
  }
)
