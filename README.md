- [main](./readme.main.md)
- [business_doc](https://shonesinglone.github.io/boundless_vue_project/business_doc/doc.html)
- [business_yapi](https://shonesinglone.github.io/boundless_vue_project/business_yapi/yapi.html)
- [cloud_disk](https://shonesinglone.github.io/boundless_vue_project/business_yapi/cloud_disk.html)


- npm install --global kill-port
- kill-port 3002


## 快速开始

### 1. 安装依赖包

m2o 项目以koa为基础依赖
已实现监听代码变动，socket替换Vue组件，自动刷新页面（部分功能待完善，因刷新机制，只能刷新root以下的组件）
- pnpm i

### 2. 启动项目

- business_xxx//业务相关
- commmon//通用

一般需要这两个文件夹，

### 创建项目

- 入口为访问的html页面

```html
    <div style="display: none;" id="preload">
        <!-- 预加载组件，会统一发送请求，提前下载，如无特殊需求，可以不用处理 -->
        return ['@/entry.vue', ...]
    </div>
    ...
	<script 
        id="src-root" //固定为src-root
        src="../common/libs/min/seed.js" //libs下有min文件夹，里面的文件经过压缩，gzip处理，可以节约带宽
        data-app-name="internet_portal" //当前business的appName
        data-app-entry-name="entry"//当前页面加载的root Vue，不配置就会默认为entry.vue;适用同一个business下多个页面的场景
        data-app-version="1738835225753" //如果配置，则会缓存静态资源
        data-no-nprogress="true" //是否隐藏页面顶部的伪进度条，不配置就会显示
    >

```

## 注意事项

- 在vue文件 **template** 中，不可以使用 **`**
- useTabName

## 优化方案

- preprocess\obfuscator\uglify.js 压缩js代码，制作 gzip压缩包。
    - m2o项目默认不开启gzip压缩，需要手动开启。
        - preprocess\server\middleware.appUseKoaAssets.js : isUseGzip

## 部署方案

- preprocess\deploy\************.js ：压缩项目文件 ，上传服务器，解压
- gzip不会提交的git仓库，只在部署代码里面替换

## TODO

- TODO: KEEP_SCROLL_TOP_0//滚动条回到顶部 xItem的Bug 未修复