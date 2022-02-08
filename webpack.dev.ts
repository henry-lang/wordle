import * as webpack from 'webpack'
import * as HtmlWebPackPlugin from 'html-webpack-plugin'

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
})

const config: webpack.Configuration = {
    mode: 'development',
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [{loader: 'style-loader'}, {loader: 'css-loader', options: {modules: true}}],
            },
            {test: /\.tsx?$/, loader: 'ts-loader'},
        ],
    },
    plugins: [htmlPlugin],
}

export default config
