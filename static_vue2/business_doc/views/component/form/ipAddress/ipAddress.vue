<template>
	<div class="ctyun-ip">
		<div class="cloud-ip-contaienr ctyun-ip__contaienr cloud-flex-ip-v4">
			<div class="el-tooltip cloud-ip-input ctyun-ip__center ctyun-ip__input el-input el-input--small cloud-ip-v4__content">
				<el-input v-model="ipObj.one" maxlength="3" />
			</div>
		</div>
		<div class="cloud-ip-contaienr ctyun-ip__contaienr cloud-flex-ip-v4">
			<div class="el-tooltip cloud-ip-input ctyun-ip__center ctyun-ip__input el-input el-input--small cloud-ip-v4__content">
				<el-input v-model="ipObj.two" maxlength="3" />
			</div>
		</div>
		<div class="cloud-ip-contaienr ctyun-ip__contaienr cloud-flex-ip-v4">
			<div class="el-tooltip cloud-ip-input ctyun-ip__center ctyun-ip__input el-input el-input--small cloud-ip-v4__content">
				<el-input v-model="ipObj.three" maxlength="3" />
			</div>
		</div>
		<div class="cloud-ip-contaienr ctyun-ip__contaienr cloud-flex-ip-v4">
			<div class="el-tooltip cloud-ip-input ctyun-ip__center ctyun-ip__input el-input el-input--small cloud-ip-v4__content">
				<el-input v-model="ipObj.four" maxlength="3" />
			</div>
		</div>
		<el-select class="ctyun-ip__mask is-select" v-model="ipObj.port" v-if="portOption.length > 0">
			<el-option v-for="item of portOption" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
	</div>
</template>

<script>
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return {
		name: "CtyunItemIpAddress",
		mixins: [mixins],
		props: ["value", "configs", "options"],
		data() {
			return {
				ipObj: {
					one: "192",
					two: "168",
					three: "0",
					four: "0",
					port: "8"
				}
			};
		},
		// watch: {
		// 	value: {
		// 		immediate: true,
		// 		handler(value) {
		// 			if (value) {
		// 				const [ipList, port] = value?.split("/");
		// 				let [one, two, three, four] = ipList?.split(".");
		// 				this.ipObj = {
		// 					one,
		// 					two,
		// 					three,
		// 					four,
		// 					port
		// 				};
		// 			}
		// 		}
		// 	},
		// 	ipObj: {
		// 		immediate: true,
		// 		deep: true,
		// 		handler(values) {
		// 			if (values) {
		// 				let str = Object.keys(values).reduce((str, item) => {
		// 					if (item === "port") {
		// 						str = str.replace(/\.$/, "");
		// 						str += `/${values[`${item}`]}`;
		// 					} else {
		// 						str += `${values[`${item}`]}.`;
		// 					}
		// 					return str;
		// 				}, "");
		// 				this.$emit("change", str);
		// 			}
		// 		}
		// 	}
		// },
		computed: {
			portOption({ options }) {
				let arr1 = [];
				// const [start, end] = options;
				const start = 1;
				const end = 29;
				for (let i = start; i <= end; i++) {
					arr1.push(i);
				}
				return arr1.map(item => ({ label: item, value: item + "" }));
			}
		},
		methods: {}
	};
}
</script>

<style scoped lang="scss">
.ctyun-ip,
.ctyun-ip__contaienr {
	display: inline-block;
}

.ctyun-ip .cloud-ip-input {
	position: relative;
}

.ctyun-ip__input {
	margin-right: 14px;
}

.ctyun-ip__input:not(:first-of-type):before {
	content: ".";
	position: absolute;
	left: -13px;
	bottom: 0;
	padding: 0 5px;
}

.ctyun-ip__input.el-input--mini {
	width: 52px;
}

.ctyun-ip__mask {
	display: inline-block;
	width: 47px;
}

.ctyun-ip__mask.is-select {
	width: 70px;
}

.ctyun-ip__mask.el-input--mini {
	width: 45px;
}

.ctyun-ip__mask:before {
	content: "/";
	position: absolute;
	left: -12px;
	font-size: 14px;
	top: 50%;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
}

.ctyun-ip .cloud-ip-v4__content {
	width: 54px;
}

.ctyun-ip .cloud-ip-v4__content:not(:first-of-type):before {
	content: ".";
	position: absolute;
	left: -13px;
	bottom: 0;
}

.ctyun-ip .cloud-ip-v6__content {
	width: 58px;
	margin-bottom: 10px;
}

.ctyun-ip .cloud-ip-v6__content:not(:first-of-type):before {
	content: ":";
	position: absolute;
	left: -13px;
	top: 47%;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
}
</style>
