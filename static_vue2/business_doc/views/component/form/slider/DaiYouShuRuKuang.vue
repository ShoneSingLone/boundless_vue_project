<template>
	<div>
		<xMd :md="md" />
		<xForm>
			<div class="block">
				<xSlider v-model="value" show-input> </xSlider>
			</div>
		</xForm>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "通过输入框设置精确数值\n\n设置`show-input`属性会在右侧显示一个输入框",
				value: 0
			};
		}
	});
}
</script>
<style lang="less"></style>
