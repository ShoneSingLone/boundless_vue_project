<template>
	<div>
		<DemoAndCode title="基础用法" path="@/views/xComponent/xItem/JiChuYongFa.vue" unfold />
		<Md :md="apiString" />
	</div>
</template>

<script>
export default async function () {
	return {
		data() {
			return {
				apiString: ""
			};
		}
	};
}
</script>

<style lang="less"></style>
