const { VueLoaderPlugin } = require('vue-loader')
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.vue'],
    },
    entry: {
        app: './main.js',
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader',
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        esModule: false,
                    }
                },
            ]
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].js',  // [name].js 혹은 app.js 라고 넣으면 된다.
        // path: './dist', // 나중에 최종 결과물로 dist라는 폴더에 [name].js라는 결과물이 나온다.
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist',
    },
};