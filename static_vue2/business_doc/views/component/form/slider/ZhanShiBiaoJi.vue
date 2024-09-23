<template>
	<div>
		<xMd :md="md" />
		<xForm>
			<div class="block">
				<xSlider v-model="value" range :marks="marks"> </xSlider>
			</div>
		</xForm>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "设置 `marks` 属性可以展示标记",

				value: [30, 60],
				marks: {
					0: "0°C",
					8: "8°C",
					37: "37°C",
					50: {
						style: {
							color: "#1989FA"
						},
						label: this.$createElement("strong", "50%")
					}
				}
			};
		}
	});
}
</script>
<style lang="less"></style>
