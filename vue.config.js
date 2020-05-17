module.exports = {
  // options...
  devServer: {
    port: 9090,
    open: true,
    proxy: {
      "/api": {
        target: process.env.VUE_APP_ROOT_API,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/auth": {
        target: process.env.VUE_APP_ROOT_AUTH,
        changeOrigin: true,
        pathRewrite: {
          "^/auth": "",
        },
      },
    },
  },

  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          // Provide path to the file with resources
          resources: "./src/styles/_resources.scss",
        })
        .end();
    });
  },
};
