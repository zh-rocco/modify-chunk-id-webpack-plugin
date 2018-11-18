# modify-chunk-id-webpack-plugin

## Why?

When another webpack-dev-server file was introduced in webpack-dev-server, the file reference failed due to a chunkId conflict. This plugin can solve this problem.

## Support

webpack 4.x

## Example

`window.webpackJsonp`

```javascript
// Original webpackJsonp
[
  [
    ['0'],
    {
      moduleName: function(t, e, n) {},
      // ...
    },
  ],
  [
    ['1'],
    {
      moduleName: function(t, e, n) {},
      // ...
    },
  ],
];

// Modified webpackJsonp
[
  [
    ['mci.0'],
    {
      moduleName: function(t, e, n) {},
      // ...
    },
  ],
  [
    ['mci.1'],
    {
      moduleName: function(t, e, n) {},
      // ...
    },
  ],
];
```

## Usage

```javascript
yarn add modify-chunk-id-webpack-plugin -D
```

## Usage

### With `random: true` in `options`

⚠️ Don't set `random` to `true` in production mode

`webpack.config.js`

```javascript
const ModifyChunkIdPlugin = require('modify-chunk-id-webpack-plugin');

module.exports = {
  plugins: [
    new ModifyChunkIdPlugin({ random: true }),
    // other plugins
  ],
};
```

Modified webpackJsonp

```javascript
[
  [
    ['randomString.0'],
    {
      moduleName: function(t, e, n) {},
      // ...
    },
  ],
  [
    ['randomString.1'],
    {
      moduleName: function(t, e, n) {},
      // ...
    },
  ],
];
```

### With `prefix` field in `options`

`webpack.config.js`

```javascript
const ModifyChunkIdPlugin = require('modify-chunk-id-webpack-plugin');

module.exports = {
  plugins: [
    new ModifyChunkIdPlugin({ prefix: 'custom' }),
    // other plugins
  ],
};
```

Modified webpackJsonp

```javascript
[
  [
    ['custom.0'],
    {
      moduleName: function(t, e, n) {},
      // ...
    },
  ],
  [
    ['custom.1'],
    {
      moduleName: function(t, e, n) {},
      // ...
    },
  ],
];
```

### With `converter` field in `options`

`webpack.config.js`

```javascript
const ModifyChunkIdPlugin = require('modify-chunk-id-webpack-plugin');

module.exports = {
  plugins: [
    new ModifyChunkIdPlugin({ converter: (id) => `custom-${id}` }),
    // other plugins
  ],
};
```

Modified webpackJsonp

```javascript
[
  [
    ['custom-0'],
    {
      moduleName: function(t, e, n) {},
      // ...
    },
  ],
  [
    ['custom-1'],
    {
      moduleName: function(t, e, n) {},
      // ...
    },
  ],
];
```

### These cases do not modify chunk id

- `options` not given
- `options` is empty
- `options.random === false && !options.prefix && !options.converter`

### Parameter priority

`random` > `prefix` > `converter`

## License

MIT © [zh-rocco](https://github.com/zh-rocco)
