<script>
/**
 * @type RULES
 */
export default async function RULES() {
	/**
	 * @typedef RULES
	 */
	return {
		required: defaultMsg => {
			defaultMsg =
				defaultMsg === undefined ? i18n("requiredFields") : defaultMsg;
			return {
				name: "required",
				async validator({ val }) {
					let msg = "";
					if (!_.$isInput(val)) {
						msg = defaultMsg || i18n("requiredFields");
					}
					/* 返回提示信息即error */
					/* 返回""为success */
					return msg;
				},
				trigger: ["change", "blur"]
			};
		},
		lessThan: size => {
			return {
				name: "lessThan",
				async validator({ val }) {
					let msg = "";
					if (String(val).length > size) {
						msg = i18n("ruleWordLessThan", { size });
					}
					/* 返回提示信息即error */
					/* 返回""为success */
					return msg;
				},
				trigger: ["change", "blur"]
			};
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
				trigger: ["blur"]
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
		lettersOrNumbers(
			msg = i18n("以小写英文字母或数字开头，并且只包含字母、数字或者-")
		) {
			return {
				name: "name",
				async validator({ val }) {
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
					for (let key in rows) {
						if (rowArray.includes(key)) {
							record.push(rows[key]);
						}
					}

					if (_.every(record, i => !_.$isInput(i))) {
						/* 都没填 */
						return "";
					}
					if (_.every(record, i => _.$isInput(i))) {
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
		}
	};
}
</script>
