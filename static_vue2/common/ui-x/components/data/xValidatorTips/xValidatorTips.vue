<template>
	<h1 class="MUST_MODIFY">{{ title }}</h1>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				title: "MUST_MODIFY"
			};
		}
	});
}
</script>
<style lang="less">
.MUST_MODIFY {
	color: red;
}
</style>
