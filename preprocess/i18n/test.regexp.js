const { matchReg } = require("./i18n.utils");
// const matchReg = /i18n(?<manySuffix>Many)?\(\s*(["'`])((?:[^\\]|\\.|\n)*?)\2\s*(?:,\s*\{[\s\S]*?\}\s*)?\)/gs;




// Print each test case with its result to debug why some cases return false
[['xItem.isShowConfirm = true;',
	'try {',
	'await _.$confirm({',
	'title: i18n("please_confirm_info"),',
	'content: i18n(',
	'`请确保提供的信息真实有效，若提供虚假信息,由此带来的全部结果由您承担`',
	')',
	'});',
	'',
	'xItem.p_value = true;',
	'} catch (error) {',
	'return () => hDiv("");',
	'} finally {',
	'xItem.isShowConfirm = false;',
	'}'].join("\n"),
	`<div>
		{{
			i18n(
				"图片格式要求jpg. jpeg. png, 不超过10M;文件名(包含后缀名)的最大长度为100个字符。"
			)
		}}
	</div>`,
	"asdf asdf i18n('hello') asdfasdf",
	`asdf asdf i18n("hello") asdfasdf`,
	"asdf asdf i18n(`hello`) asdfasdf",
	"asdf asdf i18nMany('hello') asdfasdf",
	`asdf asdf i18nMany("hello") asdfasdf`,
	"asdf asdf i18nMany(`hello`) asdfasdf",
	"asdf asdf i18n('hello',{a:1234}) asdfasdf",
	`asdf asdf i18n("hello",{a:1234}) asdfasdf`,
	"asdf asdf i18n(`hello`,{a:1234}) asdfasdf",
	"asdf asdf i18nMany('hello',{a:1234}) asdfasdf",
	`asdf asdf i18nMany("hello",{a:1234}) asdfasdf`,
	"asdf asdf i18nMany(`hello`,{a:1234}) asdfasdf",
	`() => {
		return i18n(
		"registerView.username.rules.tips.length_must_be_between_min_and_max_characters",
		{ min: 4, max: 32 }
	);
}`
].forEach(item => {
	// console.log(`Testing: "${item}"`);
	String(item).replace(matchReg, function name(match, many = '', quote, word, index, ...res) {
		// console.log("match:", match);
		console.log("many:", many, "quote:", quote, "word:", word, "index:", index);
		return match;
	});
});
