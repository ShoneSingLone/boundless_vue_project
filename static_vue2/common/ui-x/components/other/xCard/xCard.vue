<template>
	<div class="el-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
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
			cptBodyClass() {
				return _.merge({ "el-card__body": true }, this.bodyClass || {});
			}
		}
	});
}
</script>
<style lang="less"></style>
