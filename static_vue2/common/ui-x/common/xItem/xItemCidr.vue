<template>
	<div class="flex middle">
		<xItemIpAddress v-model="cptIp" :disabled="configs.disabled" />
		<div class="cidr-point">/</div>
		<xSelect
			v-if="optionsPorts.length > 0"
			v-model="cptPort"
			:disabled="configs.disabled"
			style="width: 94px"
			placeholder="">
			<xOption
				v-for="item of optionsPorts"
				:key="item.value"
				:label="item.label"
				:value="item.value" />
		</xSelect>
		<div v-else class="xIpAddress">
			<xInput
				v-model="cptPort"
				maxlength="3"
				class="xIpAddress_content"
				:disabled="configs.disabled" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return {
		name: "xItemCidr",
		mixins: [mixins],
		props: ["value", "configs", "options"],
		data() {
			return {};
		},
		computed: {
			cptParentCidr() {
				const val = this.$xItemAttr("cidr");
				return _.$isInput(val) ? val : "";
			},
			cptParentCidrIpPort() {
				const [ip, port] = String(this.cptParentCidr || "").split("/");
				return {
					ip: ip || "",
					port: port || ""
				};
			},
			cptParentCidrPort() {
				return this.cptParentCidrIpPort.port;
			},
			optionsPorts() {
				let options = [];
				if (this.cptParentCidrPort) {
					for (let index = this.cptParentCidrPort; index < 30; index++) {
						options.push({
							label: index,
							value: index
						});
					}
				}
				return options;
			},
			cptIpPort() {
				const [ip, port] = String(this.mixin_value).split("/");
				return {
					ip: ip || "",
					port: port || ""
				};
			},
			cptPort: {
				get() {
					return this.cptIpPort.port;
				},
				set(newPort) {
					if (this.cptIp === "" && newPort === "") {
						this.mixin_value = "";
					} else {
						try {
							newPort = Number(newPort);
							if (_.isNaN(newPort) || newPort > 32 || newPort < 0) {
								return;
							}

							if (this.cptParentCidrPort) {
								if (newPort > 29 || newPort < this.cptParentCidrPort) {
									return;
								}
							}
						} catch (error) {}

						this.mixin_value = `${this.cptIp}/${newPort}`;
					}
				}
			},
			cptIp: {
				get() {
					return this.cptIpPort.ip;
				},
				set(newIp) {
					if (this.cptPort === "" && newIp === "") {
						this.mixin_value = "";
					} else {
						this.mixin_value = `${newIp}/${this.cptPort}`;
					}
				}
			}
		}
	};
}
</script>
<style lang="less">
.xItemCidr,
.xItemCidr__contaienr {
	display: inline-block;
	input {
		text-align: center;
	}
}

.xItemCidr {
	--xItem-wrapper-width: 520px;
	.cloud-ip-input {
		position: relative;
	}
	.cloud-ip-v4__content:not(:first-of-type):before {
		content: ".";
		position: absolute;
		left: -13px;
		bottom: 0;
	}
}
</style>
