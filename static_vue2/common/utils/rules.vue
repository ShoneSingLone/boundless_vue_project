<script lang="ts">
export default async function () {
	await _.$importVue("/common/utils/regexp.vue");

	if (!window._rules) {
		window._rules = {
			validator(validatorFn, options = {}) {
				validatorFn = validatorFn || (() => "");
				return _.merge(
					{
						name: "custom_validator",
						validator: validatorFn,
						trigger: ["change", "blur"]
					},
					options
				);
			},

			mobilePhone() {
				return {
					name: "mobilePhone",
					async validator({ val }) {
						if (!_.$isInput(val)) {
							return;
						}
						var urlRegex = _reg.phoneRe();
						if (urlRegex.test(val)) {
							return "";
						} else {
							return i18n("请输入正确的手机号码");
						}
					},
					trigger: ["change", "blur"]
				};
			},
			serviceName() {
				return {
					name: "serviceName",
					async validator({ val }) {
						if (!_.$isInput(val)) {
							return;
						}
						const errorTips =
							"以小写字母开头,由小写字母，数字，中划线(-)组成，63个字符之内,且不能以中划线(-)结尾。";

						var urlRegex = _reg.serviceName();
						if (urlRegex.test(val)) {
							return "";
						} else {
							return errorTips;
						}
					},
					trigger: ["change", "blur"]
				};
			},
			/**
			 * 域名，可以以*开头
			 * 只能由字母、数字、中划线、星号组成。星号只能在开头，中划线不能在开头或未尾，至少包含两个字符串，单个字符串不超过63个字符，字符串间以点分制，且总长度不超过100个字符。例如 :example.com 或*.example.com。
			 */
			domainWithAnyStart: () => {
				return {
					name: "domain",
					async validator({ val }) {
						if (!_.$isInput(val)) {
							return;
						}
						var urlRegex = _reg.domainReg();
						if (urlRegex.test(val)) {
							return "";
						} else if (urlRegex.test(val.replace(/^\*\./, ""))) {
							return "";
						} else {
							return "只能由字母、数字、中划线、星号组成。星号只能在开头，中划线不能在开头或未尾，至少包含两个字符串，单个字符串不超过63个字符，字符串间以点分制，且总长度不超过100个字符。例如 :example.com 或*.example.com。";
						}
					},
					trigger: ["change", "blur"]
				};
			},
			keyVal: () => {
				return {
					name: "keyVal",
					async validator({ val }) {
						if (!_.$isInput(val)) {
							return;
						}
						var urlRegex = _reg.keyVal();
						var urlRegex2 = _reg.keyValOnlyOne();

						if (String(val).length > 1) {
							if (!urlRegex.test(val)) {
								return "以字母或者数字开头和结尾，由字母、数字连接符(-)、下划线(_)、点号(.)组成";
							}
							return "";
						} else {
							if (!urlRegex2.test(val)) {
								return "以字母或者数字开头和结尾，由字母、数字连接符(-)、下划线(_)、点号(.)组成";
							}
							return "";
						}
					},
					trigger: ["change", "blur"]
				};
			},
			url1: () => {
				return {
					name: "urlStart",
					async validator({ val }) {
						if (!_.$isInput(val)) {
							return;
						}
						var urlRegex = _reg.url1();
						if (!urlRegex.test(val)) {
							return "以/开头，由英文字母、数字或特殊字符-/.%?#&=组成";
						}
						return "";
					},
					trigger: ["change", "blur"]
				};
			},
			url2: () => {
				return {
					name: "url",
					async validator({ val }) {
						if (!_.$isInput(val)) {
							return;
						}
						var urlRegex = _reg.url2();
						if (urlRegex.test(val)) {
							return "";
						} else {
							return "URL只能以/开头，由英文字母、数字或特殊字符_~`;@^-%#&$.*+?,=!:|V()[]{}组成";
						}
					},
					trigger: ["change", "blur"]
				};
			},
			requiredLine(recordFn) {
				/*  */
				return {
					name: "requiredLine",
					async validator(args) {
						const record = recordFn.call(this, args);

						if (_.every(record, i => !i)) {
							/* 都没填 */
							return "";
						}
						if (_.every(record, i => !!i)) {
							/* 都填了 */
							return "";
						}
						if (args.val) {
							/* 自己填了 */
							return "";
						}
						return "需保证行数据完整";
					},
					trigger: ["change", "blur"]
				};
			},
			/**
			 * 要求控件必填，提示信息默认i18n("必填项")
			 * @param defaultMsg 自定义的提示信息
			 */
			required: (args = {}) => {
				let defaultMsg = i18n("必填项");
				/* 兼容老的用法 */
				if (_.isString(args)) {
					defaultMsg = args;
				} else if (_.isObject(args) && args.msg) {
					/* 新的用Object，解构 */
					defaultMsg = args.msg;
				}

				return {
					name: "required",
					async validator({ val }) {
						let msg = "";
						if (!_.$isInput(val)) {
							msg = defaultMsg || i18n("必填项");
						}
						/* 返回提示信息即error */
						/* 返回""为success */
						return msg;
					},
					trigger: ["change", "blur"]
				};
			},
			email: () => {
				return {
					name: "email",
					async validator({ val }) {
						if (!val) {
							return "";
						}
						var urlRegex = _reg.email();
						if (!urlRegex.test(val)) {
							return i18n("请输入Email");
						}
						return "";
					},
					trigger: ["change", "blur"]
				};
			},
			/**
			 * 最多可输入{size}字符，
			 * @param size number
			 * @returns
			 */
			lessThan: size => {
				return {
					name: "lessThan",
					async validator({ val }) {
						let msg = "";

						if (String(val).length > size) {
							msg = i18n("ruleMsgWordLessThan", { size });
						}
						/* 返回提示信息即error */
						/* 返回""为success */
						return msg;
					},
					trigger: ["change", "blur"]
				};
			},
			Range: (min, max) => {
				return {
					async validator({ val }) {
						try {
							if (!_.$isInput(val)) return;
							val = _.toNumber(val);
							if (!_.$isNumber(val)) {
								return `请输入${min}~${max}范围内的整数`;
							}
							if (!/^\d+$/.test(val) || val > max || val < min) {
								return `请输入${min}~${max}范围内的整数`;
							}
							return "";
						} catch (error) {
							return `请输入${min}~${max}范围内的整数`;
						}
					},
					trigger: ["change", "blur"]
				};
			},
			portRange: (min, max) => {
				return {
					async validator({ val }) {
						try {
							if (!_.$isInput(val)) return;
							val = _.toNumber(val);
							if (!_.$isNumber(val)) {
								return `请输入${min}~${max}范围内的整数`;
							}
							if (!/^\d+$/.test(val) || val > max || val < min) {
								return `请输入${min}~${max}范围内的整数`;
							}
							return "";
						} catch (error) {
							return `请输入${min}~${max}范围内的整数`;
						}
					},
					trigger: ["change", "blur"]
				};
			},
			port165535: () => {
				return _rules.portRange(1, 65535);
			},
			ipV4: size => {
				return {
					name: "ipV4",
					async validator({ val }) {
						let msg = "";
						const reg =
							/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\b/;
						if (!reg.test(val)) {
							msg = i18n("msgEnterTheCorrectIPv4Address");
						}
						/* 返回提示信息即error */
						/* 返回""为success */
						return msg;
					},
					trigger: ["change", "input", "blur"]
				};
			},
			ipV6: () => {
				return {
					name: "ipV6",
					async validator({ val }) {
						let msg = "";
						const ipv6_regex =
							/^([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}|([0-9a-f]{1,4}:){6}:[0-9a-f]{1,4}|([0-9a-f]{1,4}:){5}(:[0-9a-f]{1,4}){2}|([0-9a-f]{1,4}:){4}(:[0-9a-f]{1,4}){3}|([0-9a-f]{1,4}:){3}(:[0-9a-f]{1,4}){4}|([0-9a-f]{1,4}:){2}(:[0-9a-f]{1,4}){5}|[0-9a-f]{1,4}(:[0-9a-f]{1,4}){6}|:|0:0:0:0:0:0:0:0(%[0-9]{1,3}|[0-9a-f]{0,4})$/;

						if (!ipv6_regex.test(val)) {
							msg = i18n("msgEnterTheCorrectIPv6Address");
						}
						/* 返回提示信息即error */
						/* 返回""为success */
						return msg;
					},
					trigger: ["change", "input", "blur"]
				};
			},
			inetUrl(msg = i18n("ruleEnterCorrectAddress")) {
				return {
					name: "inetUrl",
					async validator({ val }) {
						let ipAddress = new RegExp("[a-zA-z]+://[^\\s]*");
						if (ipAddress.test(val)) {
							return "";
						}
						return msg;
					},
					trigger: ["change", "input", "blur"]
				};
			},
			integer(msg = i18n("msgEnterPositiveInteger")) {
				return {
					name: "integer",
					async validator({ val }) {
						if (/^[1-9]\d*$/.test(val)) {
							return "";
						}
						return msg;
					},
					trigger: ["change", "input", "blur"]
				};
			},
			name(msg = i18n("msgEnter220DigitsLettersNumbers")) {
				return {
					name: "name",
					async validator({ val }) {
						if (/^[0-9a-zA-Z]{2,20}$/.test(val)) {
							return "";
						}
						return msg;
					},
					trigger: ["change", "input", "blur"]
				};
			},
			/* 匹配一个字符串，该字符串以小写英文字母或数字开头，并且只包含字母或数字 */
			lettersOrNumbers(msg = i18n("以小写英文字母或数字开头，并且只包含字母、数字或者-")) {
				return {
					name: "name",
					async validator({ val }) {
						if (!val) return;
						if (/^[a-z0-9][a-z0-9-]*$/.test(val)) {
							return "";
						}
						return msg;
					},
					trigger: ["change", "input", "blur"]
				};
			},
			ipAddress(msg = i18n("ruleEnterValidIPAddress")) {
				return {
					name: "ipAddress",
					async validator(value) {
						let ipAddress = new RegExp(
							"^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]" +
								"\\d|[01]?\\d\\d?)$|^([\\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[" +
								"0-5]|2[0-4]\\d|[01]?\\d\\d?)$|^::([\\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\\d|[01]?\\d\\d" +
								"?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$|^([\\da-fA-F]{1,4}:):([\\da-fA-F]{1,4}:){0,3}" +
								"((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$|^([\\da-fA-F]{1," +
								"4}:){2}:([\\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[" +
								"01]?\\d\\d?)$|^([\\da-fA-F]{1,4}:){3}:([\\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?" +
								")\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$|^([\\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\\d|[01]?\\d\\d" +
								"?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$|^([\\da-fA-F]{1,4}:){7}[\\da-fA-F]{1,4}$|^:((:[\\da-" +
								"fA-F]{1,4}){1,6}|:)$|^[\\da-fA-F]{1,4}:((:[\\da-fA-F]{1,4}){1,5}|:)$|^([\\da-fA-F]{1,4}:){2}((:[\\da" +
								"-fA-F]{1,4}){1,4}|:)$|^([\\da-fA-F]{1,4}:){3}((:[\\da-fA-F]{1,4}){1,3}|:)$|^([\\da-fA-F]{1,4}:){4}((" +
								":[\\da-fA-F]{1,4}){1,2}|:)$|^([\\da-fA-F]{1,4}:){5}:([\\da-fA-F]{1,4})?$|^([\\da-fA-F]{1,4}:){6}:$"
						);
						if (ipAddress.test(value)) {
							return "";
						}
						return msg;
					},
					trigger: ["change", "input", "blur"]
				};
			},
			// 行数据必填项
			rowDataRequired: rowArray => {
				return {
					name: "required",
					async validator({ val, xItem }) {
						const record = [];
						let rows = xItem.configs?.payload?.row || {};
						for (let key of rowArray) {
							record.push(rows[key]);
						}
						if (_.every(record, i => !i)) {
							/* 都没填 */
							return "";
						}
						if (_.every(record, i => !!i)) {
							/* 都填了 */
							return "";
						}
						if (val) {
							/* 自己填了 */
							return "";
						}
						return "需保证行数据完整";
					},
					trigger: ["change", "blur"]
				};
			},
			rowDataRequiredAll: rowArray => {
				return {
					name: "required",
					async validator({ val, xItem }) {
						const record = [];
						let rows = xItem.configs?.payload?.row || {};
						for (let key of rowArray) {
							record.push(rows[key]);
						}

						if (_.every(record, i => !i)) {
							/* 都没填 */
							return "需保证行数据完整";
						}
						if (_.every(record, i => !!i)) {
							/* 都填了 */
							return "";
						}
						if (val) {
							/* 自己填了 */
							return "";
						}
						return "需保证行数据完整";
					},
					trigger: ["change", "blur"]
				};
			},
			notAllNumReg(msg = i18n("msgEnter220DigitsLettersNumbers")) {
				return {
					name: "notAllNumReg",
					async validator({ val }) {
						if (/^\d+$/.test(val) || val === "") {
							return "";
						}
						return msg;
					},
					trigger: ["change", "input", "blur"]
				};
			},
			scRancherPortName(msg = i18n("msgEnter220DigitsLettersNumbers")) {
				return {
					name: "scRancherPortName",
					async validator({ val }) {
						if (/^(?=.*\d)(?=.*[a-zA-Z])/.test(val)) {
							return "";
						}
						return msg;
					},
					trigger: ["change", "input", "blur"]
				};
			},
			scEnvName(msg = i18n("msgEnter220DigitsLettersNumbers")) {
				return {
					name: "scEnvName",
					async validator({ val }) {
						if (/[-._a-zA-Z][-._a-zA-Z0-9]*/.test(val)) {
							return "";
						}
						return msg;
					},
					trigger: ["change", "input", "blur"]
				};
			}
		};
	}
	return _rules;
}
</script>
