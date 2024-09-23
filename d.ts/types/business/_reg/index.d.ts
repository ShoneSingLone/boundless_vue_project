export type t_reg = {
		serviceName(args?:any):RegExp
email(args?:any):RegExp
mobile(args?:any):RegExp
/**
			 * 以字母或者数字开头和结尾，由字母、数字连接符(-)、下划线(_)、点号(.)组成
			 */
keyVal(args?:any):RegExp
keyValOnlyOne(args?:any):RegExp
imageDesRe(args?:any):RegExp
ipv4Reg(args?:any):RegExp
ipv4CidrReg(args?:any):RegExp
ipv4WithZeroReg(args?:any):RegExp
digitReg(args?:any):RegExp
ipv4SegReg(args?:any):RegExp
port(args?:any):RegExp
rulePath(args?:any):RegExp
rulePathByRegex(args?:any):RegExp
ruleHost(args?:any):RegExp
hostThenReg(args?:any):RegExp
hostReg(args?:any):RegExp
printHeaderValueReg(args?:any):RegExp
printPartReg(args?:any):RegExp
printMessageBodyReg(args?:any):RegExp
printQueryPartReg(args?:any):RegExp
headerKeyReg(args?:any):RegExp
urlPathReg(args?:any):RegExp
/**
			 * 以/开头，由英文字母、数字或特殊字符-/.%?#&=组成
			 */
url1(args?:any):RegExp
/**
			 * URL只能以/开头，由英文字母、数字或特殊字符_~`;@^-%#&$.*+?,=!:|V()[]{}组成
			 */
url2(args?:any):RegExp
sharedUrlPathReg(args?:any):RegExp
guaranteedUrlPathReg(args?:any):RegExp
nameReg(args?:any):RegExp
priorityReg(args?:any):RegExp
idReg(args?:any):RegExp
integerReg(args?:any):RegExp
httpCodeReg(args?:any):RegExp
dscpReg(args?:any):RegExp
userDefinedHeaderValueReg(args?:any):RegExp
refrenceHeaderValueReg(args?:any):RegExp
cookieKeyReg(args?:any):RegExp
nameRe(args?:any):RegExp
ChineseRe(args?:any):RegExp
NatNameRe(args?:any):RegExp
ChineseNotHyphensRe(args?:any):RegExp
extendName(args?:any):RegExp
desRe(args?:any):RegExp
imageName(args?:any):RegExp
notEmpty(args?:any):RegExp
VolumenameRe(args?:any):RegExp
unixFilePathName(args?:any):RegExp
winFilePathName(args?:any):RegExp
letterNumber(args?:any):RegExp
/* phoneRe: () => /((d{11})|^((d{7,8})|(d{4}|d{3})-(d{7,8})|(d{4}|d{3})-(d{7,8})-(d{4}|d{3}|d{2}|d{1})|(d{7,8})-(d{4}|d{3}|d{2}|d{1}))$)/,*/
phoneRe(args?:any):RegExp
macRe(args?:any):RegExp
notAllSpaceReg(args?:any):RegExp
/**
			 * 只返回数字
			 * @return {RegExp}
			 */
notAllNumReg(args?:any):RegExp
spaceReg(args?:any):RegExp
domainIDReg(args?:any):RegExp
hostRegWaf(args?:any):RegExp
domainName(args?:any):RegExp
domainReg(args?:any):RegExp
domainRegWildCard(args?:any):RegExp
domainNew(args?:any):RegExp
dnsSearchDomainNew(args?:any):RegExp
multiDomainNew(args?:any):RegExp
upLinkPort(args?:any):RegExp
ipv6Reg(args?:any):RegExp
projectId(args?:any):RegExp
cifsDirReg(args?:any):RegExp
nfsDirReg(args?:any):RegExp
DeviceName(args?:any):RegExp
DeviceNameRe(args?:any):RegExp
tenantIdReg(args?:any):RegExp
uuidReg(args?:any):RegExp
containUuidReg(args?:any):RegExp
maskReg(args?:any):RegExp
maskIpv6Reg(args?:any):RegExp
tenantNameValid(args?:any):RegExp
pskofVPNReg(args?:any):RegExp
projectNameValid(args?:any):RegExp
cidrRangeReg(args?:any):RegExp
DCRe(args?:any):RegExp
certContent(args?:any):RegExp
privateKeyContent(args?:any):RegExp
/**
			 * 工作负载名称校验
			 * workloadName: /^[a-z]([-a-z0-9]*[a-z0-9])?$/
			 * @returns {RegExp}
			 */
workloadName(args?:any):RegExp
/**
			 * 端口名称校验
			 */
scRancherPortName(args?:any):RegExp
/**
			 * 环境变量名称校验
			 */
scEnvName(args?:any):RegExp
	};