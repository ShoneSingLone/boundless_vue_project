<template>
	<div class="el-card xCard flex vertical" :class="cptClassName">
		<div class="el-card__header" v-if="$slots.header || header">
			<slot name="header">{{ header }}</slot>
		</div>
		<div :class="cptBodyClass" :style="bodyStyle">
			<slot></slot>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "xCard",
		props: {
			header: {},
			bodyStyle: {},
			bodyClass: {},
			shadow: {
				type: String
			}
		},
		computed: {
			cptClassName() {
				if (this.shadow) {
					return `is-${this.shadow}-shadow`;
				} else {
					if (this.$X_APP_THEME === "tiny") {
						return "";
					} else {
						return "is-always-shadow";
					}
				}
			},
			cptBodyClass() {
				return _.merge({ "el-card__body flex1": true }, this.bodyClass || {});
			}
		}
	});
}
</script>
<style lang="less">
.xCard {
	.el-card__body {
		position: relative;
	}
}
</style>
