<template>
	<div>
		<xMd md="用插槽的方式处理特殊的输入控件，使用单独的rules用于校验" />
		<xForm col="3" id="xItemWrapper-JiChuYongFa">
			<xItemWrapper label="单独校验" :rules="rules">
				<template #controller>
					<div class="flex middle xItemWrapper-JiChuYongFa_some-class">
						<xInput v-model="form.a" />
						-
						<xInput v-model="form.b" />
						-
						<xInput v-model="form.c" />
					</div>
				</template>
			</xItemWrapper>
		</xForm>
		<xBtn :configs="configsBtn" />
	</div>
</template>
<script lang="ts">
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
<style lang="less">
.xItemWrapper-JiChuYongFa_some-class {
	width: 132px;
}
</style>
