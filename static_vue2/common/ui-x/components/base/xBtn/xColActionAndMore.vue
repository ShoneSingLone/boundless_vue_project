<template>
	<div class="xColActionAndMore" ref="xColActionAndMore">
		<xBtn :preset="preset" v-for="(btnConfigs, index) in btnArray" :key="index" :configs="btnConfigs" />
		<xDropdown v-if="isShowMoreBtn" trigger="click" @visible-change="handleVisibleChange">
			<xBtn :preset="preset"> {{ i18n("更多") }}<i class="el-icon-arrow-down el-icon--right"></i> </xBtn>
			<xDropdownMenu slot="dropdown" ref="ElDropdownMenu">
				<div class="xColActionAndMore-dropdown flex vertical start middle" ref="xColActionAndMoreDropdown">
					<xBtn :preset="preset" v-for="(btnConfigs, index) in btnArrayMore" :key="index" :configs="btnConfigs" />
				</div>
			</xDropdownMenu>
		</xDropdown>
	</div>
</template>

<script lang="ts">
export default async function () {
	/* 有更多选项的 按钮组 */
	const DID_NOT_SET_COL = "DID_NOT_SET_COL";
	return {
		props: {
			preset: {
				type: String,
				default: "text"
			},
			col: {
				type: [Number, String],
				default: DID_NOT_SET_COL
			},
			children: {
				type: Array,
				default() {
					return [];
				}
			}
		},
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
			cptCol() {
				if (_.isNumber(this.col) && this.col > 2) {
					return this.col;
				} else {
					return DID_NOT_SET_COL;
				}
			},
			btnArrayAll() {
				const _btnArray = _.filter(this.children, btnConfigs => {
					if (btnConfigs.isHide !== undefined) {
						if (_.isBoolean(btnConfigs.isHide)) {
							return !btnConfigs.isHide;
						}
						if (_.isFunction(btnConfigs.isHide)) {
							return !btnConfigs.isHide();
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
					const $el = $(this.$refs.xColActionAndMoreDropdown).parent();
					$el.addClass("xColActionAndMoreDropdown");
				}
			},
			setBtnInfo() {
				if (this.cptCol === DID_NOT_SET_COL) {
					this.btnArray = this.btnArrayAll;
					return;
				}

				const btnArrayAll = _.cloneDeep(this.btnArrayAll);
				if (this.cptCol > 1) {
					if (btnArrayAll.length > this.cptCol) {
						this.btnArray = btnArrayAll.splice(0, this.cptCol - 1);
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
.xColActionAndMore {
	margin: unset;
	display: flex;

	> * {
		margin-left: 8px;
	}

	> *:first-child {
		margin-left: 0;
	}
}

.xColActionAndMore-dropdown {
	padding: 10px;
	.el-button + .el-button {
		margin-left: 0;
	}
}

.xColActionAndMoreDropdown {
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
