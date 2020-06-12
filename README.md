## 项目基础结构设计

> 业务端前端基础架构设计文档。


### 项目技术选型

整个项目使用了 vue 全家桶：

* base.css   // 让默认的 HTML 元素样式保持跨浏览器的高度一致性；
* nprogress  // 浏览器顶部状态指示进度条；
* axios  // http 请求库；
* vue-cli  // 使用 webpack 模板项目初始化工程；
* vuex  // 管理应用级的共享数据
* vue-router   // 页面路由管理
* element-ui  // vue 组件库

整个项目技术选型考虑到以下几点：

1. 项目数据交互复杂度高，使用 vue 进行前端开发来降低复杂度。
2. Vuex全局状态管理，让项目管理更利于项目的维护性
3. 个人比较喜欢 vue 的组件化，将项目拆分一个个单独的模块进行开发。

### 项目结构

这是一个前后端分离项目的前端部分, 参考阴明关于掘金重构进行更改, 整个项目分为四个层级：


├──**表现层**

​    ├──路由切换 （router）

​	├──页面视图（views）

​	├──组件（components）

├──**数据层**

​	├──数据的处理（service）

├──**接口层**

​	├──api 请求接口（components）

**├──基础设施层**

​	├──基础开发环境配置

​	├──util 工具函数（utils）

#### 整体流程:

api 接口获取数据 ---> service 数据处理 ---> store action 状态提交 ---> component getter 获取数据渲染成 views

component 得到用户输入 ---> dispatch stroe 的 action ---> service 数据处理 --> api 请求接口提交

### 目录结构

```bash
|-- build                        // 项目构建相关代码
|   |-- build.js                 // 生产环境构建代码
|   |-- check-version.js         // 检查 Node、Npm 等版本
|	|-- utils.js             // 构建工具相关
|   |-- vue-loader.conf.js       // Vue-loader 相关配置
|   |-- webpack.base.conf.js     // Webpack 基础配置
|   |-- webpack.dev.conf.js      // Webpack 开发环境配置
|   |-- webpack.prod.conf.js     // Webpack 生产环境配置
|-- config
|   |-- dev.env.js                // 开发环境变量
|   |-- index.js                  // 项目基础配置(例如打包路径,开发代理设置)
|   |-- prod.env.js               // 生产环境变量
|-- dist			  // 打包文件
|-- docs			  // 文档说明
|-- node_modules
|-- src                          // 项目核心源码
|   |-- api                      // 后端交互文件
|   |-- assets                   // 项目静态资源
|   |-- components               // 全局公共组件
|   |-- router                   // 路由文件
|   |-- service                  // 处理请求返回的数据
|   |-- store                    // 全局状态管理(例如用户登陆状态等)
|   |-- utils                    // 全局工具函数
|   |-- views                    // 业务页面
|   |-- App.vue                  // Vue 根组件
|   |-- main.js                  // 入口文件(引入依赖模块)
|-- static                       // 静态文件(例如没有模块化的第三方库)
|-- .babelrc                     // ES6 编译配置
|-- .editorconfig                // 统一代码风格(例如Charset, 空格)
|-- .eslintignore                // ESLint 检查排除的文件
|-- .eslistrc.js                 // ESLint 规则文件
|-- .gitignore                   // Git 上传排除的文件
|-- .postcssrc.js		 // Css 文件处理(例如浏览器前缀自动引入)
|-- index.html                   // HTML 基础模板文件
|-- package-lock.json            // 记录当前项目所安装 Package 的具体来源和版本号
|-- package.json                 // 项目配置信息(项目所需模块，项目名称、版本等)
|-- README.md                    // 项目基本说明
```

## 功能

```
- 登录 / 注销

- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置

- 多环境发布
  - dev sit stage prod

- 全局功能
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - 本地/后端 mock 数据
  - Screenfull全屏
  - 自适应收缩侧边栏

- Excel
  - 导出excel
  - 导入excel
  - 前端可视化excel
  - 导出zip

- 表格
  - 动态表格
  - 拖拽表格
  - 内联编辑

- 错误页面
  - 401
  - 404

- 組件
  - 头像上传
  - 返回顶部
  - 拖拽Dialog
  - 拖拽Select
  - 拖拽看板
  - 列表拖拽
  - SplitPane
  - Dropzone
  - Sticky
  - CountTo

- 综合实例
- 错误日志
- Dashboard
- 引导页
- ECharts 图表
- Clipboard(剪贴复制)
- Markdown2html
```
## 开发

```bash
# 克隆项目
git clone https://github.com/wxGitHub1/fuyin-houtaiguanli-jiameng-java.git

# 进入项目目录
cd fuyin-houtaiguanli-jiameng-java

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```
## 发布

```bash

# 构建生产环境
npm run build
```
