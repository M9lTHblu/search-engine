import buildSearchEngine from '../src/buildSearchEngine';
import docs from '../__fixtures__/docs';

const searchEngine = buildSearchEngine(docs);
const searchEngine2 = buildSearchEngine([]);

test('relevance metric', () => {
  expect(searchEngine2.search('')).toEqual([]);
  expect(searchEngine.search('pint')).toEqual(['doc1']);
  expect(searchEngine.search('pint!')).toEqual(['doc1']);
  expect(searchEngine.search('shoot')).toEqual(['doc2', 'doc1']);
});
