<template>
	<div>
		<Md :md="md" />
		<xInputNumber v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></xInputNumber>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "要使用它，只需要在`xInputNumber`元素中使用`v-model`绑定变量即可，变量的初始值即为默认值。",
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
