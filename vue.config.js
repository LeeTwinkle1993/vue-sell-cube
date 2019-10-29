
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}


const appData = require ('./data.json')
const seller = appData.seller     //卖方数据
const goods = appData.goods       //货物数据
const ratings = appData.ratings   //评级数据

module.exports = {
  css: { //这个是使用下载好的代码,cube-ui组件库
    loaderOptions: {
      sass: {
        
      },
      stylus: {
        'resolve url': true, //这样在引入时就可以引入到编译后的代码
        'import': []
      }
    }
  },
  
  devServer: { //开发中
    port: '8083',
    before (app) {
      app.get('/api/seller', function (req, res) {
        res.json({
          errno: 0,
          data: seller
        })
      })
      app.get('/api/goods', function (req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/api/ratings', function (req, res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: false,
      theme: false
    }
  },

  chainWebpack: (config) => {//修改引用文件别名
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('scss', resolve('src/common/scss'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
  }
}
