# 屏幕鼠标拖尾效果

快速实现页面中鼠标拖尾的效果

[![mouse-tailing Example](https://raw.githubusercontent.com/s10y10/mouse-tailing/master/example/example.gif)](https://github.com/s10y10/mouse-tailing)

## 安装

```
npm install --save mouse-tailing
```

## 使用

```
import { createMouseTailing } from 'mouse-tailing'
createMouseTailing()
```

## 参数
`createMouseTailing(options)` 接受一个参数

- <b>options:</b> 可选，Object 类型，用于配置拖尾的形式，配置项如下：

|参数  | 说明 |类型|可选值|默认值|必选|
|------|-----|---|------|------|----|
|type  |拖尾类型|string|star/circle/heart/icon|star|false|
|count|拖尾数量|number|-|1|false|
|duration|拖尾存在时间(ms)|number|-|1000|false|
|url|当type=icon时需要,icon的url地址|string|-|-|false|
