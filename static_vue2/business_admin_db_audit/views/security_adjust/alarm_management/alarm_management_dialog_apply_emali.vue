<template>
	<xDialog>
		<xForm col="1" ref="form">
			<xItem :configs="form.email" />
			<xItem :configs="form.remark" />
			</xItem>
		</xForm>
		<template #footer>
			<div class="flex center width100">
				<xBtn :configs="btnOk" />
				<xGap w="32" />
				<xBtn @click="closeModal">{{ i18n("关闭") }}</xBtn>
			</div>
		</template>
	</xDialog>
</template>

<script>
export default async function ({ row, warringStatus, parent }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return {
		name: "alarm_management_dialog",
		props: useDialogProps(),
		data() {
			return {
				form: defItems({
          email: {
            label: "邮箱",
            value: '',
            itemType: "xItemInput",
            rules:[_rules.required(),_rules.email('请输入正确的邮箱地址')]
          },
          remark: {
            label: "备注",
            value: '',
            type:'textarea',
            itemType: "xItemInput",
          },
        })
			};
		},
		computed: {
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						vm.handleSubmit();
					}
				};
			}
		},
    methods: {
     async handleSubmit() {
        const [error] = await _.$validateForm(this.$el);
        if (error) {
          return;
        }
        let obj = _.$pickFormValues(this.form);
        const {code,msg:message}=await _api.admin_db_audit.xdsWarningEmailAdd(obj);
        if(code===1){
          _.$msgError(message);
        }else{
          _.$msgSuccess(message);
          this.closeModal();
          parent.handlexdsWarningEmailFind();
        }
      }
    },
	};
}
</script>

<style scoped lang="less">
.mess {
	font-weight: 400;
	font-size: 14px;
	color: #333333;
}
</style>
