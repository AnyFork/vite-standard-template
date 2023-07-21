module.exports = {
    // 指定每个缩进级别的空格数<int>，默认2
    tabWidth: 4,
    // 用制表符而不是空格缩进行<bool>，默认false
    useTabs: false,
    //一行的字符数，如果超过会进行换行，默认为80
    printWidth: 300,
    //字符串是否使用单引号，默认为false，使用双引号
    singleQuote: true,
    //避免报错delete (cr)的错
    endOfLine: 'auto',
    // 换行,always：超过printWidth就换行，never：不换行，preserve：按照原样处理
    proseWrap: 'always',
    // 不加分号
    semi: false,
    // 结尾处不加逗号
    trailingComma: 'none',
    // 忽略'>'下落问题
    htmlWhitespaceSensitivity: 'ignore'
}
