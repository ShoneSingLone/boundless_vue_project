<style lang="less"></style>
<template>
	<div>{{ i18n("input_correct_phone") }}</div>
	<div>{{ i18nMany("请输入正确的手机号码2") }}</div>
	<div>{{ i18n("请输入正确的手机号码3") }}</div>
	<div>{{ i18n("请输入正确的手机号码4") }}</div>
	<div>{{ i18n("请输入正确的手机号码5") }}</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		data() {
			return { THIS_FILE_URL };
		}
	});
}
</script>
