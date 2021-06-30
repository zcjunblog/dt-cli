const chalk = require('chalk');
const ora = require('ora');
// 紫色log
function logMagent(...txt) {
    console.log(chalk.magenta(...txt));
}
// 普通log
function logNormal(...txt) {
    console.log(...txt);
}
// 信息类log
function logInfo(...txt) {
    ora().info(chalk.blue(...txt));
}
// 成功log
function logSuccess(...txt) {
    ora().succeed(chalk.green(...txt));
}
// 警告类log
function logWarn(...txt) {
    ora().warn(chalk.yellow(...txt));
}
// 错误log
function logError(...txt) {
    ora().fail(chalk.red(...txt));
}
// 下划线
function logUnderline(txt) {
    return chalk.underline.blueBright.bold(txt);
}
module.exports = {
    logMagent,
    logNormal,
    logInfo,
    logSuccess,
    logWarn,
    logError,
    logUnderline
};