<template>
	<div class="YapiProjectCard card-container el-card">
		<div class="project-card-wrapper">
			<div class="el-card__body x-padding">
				<xRender :render="logo" />
			</div>
			<xRender :render="title" />
		</div>
		<div class="card-btns">
			<xRender :render="copyIcon" class="mr10" />
			<xRender :render="followIcon" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		props: ["projectData", "isShow", "index"],
		data() {
			return {};
		},
		computed: {
			cptAvatarUrl() {
				return (
					this.imageUrl ||
					Vue._common_utils.appendToken(
						`${window._AJAX_URL_PREFIX || ""}/api/user/avatar?uid=${this.projectData._id}&usedBy=project`
					)
				);
			},
			followIcon() {
				return h(
					"div",
					{
						attrs: {
							title: this.followIconTitle
						},
						staticClass: "pointer icon-item-wrapper",
						onClick: this.followIconClickHandler
					},
					[h("xIcon", { icon: `_${this.followIconIcon}`, style: "color: #faad14" })]
				);
			},
			copyIcon() {
				if (this.isShow) {
					return h(
						"div",
						{
							staticClass: "pointer icon-copy icon-item-wrapper",
							onClick: this.openCopyProjectDialog
						},
						[h("xIcon", { icon: "_copy", style: "color: var(--ui-aide-text)" })]
					);
				}
				return null;
			},
			iconStyle() {
				return {
					fill: "white",
					width: "100px",
					height: "100px",
					"background-image": `url(${this.cptAvatarUrl})`,
					"background-position": "center center",
					"background-size": "50% 50%",
					"background-repeat": "no-repeat"
				};
			},
			isFollowStatus() {
				/* 处于follow页面全是已follow的 */
				return Boolean(this.projectData.follow);
			},
			followIconTitle() {
				return this.isFollowStatus ? "从我的关注取消" : "添加到我的关注";
			},
			followIconIcon() {
				return this.isFollowStatus ? "twrap_done" : "twrap_un";
			},
			followIconClickHandler() {
				return this.isFollowStatus ? this.unfollow : this.follow;
			},
			logo() {
				return h(
					"a",
					{
						attrs: {
							href: _.$aHashLink("/api/project", {
								projectId: this.projectData._id,
								groupId: this.$route.query.groupId
							})
						}
					},
					[hDiv({ class: "ui-logo", style: this.iconStyle })]
				);
			},
			title() {
				return hDiv({ staticClass: "ui-title flex middle center" }, [
					this.projectData.name || this.projectData.projectname
				]);
			}
		},
		methods: {
			async openCopyProjectDialog() {
				const vm = this;
				const addMember = await _.$importVue(
					"@/components/YapiProjectCard.CopyProject.vue",
					{
						parent: vm,
						projectData: vm.projectData,
						onOk() {
							vm.$emit("change");
						}
					}
				);
				_.$openWindow_deprecated(`复制项目${this.projectData.name}`, addMember);
			},
			follow: _.debounce(async function () {
				try {
					const { projectData } = this;
					const param = {
						projectid: projectData._id,
						projectname: projectData.name,
						icon: projectData.icon,
						color: projectData.color
					};
					await _api.yapi.projectAddFollow(param);
				} catch (error) {
					_.$msgError(error);
				} finally {
					this.$emit("change");
				}
			}, 300),
			unfollow: _.debounce(async function () {
				try {
					const id = this.projectData._id;
					await _api.yapi.projectDelFollow(id);
				} catch (error) {
					_.$msgError(error);
				} finally {
					this.$emit("change");
				}
			}, 300)
		}
	});
}
</script>
<style lang="less">
.YapiProjectCard {
	& + .YapiProjectCard {
		margin-left: var(--ui-one);
	}
	&.card-container {
		position: relative;
		user-select: none;
		transition: all 0.2s;
		padding: 10px;
		//margin-right: 20px;

		& + .card-container {
			//margin-right: 20px;
		}

		.project-card-wrapper,
		.card-btns {
			transform: translateY(0);
			transition: all 0.2s;
		}

		// 覆盖 card 组件 hover 状态的默认阴影样式
		.el-card:not(.el-card-no-hovering):hover {
			box-shadow: var(--el-box-shadow-light);
		}

		// 卡片右上角按钮
		.card-btns {
			background: var(--color-white);
			position: absolute;
			top: 0;
			right: -6px;
			border-radius: var(--border-radius);
			box-shadow: var(--el-box-shadow-light);
			padding: 10px;
			display: none;
		}

		&:hover {
			.card-btns {
				display: flex;
			}
		}
	}

	.pointer.icon-copy {
		&:hover {
			cursor: copy;
		}
	}

	.project-card-wrapper {
		position: relative;
		//padding: 10px;
		//outline: 1px solid red;

		.el-card {
			// margin: 10px;
			border-radius: var(--border-radius);
			//outline: 1px solid red;
		}

		.el-card__body {
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			align-items: center;
			background-color: transparent;
			transition: all 0.2s;
			border-radius: var(--border-radius);
			overflow: hidden;

			.ui-logo {
				border-radius: 50%;
				&:hover {
					box-shadow:
						0 6px 6px -3px #0003,
						0 10px 14px 1px #00000024,
						0 4px 18px 3px #0000001f !important;
					cursor: pointer;
				}
			}

			.ui-title {
				margin-top: 10px;
				font-size: 14px;
				font-weight: normal;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		&.el-card-hoverable {
			&:hover {
				cursor: unset;
			}
		}

		.project-card-wrapper-body {
			.icon {
				font-size: 0.8rem;
			}

			.name {
				font-size: 0.18rem;
				margin-top: 0.16rem;
			}
		}
	}
}
</style>
