const DEFAULT_CONVERTER = null;

function randomStr(length) {
  return Math.random()
    .toString(32)
    .substr(-length);
}

class ModifyChunkIdPlugin {
  constructor(options = {}) {
    const { prefix, converter, random } = options;
    this.prefix = prefix;
    this.converter = converter instanceof Function ? converter : DEFAULT_CONVERTER;
    this.random = !!random;
  }

  apply(compiler) {
    const { prefix, converter, random } = this;
    const SHOULD_MODIFY = prefix || converter || random;
    if (SHOULD_MODIFY) {
      const RANDOM_STRING = randomStr(3);
      compiler.hooks.compilation.tap('ModifyChunkIdPlugin', (compilation) => {
        compilation.hooks.afterOptimizeChunkIds.tap('ModifyChunkIdPlugin', (chunks) => {
          for (const chunk of chunks) {
            // modify chunk 'id' and 'ids'
            if (random) {
              chunk.id = `${RANDOM_STRING}.${chunk.id}`;
            } else if (prefix) {
              chunk.id = `${prefix}.${chunk.id}`;
            } else if (converter) {
              chunk.id = converter(chunk.id + '');
            }
            chunk.ids = [chunk.id];
          }
        });
      });
    }
  }
}

module.exports = ModifyChunkIdPlugin;

/**
 * reference:
 *
 * https://github.com/benzhe/webpack-custom-async-chunk-names-plugin/blob/master/index.js
 * https://github.com/frontendnote/named-chunks-entry-module-id-plugin/blob/master/index.js
 */
