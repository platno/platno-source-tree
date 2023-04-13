import filter from 'lodash/filter';
import map from 'lodash/map';
import startsWith from 'lodash/startsWith';

import fs from 'fs/promises';
import path from 'path';

import { parse } from 'es-module-lexer';

const SUPPORTED_EXTENSIONS = ['js', 'jsx', 'ts', 'tsx'];

export const getSourceTree = async (importValue, resolveFrom) => {
  const s = await getSource(importValue, resolveFrom);

  if (s.source) {
    const localImportValues = getParseLocalImports(s.source);
    s.imports = [];

    for (let i = 0; i < localImportValues.length; i++) {
      const localImport = await getSourceTree(localImportValues[i], s.path);

      s.imports.push(localImport);
    }
  }

  return s;
};

export const getParseLocalImports = (source) => {
  const [imports] = parse(source);

  return filter(
    map(imports, 'n'),
    (i) => startsWith(i, './') || startsWith(i, '../'),
  );
};

export const getSource = async (importValue, resolveFrom = './') => {
  const resolvedImportValue = path.resolve(path.dirname(resolveFrom), importValue);
  const pathsToCheck = await getPathsToCheck(resolvedImportValue);

  for (let i = 0; i < pathsToCheck.length; i++) {
    try {
      const fileSource = await fs.readFile(pathsToCheck[i], { encoding: 'utf8', flag: 'r' });

      return {
        import: importValue,
        path: pathsToCheck[i],
        source: fileSource,
      };
    } catch (e) {
    }
  }

  return {
    import: importValue,
    path: undefined,
    source: undefined,
  };
};

export const getPathsToCheck = async (importValue) => {
  let prefix = '';

  try {
    const stat = await fs.stat(importValue);

    if (stat.isDirectory()) {
      prefix = '/index';
    }
  } catch (e) {
  }

  return map(SUPPORTED_EXTENSIONS, (e) => `${importValue}${prefix}.${e}`);
};

export default getSourceTree;
