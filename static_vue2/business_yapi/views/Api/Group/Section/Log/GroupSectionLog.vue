<template>
	<div v-if="isShow" class="GroupSectionLog">
		<section class="mb mt el-card x-padding flex1 log-wrapper beautiful-scroll">
			<xTimeline>
				<xTimelineItem
					center
					:timestamp="getTime(logItem.add_time)"
					placement="top"
					v-for="(logItem, index) in logList"
					:key="index">
					<xCard>
						<template #header>
							<div class="logtype flex middle">
								<span class="logHead">{{ getTitle(logItem.type) }}</span>
								<span class="logtime ml mr">
									{{ getTimeAgo(logItem.add_time) }}
								</span>
								<xBtn @click="showDiff(logItem.data)" v-if="hasDiff(logItem.data)"
									>改动详情</xBtn
								>
							</div>
						</template>
						<span class="logcontent" v-html="logItem.content" />
					</xCard>
				</xTimelineItem>
			</xTimeline>
		</section>
		<div class="flex end">
			<xPagination :configs="configsTable" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		data() {
			const vm = this;
			return {
				logList: [],
				configsTable: {
					onQuery() {
						vm.updateGroupLog();
					},
					pagination: {
						page: 1,
						size: 10,
						total: 0
					}
				}
			};
		},
		computed: {
			isShow() {
				return this.$route.query.GroupViewTabName === Vue._yapi_var.TAB_KEY_GROUP_LOG;
			}
		},
		methods: {
			async showDiff(data) {
				const vm = this;
				const jsondiffpatch = await _.$appendScript(
					"/common/libs/jsondiffpatch.umd.js",
					"jsondiffpatch"
				);
				const formattersHtml = jsondiffpatch.formatters.html;
				const diffView = Vue._common_utils.diffMessage(jsondiffpatch, formattersHtml, data);
				const addMember = await _.$importVue(
					"@/views/Api/Group/Section/Log/GroupSectionLogWindowDiff.vue",
					{
						parent: this,
						diffView,
						onOk() {
							vm.APP.updateGroupMemberList();
						}
					}
				);
				_.$openWindow_deprecated(i18n("Api 改动日志"), addMember, {
					maxmin: true,
					fullscreen: false
				});
			},
			async updateGroupLog() {
				_.$loading(true);
				try {
					const { page, size } = this.configsTable.pagination;
					const {
						data: { list, total }
					} = await _api.yapi.getLogList({
						typeid: this.APP.cptGroupId,
						type: "group",
						page: page,
						limit: size
					});
					this.logList = list;
					_.$setPagination(this.configsTable, { page, size, total });
				} catch (error) {
				} finally {
					_.$loading(false);
				}
			},
			getTime(time) {
				return _.$dateFormat(time);
			},
			getTimeAgo(time) {
				return _.$timeAgo(time);
			},
			getTitle(type) {
				return `${Vue._yapi_var.LOG_TYPE[type]}动态`;
			},
			hasDiff(data) {
				return _.isPlainObject(data);
			}
		},
		watch: {
			"APP.cptGroupId": {
				immediate: true,
				async handler(groupId, oldGroupId) {
					if (groupId) {
						try {
							this.configsTable.pagination.current = 1;
							this.updateGroupLog();
						} catch (error) {
							_.$msgError(error);
						}
					}
				}
			}
		}
	});
}
</script>
<style lang="less">
.GroupSectionLog {
	height: 100%;
	overflow: hidden;
	display: flex;
	flex-flow: column nowrap;
	.log-wrapper {
		flex: 1;
		height: 1px;
		overflow: auto;
	}

	.logcontent {
		line-height: 24px;
		margin-top: var(--ui-one);
		padding: 0px 16px;
		a {
			color: var(--el-color-primary-active);
		}
	}
}
</style>
