const plugins = [["postcss-preset-env"]];

const isProduction = process.env.prooduction;
if (isProduction) {
  // plugins.push();
} else {
  // plugins.push();
}

module.exports = {
  plugins,
};
