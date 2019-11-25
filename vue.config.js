module.exports = {
  runtimeCompiler: true,

  pwa: {
    name: "waterbear"
  },

  chainWebpack: config => {
    const rule = config.module.rule("ts");

    rule.uses.delete("thread-loader");
    rule
      .use("ts-loader")
      .loader("ts-loader")
      .tap(options => {
        options.transpileOnly = false;
        options.happyPackMode = false;
        options.allowTsInNodeModules = true;
        return options;
      });
  }
};
