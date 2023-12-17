<template>
	<div class="YapiProjectCard card-container">
		<div class="project-card-wrapper">
			<div class="el-card is-always-shadow">
				<div class="el-card__body">
					<xRender :render="logo" />
					<xRender :render="title" />
				</div>
			</div>
		</div>
		<div class="card-btns">
			<xRender :render="copyIcon" class="mr10" />
			<xRender :render="followIcon" />
		</div>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		props: ["projectData", "isShow", "index", "projectData", "callbackResult"],
		data() {
			return {};
		},
		computed: {
			followIcon() {
				return h(
					"div",
					{
						staticClass: "pointer icon-item-wrapper",
						onClick: this.followIconClickHandler
					},
					[h("xIcon", { icon: `_${this.followIconIcon}`, style: "fill: #faad14" })]
				);
			},
			copyIcon() {
				if (this.isShow) {
					return h(
						"div",
						{
							staticClass: "pointer icon-copy icon-item-wrapper",
							onClick: this.showCopyProjectDialog
						},
						[h("xIcon", { icon: "_copy", style: "fill: #232426" })]
					);
				}
				return null;
			},
			iconStyle() {
				return {
					fill: "white",
					width: "48px",
					height: "48px",
					borderRadius: "var(--baorder-radius,10px)",
					backgroundColor: this.projectData.color
				};
			},
			isFollowStatus() {
				/* 处于follow页面全是已follow的 */
				return Boolean(this.projectData.follow || this.inFollowPage);
			},
			followIconTitle() {
				return this.isFollowStatus ? "取消关注" : "添加关注";
			},
			followIconIcon() {
				return this.isFollowStatus ? "follow" : "unfollow";
			},
			followIconClickHandler() {
				return this.isFollowStatus ? this.del : this.add;
			},
			logo() {
				return h(
					"a",
					{
						href: _.$aHashLink("/project", {
							project_id: this.projectData._id,
							group_id: this.$route.query.groupId
						})
					},
					[h("xIcon", { class: "ui-logo", icon: `_${this.projectData.icon}`, style: this.iconStyle })]
				);
			},
			title() {
				return h("div", { class: "ui-title" }, [this.projectData.name || this.projectData.projectname]);
			}
		},
		methods: {
			showCopyProjectDialog() {
				_.dialog({
					title: `复制项目${this.projectData.name}`,
					component: ViewCopyProject,
					copyProject: this.copyProject,
					projectName: this.projectData.name
				});
			},
			async copyProject({ newProjectName, icon }) {
				const id = this.projectData._id;
				let { data } = await API.project.getProjectById(id);
				data = _.merge(data, { icon }, { name: newProjectName }, { preName: data.name });
				await API.project.copyProjectMsg(data);
				_.message.success("项目复制成功");
				this.callbackResult();
			},
			add: _.debounce(async function () {
				try {
					const { projectData } = this;
					const uid = this.APP.user.uid;
					const param = {
						uid,
						projectid: projectData._id,
						projectname: projectData.name,
						icon: projectData.icon,
						color: projectData.color
					};
					await API.project.addFollow(param);
				} catch (error) {
					console.error(error);
				} finally {
					this.callbackResult();
				}
			}, 300),
			del: _.debounce(async function () {
				try {
					const id = this.projectData.projectid || this.projectData._id;
					await API.project.delFollow(id);
				} catch (error) {
					console.error(error);
				} finally {
					this.callbackResult();
				}
			}, 300)
		}
	});
}
</script>
<style lang="less">
.YapiProjectCard {
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
			padding-top: 0.24rem + 0.16rem + 1rem;
			transition: all 0.2s;
			border-radius: var(--border-radius);
			overflow: hidden;

			.ui-logo {
				padding: 16px;
				color: #fff;
				font-size: 96px;
				background-color: var(--app-brand);
				line-height: 1rem;

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
