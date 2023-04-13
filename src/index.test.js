import endsWith from 'lodash/endsWith';

import {
  getPathsToCheck,
  getSource,
  getParseLocalImports,
  getSourceTree,
} from './index';

describe('platno-source-tree ', () => {
  test('getPathsToCheck', async () => {
    expect(await getPathsToCheck('example/src'))
      .toEqual([
        'example/src/index.js',
        'example/src/index.jsx',
        'example/src/index.ts',
        'example/src/index.tsx',
      ]);

    expect(await getPathsToCheck('example/src/a'))
      .toEqual([
        'example/src/a.js',
        'example/src/a.jsx',
        'example/src/a.ts',
        'example/src/a.tsx',
      ]);
  });

  test('getSource', async () => {
    const s1 = await getSource('example/src/a');
    expect(s1.import).toEqual('example/src/a');
    expect(endsWith(s1.path, 'platno-source-tree/example/src/a.js')).toEqual(true);

    const s2 = await getSource('example/src/i');
    expect(s2.import).toEqual('example/src/i');
    expect(s2.path).toEqual(undefined);
  });

  test('getParseLocalImports', async () => {
    const s = await getSource('example/src/a');

    const li = await getParseLocalImports(s.source);
    expect(li).toEqual(['./aa']);
  });

  test('getSourceTree', async () => {
    const st = await getSourceTree('example/src/a');

    expect(st.import).toEqual('example/src/a');
  });
});
