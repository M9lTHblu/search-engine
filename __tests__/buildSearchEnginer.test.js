import buildSearchEngine from '../src/buildSearchEngine';
import docs from '../__fixtures__/docs';


test('create search engine object', () => {
  const searchEngine = buildSearchEngine(docs);
  const searchEngine2 = buildSearchEngine([]);
  expect(searchEngine.search('shoot')).toEqual(['doc1', 'doc2']);
  expect(searchEngine2.search('')).toEqual([]);
});


