<template>
	<xDialog style="--xDialog-wrapper-width: 800px; min-height: 500px">
		<xCard>
			<xForm col="2" class="descriptions-style1">
				<xItemDesc v-for="(item, index) in itemsBaseInfo" :key="index" :item="item" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row }) {
	const [{ useDialogProps }] = await _.$importVue(["/common/utils/hooks.vue"]);
	let dicts = {
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
					{ label: "日志序号", value: row.jobLogId },
					{ label: "任务名称", value: row.jobName },
					{ label: "任务分组", value: row.jobGroup },
					{ label: "执行时间", value: row.createTime },
					{ label: "调用方法", value: row.invokeTarget },
					{ label: "日志信息", value: row.jobMessage },
					{ label: "执行状态", value: _.$val2L(row.status, dicts.sys_job_status) },
					{ label: "异常信息", value: row.exceptionInfo }
				]
			};
		},
		computed: {},
		methods: {
			async init() {}
		}
	});
}
</script>
