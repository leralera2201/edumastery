const MODULE_RESOLVER = [
  'module-resolver',
  {
    extensions: ['.js', '.ios.js', '.android.js', '.json'],
    alias: {
      pages: './src/pages',
      components: './src/components',
      utils: './src/utils',
      constants: './src/constants',
      store: './src/store',
      navigation: './src/navigation',
      device: './src/device',
      assets: './src/assets',
      api: './src/api',
      storage: './src/storage',
      config: './src/config',
    },
  },
];
module.exports = {
  plugins: [MODULE_RESOLVER],
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['ignite-ignore-reactotron', MODULE_RESOLVER],
    },
  },
};
