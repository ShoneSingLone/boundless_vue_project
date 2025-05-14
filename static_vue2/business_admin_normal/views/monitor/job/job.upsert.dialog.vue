<template>
	<xDialog>
		<xCard>
			<xForm ref="form" col="1">
				<xItem :configs="form.jobName" />
				<xItem :configs="form.jobGroup" />
				<xItem :configs="form.invokeTarget" />
				<xItem :configs="form.cronExpression" />
				<xItem :configs="form.status" />
				<xItem :configs="form.misfirePolicy" />
				<xItem :configs="form.concurrent" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("Cancel") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row, onClick }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	row = row || {};
	const isUpdate = !!row.jobId;

	let dicts = {
		sys_normal_disable: null,
		sys_job_group: null
	};

	dicts = await _adminTools.newDicts(dicts);

	const misfirePolicyOptions = [
		{ label: "立即执行", value: "1" },
		{ label: "执行一次", value: "2" },
		{ label: "放弃执行", value: "3" }
	];

	return defineComponent({
		misfirePolicyOptions,
		props: useDialogProps(),
		mounted() {
			this.fillbackFormData();
		},
		data() {
			return {
				isUpdate,
				form: defItems({
					jobName: { value: "", label: "任务名称", rules: [_rules.required()] },
					jobGroup: {
						value: "",
						label: "任务分组",
						rules: [_rules.required()],
						itemType: "xItemSelect",
						options: dicts.sys_job_group
					},
					invokeTarget: {
						value: "",
						label: "调用方法",
						rules: [_rules.required()],
						tips: () =>
							hDiv([
								hDiv([`Bean调用示例：ryTask.ryParams('ry')`]),
								hDiv([
									`Class类调用示例：com.ruoyi.quartz.task.RyTask.ryParams('ry')`
								]),
								hDiv([`参数说明：支持字符串，布尔类型，长整型，浮点型，整型`])
							])
					},
					cronExpression: { value: "", label: "cron表达式", rules: [_rules.required()] },
					status: {
						value: "",
						label: "状态",
						itemType: "xItemRadioGroup",
						isButton: true,
						options: dicts.sys_normal_disable,
						rules: [_rules.required()]
					},
					misfirePolicy: {
						value: "",
						label: "执行策略",
						rules: [_rules.required()],
						itemType: "xItemRadioGroup",
						isButton: true,
						options: misfirePolicyOptions
					},
					concurrent: {
						value: "",
						label: "是否并发",
						rules: [_rules.required()],
						itemType: "xItemRadioGroup",
						isButton: true,
						options: [
							{ label: "允许", value: "0" },
							{ label: "禁止", value: "1" }
						]
					}
				})
			};
		},
		computed: {
			cptjobId() {
				return row?.jobId;
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("OK"),
					preset: "blue",
					async onClick() {
						vm.onClickOk();
					}
				};
			}
		},
		methods: {
			async fillbackFormData() {
				if (isUpdate) {
					const { data } = await _adminTools.api_job_by_jobId(row.jobId);
					row = data;

					_.$setFormValues(this.form, row);
				}
			},
			async onClickOk() {
				const [error] = await _.$validateForm(this.$el);
				if (error) {
					return;
				}

				const formData = _.$pickFormValues(this.form);
				try {
					if (isUpdate) {
						await _adminTools.api_job_modify({
							...row,
							...formData
						});
					} else {
						await _adminTools.api_job_new(formData);
					}
					onClick();
					_.$msg(isUpdate ? "修改成功" : "新增成功");
					this.closeModal();
				} catch (error) {
					_.$msgError(error?.msg || error);
				}
			}
		}
	});
}
</script>
