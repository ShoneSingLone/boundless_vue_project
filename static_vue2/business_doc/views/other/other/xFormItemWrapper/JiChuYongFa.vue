<template>
	<xForm col="1">
		<xFormItemWrapper label="单独校验" :rules="rules">
			<template #controller>
				<xCard>
					<xInput v-model="form.a" />
					<xInput v-model="form.b" />
					<xInput v-model="form.c" />
				</xCard>
			</template>
		</xFormItemWrapper>
		<xBtn :configs="configsBtn" />
	</xForm>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			const vm = this;
			return {
				form: {
					a: "",
					b: "",
					c: ""
				},
				configsBtn: {
					preset: "blue",
					label: "校验",
					onClick() {
						_.$validateForm(vm.$el);
					}
				},
				rules: [
					{
						name: "required",
						validator() {
							const isFill = _.$isEveryInput(vm.form);
							if (isFill) {
								return "";
							} else {
								return i18n("至少配置一条数据");
							}
						}
					}
				]
			};
		}
	});
}
</script>
<style lang="less"></style>
