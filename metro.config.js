module.exports = {
  // resolver: {
  //   extraNodeModules: {
  //     pages: `${__dirname}/src/pages`,
  //   },
  // },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
