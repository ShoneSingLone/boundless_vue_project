<template>
	<section id="ViewUser" :class="cptNoteClass">
		<AppHeader v-if="cptIsShowAppHeaderComponent" />
		<div class="flex1-overflow-auto flex">
			<UserList />
		</div>
	</section>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			AppHeader: () => _.$importVue("@/views/Api/Header/ApiHeader.vue"),
			UserList: () => _.$importVue("@/views/User/UserList.vue")
		},
		async mounted() {
			(() => {
				document.title = `Y-API-用户管理`;
			})();
		},
		provide() {
			const inject_im = this;
			return {
				inject_im
			};
		},
		data() {
			return {
				isCollapse: true,
				expandedKeys: [],
				isShowEditor: false
			};
		},
		methods: {},
		computed: {
			cptImChatWith() {
				const { uid } = this.$route.query;
				const item = _.find(this.APP.all_user, i => _.$isSame(i.uid, uid));
				return item || {};
			},
			cptToggleStyle() {
				return {
					position: "absolute",
					zIndex: 1,
					margin: "8px"
				};
			},
			cptMountProps() {
				return {
					class: "flex1 flex vertical",
					style: {
						height: "1px"
					}
				};
			},
			cptNoteClass() {
				return { "is-show-header": this.cptIsShowAppHeaderComponent };
			},
			cptIsShowAppHeaderComponent() {
				return ["private", "all"].includes(this.cptBelongType);
			},
			cptBelongType() {
				const { privateId, projectId, groupId } = this.$route.query;
				/* 有优先级和权重，顺序不可变 */
				if (privateId) return "private";
				if (projectId) return "project";
				if (groupId) return "group";
				return "all";
			},
			cptBelongId() {
				const { privateId, projectId, groupId } = this.$route.query;
				const variable_map = {
					private: privateId,
					project: projectId,
					group: groupId,
					all: "BELONG_ALL"
				};
				return variable_map[this.cptBelongType];
			}
		}
	});
}
</script>

<style lang="less">
#ViewUser {
	height: 100%;
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	&.is-show-header {
		flex-flow: column nowrap;
	}
}
</style>
