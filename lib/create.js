const shell = require('shelljs');
const fs = require('fs');
const ora = require('ora'); // 用于输出loading
const symbols = require('log-symbols');
const inquirer = require('inquirer');
const clone = require('../utils/clone.js');
const { logSuccess, logUnderline, logWarn } = require('../utils/log.js');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const remotes = require('../canstant/temp-type.js');
let remote = ''; // git地址

const createAction = async (name, option) => {
  // 0. 检查控制台是否可以运行`git `，
  if (!shell.which('git')) {
    console.log(symbols.error, `git命令不可用！请先安装git: ${logUnderline('https://git-scm.com/downloads')}`);
    shell.exit(1);
  }
  // 1. 验证输入name是否合法
  if (fs.existsSync(name)) {
    console.log(symbols.warning, `已存在项目文件夹${name}！`);
    return;
  }
  if (name.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g)) {
    console.log(symbols.error, '项目名称存在非法字符！');
    return;
  }
  // 2. 获取option，根据参数确定模板类型
  // 用户选择模板
  const tempQuestions = [
    {
      type: 'list',
      message: '请选择项目模板:',
      choices: Object.keys(remotes),
      name: 'type'
    }
  ];
  const selectTemp = await inquirer.prompt(tempQuestions);
  // console.log(selectTemp.type)
  remote = remotes[selectTemp.type]
  // 3. 下载模板
  // <host>:<userName>/<repo> <projectName> #branchName 
  await clone(`${remote.host}:${remote.userName}/${remote.repo}#${remote.branch}`, name, { clone: true }, (err) => { console.log('err', err) });
  // 4. 清理文件
  const deleteDir = ['.git', 'README.md', 'docs']; // 需要清理的文件
  const pwd = shell.pwd();
  deleteDir.map(item => shell.rm('-rf', pwd + `/${name}/${item}`));
  // 5. 写入配置文件
  shell.cd(name);
  const cfgSpinner = ora('正在写入配置信息...').start();
  let pkg = fs.readFileSync(`${pwd}/${name}/package.json`, 'utf8');
  pkg = JSON.parse(pkg);
  pkg.name = name;
  pkg.author = '';
  fs.writeFileSync(`${pwd}/${name}/package.json`, JSON.stringify(pkg), { encoding: 'utf8' });
  cfgSpinner.succeed(chalk.green('配置信息写入成功！'));
  // 6. 安装依赖
  const installSpinner = ora('正在安装项目依赖包... \n').start();
  try {
    spawn.sync('npm', ['install', '-depth', '0'], { stdio: 'inherit' });
  } catch (error) {
    logWarn('自动安装依赖包失败，请手动安装！');
    console.log(error);
    installSpinner.fail();
    shell.exit(1);
  }
  installSpinner.succeed(chalk.green('依赖包安装成功！'));
  logSuccess('\n       o(ﾟДﾟ)っ！ \n\n  项目创建成功,冲啊!  \n');
  // 7. 打开编辑器
  if (shell.which('code')) shell.exec('code ./');
  shell.exit(0);
};

module.exports = createAction;