import buildSearchEngine from '../src/buildSearchEngine';
import docs from '../__fixtures__/docs';

const searchEngine = buildSearchEngine(docs);
const searchEngine2 = buildSearchEngine([]);

test('create search engine object', () => {
  expect(searchEngine.search('shoot')).toEqual(['doc1', 'doc2']);
  expect(searchEngine2.search('')).toEqual([]);
});

test('words processing', () => {
  expect(searchEngine.search('pint')).toEqual(['doc1']);
  expect(searchEngine.search('pint!')).toEqual(['doc1']);
});
