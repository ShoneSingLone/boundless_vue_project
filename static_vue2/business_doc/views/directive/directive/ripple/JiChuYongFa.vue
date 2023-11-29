<template>
	<elRow :gutter="50">
		<elCol :span="12">
			<div class="ripple-button">
				<xCard class="ripple-html-element" v-ripple="{ color: '#5e7ce0', duration: 300, delay: 300 }">HTML元素 中使用 v-ripple</xCard>
			</div>
		</elCol>
		<elCol :span="12">
			<div class="ripple-button">
				<xCard class="ripple-html-element" v-ripple="{ duration: 800 }">HTML元素 中使用 v-ripple</xCard>
			</div>
		</elCol>
	</elRow>
</template>
<script>
export default async function () {
	return defineComponent({});
}
</script>
<style lang="less"></style>
