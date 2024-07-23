<template>
	<div class="notification-JiChuYongFa">
		<xMd md="悬浮出现在页面角落，显示全局的通知提醒消息。" />
		<div class="mt">
			<xBtn @click="open1"> _.$notify</xBtn>
			<xBtn @click="open11"> _.$notify.error</xBtn>
		</div>
		<xMd md="### 手动关闭实例" />
		<xMd :md="md" />
		<div class="mt">
			<xMd :md="md2" />
			<xBtn @click="open2"> _.$notify </xBtn>
			<xBtn @click="closeAll" preset="danger"> _.$notify.closeAll </xBtn>
		</div>
		<div class="mt">
			<xMd :md="md3" />
			<xItem :configs="form.type" class="mb" />
			<xBtn :configs="btnSingle" />
			<xBtn :configs="btnClose" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		computed: {
			btnSingle() {
				const vm = this;
				return {
					label: "_.$notify.success",
					preset: vm.form.type.value,
					disabled() {
						return vm.notifyVm;
					},
					async onClick() {
						vm.notifyVm = await _.$notify[vm.form.type.value]({
							title: "这是一条不会自动关闭的消息",
							message: () =>
								h(
									"i",
									{ style: "color: teal" },
									"将message作为render函数使用,返回vNode"
								),
							duration: 0
						});
					}
				};
			},
			btnClose() {
				const vm = this;
				return {
					label: "_.$notify.close(id)",
					preset: "danger",
					disabled() {
						return !vm.notifyVm;
					},
					onClick() {
						vm.notifyVm?.id && _.$notify.close(vm.notifyVm.id);
						setTimeout(() => {
							vm.notifyVm = false;
						}, 1000);
					}
				};
			}
		},
		data() {
			return {
				form: defItems({
					type: {
						value: "success",
						itemType: "xItemSelect",
						options: [
							{
								label: "success",
								value: "success"
							},
							{
								label: "info",
								value: "info"
							},
							{
								label: "warning",
								value: "warning"
							},
							{
								label: "error",
								value: "error"
							}
						]
					}
				}),
				notifyVm: false,
				md: `\`_.$notify\`会返回instance`,
				md2: `关闭所有实例:\`_.$notify.closeAll()\``,
				md3: `关闭指定实例:\`_.$notify.close(id)\``
			};
		},
		methods: {
			closeAll() {
				_.$notify.closeAll();
				this.notifyVm = false;
			},
			open1() {
				_.$notify({
					title: "_.$notify",
					message: "这是一条会自动关闭的消息"
				});
			},
			open11() {
				_.$notify.error({
					title: "$notify.error",
					message: "这是一条会自动关闭的消息"
				});
			},
			open2() {
				_.$notify({
					title: "_.$notify",
					message: () => [
						h(
							"div",
							{ style: "color:yellow;background:black;padding:10px;" },
							"将message作为render函数使用,返回vNode"
						),
						h("p", { style: "color: teal" }, "将message作为render函数使用,返回vNode")
					],
					duration: 0
				});
			}
		}
	});
}
</script>
<style lang="less"></style>
