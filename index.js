#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const { Command } = require('commander');

const createAction = require('./lib/create');
const packageJson = require('./package.json');

// 清除控制台
clear();

// 大logo
console.log(chalk.cyan(figlet.textSync('DUOTAI', {
    horizontalLayout: 'full'
})));

const program = new Command();
// 版本
program
    .version(packageJson.version)
    .description('Quickly create front-end projects')
    .usage('<commnad [options]>');

program
  .command('create <app-name>')// 定义create子命令，<app-name>可在action中接收
  .description('create a new project') // 命令描述
  .action(createAction)

// 触发 --help 后打印一些信息
program.on('--help', () => {
    console.log();
    console.log(`  create by ${chalk.cyan('多态科技')} zhaozc.`);
    console.log(`  more click ${chalk.red('https://duotai.tech')}`)
    console.log();
});

program.commands.forEach(c => c.on('--help', () => console.log()));

// 开始解析参数
program.parse(process.argv);

// 无任何命令时输出帮助信息
if (!process.argv.slice(2).length) {
    program.outputHelp();
}

// npm install -g