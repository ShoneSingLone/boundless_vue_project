<template>
	<section id="ViewNote" :class="cptNoteClass">
		<AppHeader v-if="cptIsShowAppHeaderComponent" />
		<div v-if="APP.isMobile" class="flex1-overflow-auto flex vertical">
			<xAdvancedSearch
				mountTo="#MobileMenu"
				v-model="isCollapse"
				:label="false"
				:mountProps="cptMountProps"
				:style="cptToggleStyle">
				<xGap t />
				<ImAside class="width100 flex1 height100" />
			</xAdvancedSearch>
			<div id="MobileMenu"></div>
			<ImSection style="width: 100%; height: 1px" v-show="isCollapse" />
		</div>
		<div v-else class="flex1-overflow-auto flex">
			<ImAside v-show="!isShowEditor" />
			<ImSection />
		</div>
	</section>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			AppHeader: () => _.$importVue("@/views/Api/Header/ApiHeader.vue"),
			ImAside: () => _.$importVue("@/views/im/ImAside.vue"),
			ImSection: () => _.$importVue("@/views/im/ImSection.vue")
		},
		async mounted() {
			(() => {
				const TITLE_MAP = {
					private: "个人可见",
					all: "所有人可见"
				};
				const title = TITLE_MAP[this.cptBelongType];
				title && (document.title = `联系人-${title}`);
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
#ViewNote {
	height: 100%;
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	&.is-show-header {
		flex-flow: column nowrap;
	}
}
</style>
