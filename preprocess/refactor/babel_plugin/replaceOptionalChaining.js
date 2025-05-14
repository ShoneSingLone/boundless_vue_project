const { types: {
    callExpression,
    memberExpression,
    identifier,
    stringLiteral,
    templateLiteral,
    templateElement,
    isOptionalMemberExpression
} } = require('@babel/core');

const { default: generator } = require('@babel/generator');
const getObjAndParamsChian = (node) => {
    const OPTIONAL_CHAIN_REGEX = /\?\./g;
    let originalCode = generator(node).code;
    /* b[prop || 1] 的形式要 分成 b、[prop || 1] 两部分 */
    // 先替换可选链操作符，然后使用正则匹配方括号内的内容
    let originalCodeArray = originalCode
        .replace(OPTIONAL_CHAIN_REGEX, '.')
        .match(/[^\.\[\]]+|\[[^\]]+\]/g) || [];

    originalCodeArray = originalCodeArray.map(i => {
        // 提取数组访问中的内容
        const match = i.match(/\[([^\]]+)\]/);
        if (match) {
            // 判断是否为纯数字
            const content = match[1];
            if (/^\d+$/.test(content)) {
                return content;
            } else {
                // 非数字返回模板字符串可用形式
                return ["${", content, "}"].join("");
            }
        }
        return i;
    });


    const FIRST_OBJ = originalCodeArray.shift();
    let CHAIN_PATH = originalCodeArray.join(".");

    try {
        // 检查是否包含模板字符串语法
        if (CHAIN_PATH.includes('${')) {
            const parts = CHAIN_PATH.split(/(\$\{[^}]+\})/);
            const quasis = parts.map((part, i) => {
                if (!part.startsWith('${')) {
                    return templateElement(
                        { raw: part, cooked: part },
                        i === parts.length - 1
                    );
                }
                return null;
            }).filter(Boolean);

            const expressions = parts
                .filter(part => part.startsWith('${'))
                .map(part => {
                    const exp = part.slice(2, -1);
                    return identifier(exp);
                });

            CHAIN_PATH = templateLiteral(quasis, expressions);
        } else {
            CHAIN_PATH = stringLiteral(CHAIN_PATH);
        }
    } catch (error) {
        CHAIN_PATH = stringLiteral(CHAIN_PATH);
        console.error(error);
    }

    return {
        FIRST_OBJ,
        CHAIN_PATH
    };
};


module.exports.optionalChainToValPlugin = function () {
    console.log('Babel插件已加载');
    return {
        visitor: {
            OptionalMemberExpression(path) {
                // 提取对象路径数组
                const { FIRST_OBJ, CHAIN_PATH } = getObjAndParamsChian(path.node);
                console.log('OptionalMemberExpression', CHAIN_PATH);

                const newExpression = callExpression(
                    memberExpression(identifier('_'), identifier('$val')),
                    [identifier(FIRST_OBJ), CHAIN_PATH]
                );

                path.replaceWith(newExpression);
            },
            OptionalCallExpression(path) {
                console.log('Processing OptionalCallExpression'); /* function调用 */
                const { callee } = path.node;
                if (isOptionalMemberExpression(callee)) {
                    const { FIRST_OBJ, CHAIN_PATH } = getObjAndParamsChian(callee);
                    const newExpression = callExpression(
                        callExpression(
                            memberExpression(identifier('_'), identifier('$callFn')),
                            [identifier(FIRST_OBJ), CHAIN_PATH]
                        ),
                        path.node.arguments || []
                    );

                    path.replaceWith(newExpression);
                }
            }
        }
    };
};