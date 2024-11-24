const { merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

//The environment variable PRODUCTION_DOMAIN is set in the GitHub Actions workflow file or CI/CD pipeline
const domain = process.env.PRODUCTION_DOMAIN;// this is the domain that we will use to deploy our app, it will be used to create the publicPath


const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',// whenever we create a file, it follows this naming convention
        publicPath: '/container/latest/'
    }, 
    plugins: [
        new  ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
            },
            shared: packageJson.dependencies
        })
    ]
};

module.exports = merge(commonConfig, prodConfig);