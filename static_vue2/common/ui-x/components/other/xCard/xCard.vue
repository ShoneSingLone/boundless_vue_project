<template>
	<div class="el-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
		<div class="el-card__header" v-if="$slots.header || header">
			<slot name="header">{{ header }}</slot>
		</div>
		<div class="el-card__body" :style="bodyStyle">
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		name: "xCard",
		props: {
			header: {},
			bodyStyle: {},
			shadow: {
				type: String
			}
		}
	});
}
</script>
<style lang="less"></style>
