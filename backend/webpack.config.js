const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  resolve: {
    modules: [path.resolve(__dirname, "./"), "node_modules"],
    fallback: {
      path: require.resolve("path-browserify"),
      url: require.resolve("url/"),
      util: false,
      stream: false,
      fs: false,
      crypto: false,
      os: false,
      querystring: false,
      http: require.resolve("stream-http"),
      net: false,
      zlib: false,
      async_hooks: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
