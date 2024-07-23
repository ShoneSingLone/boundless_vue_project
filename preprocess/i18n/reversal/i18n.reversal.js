const { val, fs, path, _ } = require("../../preprocess.utils");
/* 把分开的zh-cn en 合并为数组的形式 */
let target = {};
//js遍历对象
function TraversalObject(obj, prePropArray = []) {
	_.each(obj, (objOrLabel, prop) => {
		prePropArray.push(prop);
		if (_.isPlainObject(objOrLabel)) {
			//递归遍历
			TraversalObject(objOrLabel, prePropArray);
		} else {
			const props = prePropArray.join(".");
			console.log(props, prePropArray);
			const zh = objOrLabel;
			const en = val(b, props);
			val(target, props, [zh, en]);
		}
		prePropArray.pop();
	});
}

var a = {
	vpc_tip: {
		first: "建议您使用专有网络的网段如10.0.0.0/8，172.16.0.0/12，192.168.0.0/16，多VPC互通场景或混合云场景需确保地址规划不能冲突。",
		second: "不能使用 100.64.0.0/10、224.0.0.0/4、127.0.0.0/8 或 169.254.0.0/16 网段作为VPC的网段。"
	},
};

var b = {
	vpc_tip: {
		first: "You are advised to use dedicated network segments such as 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16. In multi-VPC interworking scenarios or hybrid cloud scenarios, the addresses cannot conflict with one another.",
		second: "You cannot use 100.64.0.0/10, 224.0.0.0/4, 127.0.0.0/8 or 169.254.0.0/16 network segments as VPC network segments."
	},
};
TraversalObject(a);
fs.writeFileSync(path.resolve(__dirname, "./reversal.json"), JSON.stringify(target, null, 2));
