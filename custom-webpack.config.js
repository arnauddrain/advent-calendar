const webpack = require('webpack');
const path = require('path');

module.exports = {
  plugins: [new webpack.NormalModuleReplacementPlugin(/^quill-image-resize$/, path.join(__dirname, './src/app/mocks/quill.mock.server.ts'))]
};
