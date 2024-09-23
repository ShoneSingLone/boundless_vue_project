<template>
	<xDialog style="--xDialog-wrapper-width: 800px; min-height: 500px">
		<xCard>
			<xForm col="2" class="descriptions-style1">
				<xItemDesc v-for="(item, index) in itemsBaseInfo" :key="index" :item="item" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row }) {
	const isUpdate = !!row;
	const [{ useDialogProps }, { misfirePolicyOptions }] = await _.$importVue([
		"/common/utils/hooks.vue",
		"@/views/monitor/job/job.upsert.dialog.vue"
	]);
	let dicts = {
		sys_normal_disable: null,
		sys_job_status: null
	};
	dicts = await _adminTools.newDicts(dicts);

	return defineComponent({
		props: useDialogProps(),
		mounted() {
			this.init();
		},
		data() {
			return {
				itemsBaseInfo: [
					{ label: "任务编号", value: row.jobId },
					{ label: "任务名称", value: row.jobName },
					{ label: "任务分组", value: row.jobGroup },
					{ label: "创建时间", value: row.createTime },
					{ label: "cron表达式", value: row.cronExpression },
					{ label: "下次执行时间", value: row.nextValidTime },
					{ label: "调用目标方法", value: row.invokeTarget },
					{ label: "任务状态", value: _.$val2L(row.status, dicts.sys_job_status) },
					{
						label: "是否并发",
						value: _.$val2L(row.concurrent, dicts.sys_normal_disable)
					},
					{ label: "执行策略", value: _.$val2L(row.misfirePolicy, misfirePolicyOptions) }
				],
				form: {
					name: {
						value: "",
						label: i18n("name"),
						disabled: isUpdate,
						rules: [_rules.required(), _rules.lessThan(50)]
					}
				}
			};
		},
		computed: {
			isUpdate() {
				return !!row;
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						vm.onClickOk();
					}
				};
			}
		},
		methods: {
			async init() {},
			async onClickOk() {
				const [error] = await _.$validateForm(this.el);
				if (error) {
					return;
				}
				this.closeModal();
			}
		}
	});
}
</script>
