const presets = [
  [
    "@babel/preset-env",
    {
      "targets": {
        "browsers": [
          "Android >= 7.0",
          "ios >= 8"
        ]
      },
      "debug": false,
      "modules": false,
      // "useBuiltIns": "usage"
    }
  ],
  "@babel/preset-react"
];

const plugins = [
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-proposal-class-properties",
];




module.exports = { presets, plugins };