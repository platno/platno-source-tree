import { getSourceTree } from '../src';

(async () => {
  const input = process.argv[process.argv.indexOf('--i') + 1];
  const sourceTree = await getSourceTree(input);

  console.log(`sourceTree of ${input}`, sourceTree);
})();
