module.exports = {
  presets: [
    ["@babel/env", {
      "targets": {
        "node": "current"
      }
    }]
  ],
  env: {
    prod: {
      minified: true,
    },
  },
};
