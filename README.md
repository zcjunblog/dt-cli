# dt-cli
![npm](https://img.shields.io/npm/dt/@duotai/dt-cli)
![npm](https://img.shields.io/npm/v/@duotai/dt-cli)
![travis](https://travis-ci.com/BWrong/dt-cli.svg?branch=master)

## 介绍
- 创建项目基础模板帮助前端快速开发,该库供你二次开发属于你的cli工具。


## 安装
采用全局安装：
```bash
npm i -g dt-cli
```
## 常用命令
- 帮助
```bash
dt-cli -h
```
- 查看版本
```bash
dt-cli -V
```
- 初始化项目
```bash
## 创建项目
## <name>是创建项目文件的名字
dt-cli create <name>
```

## 说明
- 需要提供相应环境git,node等
- 项目名称会作为`package.json`的`name`值