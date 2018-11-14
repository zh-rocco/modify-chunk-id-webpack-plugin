const DEFAULT_PREFIX = 'mci';
const DEFAULT_CONVERTER = null;

function randomStr(length) {
  return Math.random()
    .toString(32)
    .substr(-length);
}

class ModifyChunkIdPlugin {
  constructor(options = {}) {
    const { prefix, converter, random } = options;
    this.prefix = prefix || DEFAULT_PREFIX;
    this.converter = converter instanceof Function ? converter : DEFAULT_CONVERTER;
    this.random = !!random;
  }

  apply(compiler) {
    const { prefix, converter, random } = this;
    compiler.hooks.compilation.tap('ModifyChunkIdPlugin', (compilation) => {
      compilation.hooks.afterOptimizeChunkIds.tap('ModifyChunkIdPlugin', (chunks) => {
        for (const chunk of chunks) {
          // modify chunk 'id' and 'ids'
          if (prefix || converter || random) {
            if (random) {
              chunk.id = `${randomStr(3)}.${chunk.id}`;
            } else if (prefix) {
              chunk.id = `${prefix}.${chunk.id}`;
            } else if (converter) {
              chunk.id = converter(chunk.id + '');
            }
            chunk.ids = [chunk.id];
          }
        }
      });
    });
  }
}

module.exports = ModifyChunkIdPlugin;

/**
 * reference:
 *
 * https://github.com/benzhe/webpack-custom-async-chunk-names-plugin/blob/master/index.js
 * https://github.com/frontendnote/named-chunks-entry-module-id-plugin/blob/master/index.js
 */
