<style lang="less">
.xIpAddress {
	.xIpAddress_content {
		width: 54px;
		> .xInput {
			> input {
				text-align: center;
			}
		}
	}
	.cidr-point {
		margin: 0 4px;
	}
}
</style>
<template>
	<span class="xIpAddress flex middle">
		<xInput
			:disabled="cptDisabledOne || disabled"
			:value="ipObj.one"
			maxlength="3"
			class="xIpAddress_content"
			@blur="handleBlur"
			@input="$event => handleChange('one', $event)" />
		<span class="cidr-point">·</span>
		<xInput
			:disabled="cptDisabledTwo || disabled"
			:value="ipObj.two"
			maxlength="3"
			class="xIpAddress_content"
			@blur="handleBlur"
			@input="$event => handleChange('two', $event)" />
		<span class="cidr-point">·</span>
		<xInput
			:disabled="cptDisabledThree || disabled"
			:value="ipObj.three"
			maxlength="3"
			class="xIpAddress_content"
			@blur="handleBlur"
			@input="$event => handleChange('three', $event)" />
		<span class="cidr-point">·</span>
		<xInput
			:disabled="cptDisabledFour || disabled"
			:value="ipObj.four"
			maxlength="3"
			class="xIpAddress_content"
			@blur="handleBlur"
			@input="$event => handleChange('four', $event)" />
	</span>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: {
			value: {
				type: String,
				default: () => ""
			},
			disabled: {
				type: Boolean,
				default: () => false
			}
		},
		model: {
			prop: "value",
			event: "change"
		},
		data() {
			return {};
		},
		computed: {
			cptDisabledOne() {
				return false;
			},
			cptDisabledTwo() {
				return false;
			},
			cptDisabledThree() {
				return false;
			},
			cptDisabledFour() {
				return false;
			},
			ipObj: {
				get() {
					try {
						const [one, two, three, four] = this.value?.split(".");

						return {
							one,
							two,
							three,
							four
						};
					} catch (error) {
						return { one: "", two: "", three: "", four: "" };
					}
				},
				set({ one, two, three, four }) {
					const ipString = (() => {
						let _ipString = [one, two, three, four]
							.map(i => {
								i = String(i);
								return i === "undefined" ? "" : i;
							})
							.join(".");

						if (_ipString === "...") {
							return "";
						}

						return _ipString;
					})();
					this.$emit("change", ipString);
				}
			}
		},
		methods: {
			setIpObj(prop, val) {
				this.ipObj[prop] = val;
				this.ipObj = { ...this.ipObj };
			},
			handleBlur($event) {
				this.$emit("blur", $event);
			},
			handleChange(prop, val) {
				if (val === "") {
					this.setIpObj(prop, val);
				} else {
					val = Number(val);
					if (!_.isNumber(Number(val))) {
						return;
					}
					if (_.isNaN(val)) {
						return;
					}
					this.setIpObj(prop, val);
				}
			}
		}
	});
}
</script>
