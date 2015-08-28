var path = require('path')

module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'index.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']}
        ]
    }
}
