export type t_rules = {
		serviceName(args?:any):object
/**
			 * 域名，可以以*开头
			 * 只能由字母、数字、中划线、星号组成。星号只能在开头，中划线不能在开头或未尾，至少包含两个字符串，单个字符串不超过63个字符，字符串间以点分制，且总长度不超过100个字符。例如 :example.com 或*.example.com。
			 */
domainWithAnyStart(args?:any):object
keyVal(args?:any):object
url1(args?:any):object
url2(args?:any):object
requiredLine(args?:any):object
/**
			 * 要求控件必填，提示信息默认i18n("必填项")
			 * @param defaultMsg 自定义的提示信息
			 */
required(args?:any):object
email(args?:any):object
lessThan(args?:any):object
portRange(args?:any):object
port165535(args?:any):object
ipV4(args?:any):object
ipV6(args?:any):object
inetUrl(args?:any):object
integer(args?:any):object
name(args?:any):object
workloadName(args?:any):object
/* 匹配一个字符串，该字符串以小写英文字母或数字开头，并且只包含字母或数字 */
lettersOrNumbers(args?:any):object
ipAddress(args?:any):object
/* 行数据必填项*/
rowDataRequired(args?:any):object
rowDataRequiredAll(args?:any):object
notAllNumReg(args?:any):object
scRancherPortName(args?:any):object
scEnvName(args?:any):object
/**
			 * 天翼云evs名字正则
			 * @param msg
			 */
ctyunEvsName(args?:any):object
ctyunVpcName(args?:any):object
checkLength(args?:any):object
checkDnsList(args?:any):object
	};