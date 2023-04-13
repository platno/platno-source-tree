# platno-source-tree

## Quick start

Install

`npm install platno-source-tree --save`

Use by running example script

`npm run example`

or

```js
import { getSourceTree } from 'platno-source-tree';

const sourceTree = await getSourceTree('./example/src/a');
```

This would generate the following object:

```js
{
  import: './example/src/a',
  path: '/Users/petar.vudragovic/Documents/platno/platno-source-tree/example/src/a.js',
  source: "import aa from './aa';\n\nconst a = aa;\n\nexport default a;\n",
  imports: [
    {
      import: './aa',
      path: '/Users/petar.vudragovic/Documents/platno/platno-source-tree/example/src/aa.js',
      source: 'const aa = 2;\n\nexport default aa;\n',
      imports: []
    }
  ]
}
```