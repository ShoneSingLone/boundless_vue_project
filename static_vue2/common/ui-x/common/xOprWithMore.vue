<template>
	<div class="xOprWithMore" ref="xOprWithMore">
		<xBtn preset="text" v-for="(btn, index) in btnArray" :key="index" :data-title="btn | btnLabel(configs)" :disabled="btn | isDisabled(configs)" @click="handleClick(btn)">
			<xRender :render="btn.label" :payload="configs" />
		</xBtn>
		<xDropdown v-if="isShowMoreBtn" trigger="click" @visible-change="handleVisibleChange">
			<xBtn type="text">
				{{ i18n("更多") }}
			</xBtn>
			<xDropdownMenu slot="dropdown" ref="ElDropdownMenu">
				<div class="xOprWithMore-dropdown flex vertical center middle" ref="xOprWithMoreDropdown">
					<xBtn preset="text" v-for="(btn, index) in btnArrayMore" :key="index" :data-title="btn | btnLabel(configs)" :disabled="btn | isDisabled(configs)" @click="handleClick(btn)">
						<xRender :render="btn.label" />
					</xBtn>
				</div>
			</xDropdownMenu>
		</xDropdown>
	</div>
</template>

<script>
export default async function () {
	/* 有更多选项的 按钮组 */
	const DID_NOT_SET_COL = "DID_NOT_SET_COL";
	return {
		props: ["configs"],
		/* row index col prop COL_ACTIONS */
		data() {
			return {
				btnArray: [],
				isShowMoreBtn: false,
				btnArrayMore: []
			};
		},
		watch: {
			btnArrayAll: {
				immediate: true,
				handler() {
					this.setBtnInfo();
				}
			}
		},
		computed: {
			colspan() {
				if (_.isNumber(this.configs?.col?.colspan) && this.configs?.col?.colspan > 2) {
					return this.configs?.col?.colspan;
				} else {
					return DID_NOT_SET_COL;
				}
			},
			row() {
				/* 如果不是在列表中使用 ，row可以直接写在 标签上*/
				return this.$attrs.row || this.configs.row || {};
			},
			btnArrayAll() {
				const _btnArray = _.filter(this.configs?.col?.btnList, btnConfigs => {
					if (btnConfigs.isHide !== undefined) {
						if (_.isBoolean(btnConfigs.isHide)) {
							return !btnConfigs.isHide;
						}
						if (_.isFunction(btnConfigs.isHide)) {
							return !btnConfigs.isHide({
								row: this.row,
								configs: btnConfigs
							});
						}

						return false;
					}
					return true;
				});
				return _btnArray;
			}
		},
		filters: {
			isDisabled(btnColInfo, configs) {
				let isDisabled = false;
				if (_.isFunction(btnColInfo.disabled)) {
					isDisabled = btnColInfo.disabled(configs);
				} else if (_.isBoolean(btnColInfo.disabled)) {
					isDisabled = btnColInfo.disabled;
				}
				return isDisabled;
			},
			btnLabel(btnColInfo, configs) {
				let btnLabel = btnColInfo.label;
				if (_.isFunction(btnColInfo.tips)) {
					btnLabel = btnColInfo.tips(configs);
				} else if (_.isString(btnColInfo.tips)) {
					btnLabel = btnColInfo.tips;
				}
				return btnLabel;
			}
		},
		methods: {
			handleVisibleChange(isVisible) {
				if (isVisible) {
					const $el = $(this.$refs.xOprWithMoreDropdown).parent();
					$el.addClass("xOprWithMoreDropdown");
				}
			},
			setBtnInfo() {
				if (this.colspan === DID_NOT_SET_COL) {
					this.btnArray = this.btnArrayAll;
					return;
				}

				const btnArrayAll = _.cloneDeep(this.btnArrayAll);
				if (this.colspan > 1) {
					if (btnArrayAll.length > this.colspan) {
						this.btnArray = btnArrayAll.splice(0, this.colspan - 1);
						this.btnArrayMore = btnArrayAll;
						this.isShowMoreBtn = true;
					} else {
						this.btnArray = btnArrayAll;
						this.btnArrayMore = [];
						this.isShowMoreBtn = false;
					}
				}
			},
			handleClick(currentBtnConfigs) {
				if (currentBtnConfigs.onClick) {
					currentBtnConfigs.onClick(this.configs);
				}
				/* dropdown 折叠 */
				if (this.$refs?.ElDropdownMenu?.showPopper) {
					this.$refs.ElDropdownMenu.showPopper = false;
				}
			}
		}
	};
}
</script>

<style lang="less">
.xOprWithMore {
	margin: unset;
	display: flex;

	> * {
		margin-left: 8px;
	}

	> *:first-child {
		margin-left: 0;
	}
}

.xOprWithMore-dropdown {
	padding: 10px;
}

.xOprWithMoreDropdown {
	padding: 0;
	border: 1px solid var(--ui-brand);
	margin-top: 0;

	.vertical {
		.xBtn + .xBtn {
			margin-top: 0;
		}
	}

	.popper__arrow {
		display: none;
	}
}
</style>
