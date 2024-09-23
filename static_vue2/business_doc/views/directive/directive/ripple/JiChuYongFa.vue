<template>
	<xRow :gutter="50">
		<xCol :span="12">
			<div class="ripple-button">
				<xBlock
					class="ripple-html-element"
					v-ripple="{ color: '#5e7ce0', duration: 300, delay: 300 }"
					>HTML元素 中使用 v-ripple</xBlock
				>
			</div>
		</xCol>
		<xCol :span="12">
			<div class="ripple-button">
				<xBlock class="ripple-html-element" v-ripple="{ duration: 800 }"
					>HTML元素 中使用 v-ripple</xBlock
				>
			</div>
		</xCol>
	</xRow>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({});
}
</script>
<style lang="less"></style>
