const { merge } = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const getCommConfig = (isProduction) => {
  return {
    entry: './src/main.ts',
    output: {
      filename: 'js/[name].[contenthash:6].js',
      path: path.resolve(process.cwd(), 'bundle'),
      chunkFilename: 'js/[name].[contenthash:6]chunk.js', // 异步分包的 名字 魔法注释将会 吧name填入
      // assetFilename: "",
      publicPath: isProduction ? './' : '/'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      },
      extensions: ['.js', '.json', '.wasm', '.ts', 'tsx', 'jsx']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(process.cwd(), './public/index.html'),
        title: isProduction ? '生产' : '开发'
      })
    ],
    module: {
      rules: [
        // css
        {
          test: /\.css$/,
          use: [
            isProduction ? { loader: MiniCssPlugin.loader } : { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        },
        // less
        {
          test: /\.less$/,
          use: [
            isProduction ? { loader: MiniCssPlugin.loader } : { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
            {
              loader: 'less-loader'
            },
            {
              loader: 'postcss-loader'
            }
          ]
        },
        // js
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader'
            }
          ],
          exclude: /node_modules/
        },
        // image
        {
          test: /\.(jpe?g|png|gif|webp|svg)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 1024 * 100
            }
          }
        },
        // ts
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        // vue
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader'
            }
          ]
        }
      ]
    },
    // 打包优化
    optimization: {
      runtimeChunk: {
        name: (entrypoint) => `runtimechunk-${entrypoint.name}`
      },
      minimize: true,
      // 未使用将会被 打上标记 进行树摇
      usedExports: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          extractComments: false
        })
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            filename: 'js/[id]_vendor.js',
            priority: -10
          },
          default: {
            minChunks: 2, // 如果被应用两次拆分出来打包
            filename: 'js/comm_[id].js',
            priority: -20
          }
        }
      }
    }
  }
}

module.exports = function (production) {
  let isProduction = false
  let secondConfig
  const commConfig = getCommConfig(production)

  if (production) {
    isProduction = true
    secondConfig = require('./webpack.prod')
  } else {
    isProduction = false
    secondConfig = require('./webpack.dev')
  }
  process.env.production = isProduction
  return merge(commConfig, secondConfig)
}
