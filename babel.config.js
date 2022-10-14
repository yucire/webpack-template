const plugins = [["@babel/plugin-transform-runtime", { corejs: 3 }]];
const presets = [["@babel/preset-env"], ["@babel/preset-typescript"]];

const isProduction = process.env.prooduction;
if (isProduction) {
  // plugins.push();
} else {
  // plugins.push();
}
module.exports = {
  plugins,
  presets,
};
