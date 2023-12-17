<template>
	<div>
		<xMd :md="md" />
		<xInputNumber v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10"></xInputNumber>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "设置 `controls-position` 属性可以控制按钮位置。",
				num: 1
			};
		},
		methods: {
			handleChange(value) {
				console.log(value);
			}
		}
	});
}
</script>
<style lang="less"></style>
