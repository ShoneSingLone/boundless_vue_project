<template>
	<div class="el-collapse" role="tablist" aria-multiselectable="true">
		<slot></slot>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "xCollapse",
		componentName: "xCollapse",
		props: {
			accordion: Boolean,
			value: {
				type: [Array, String, Number],
				default() {
					return [];
				}
			}
		},

		data() {
			return {
				activeNames: [].concat(this.value)
			};
		},

		provide() {
			return {
				collapse: this
			};
		},

		watch: {
			value(value) {
				this.activeNames = [].concat(value);
			}
		},

		methods: {
			setActiveNames(activeNames) {
				activeNames = [].concat(activeNames);
				let value = this.accordion ? activeNames[0] : activeNames;
				this.activeNames = activeNames;
				this.$emit("input", value);
				this.$emit("change", value);
			},
			handleItemClick(item) {
				if (this.accordion) {
					this.setActiveNames(
						(this.activeNames[0] || this.activeNames[0] === 0) &&
							this.activeNames[0] === item.name
							? ""
							: item.name
					);
				} else {
					let activeNames = this.activeNames.slice(0);
					let index = activeNames.indexOf(item.name);

					if (index > -1) {
						activeNames.splice(index, 1);
					} else {
						activeNames.push(item.name);
					}
					this.setActiveNames(activeNames);
				}
			}
		},

		created() {
			this.$on("item-click", this.handleItemClick);
		}
	});
}
</script>
<style lang="less">
.el-collapse-item__arrow {
	-webkit-transition: -webkit-transform 0.3s;
}

.el-collapse {
	border-top: 1px solid var(--el-border-color-lighter);
	border-bottom: 1px solid var(--el-border-color-lighter);
}

.el-collapse-item.is-disabled .el-collapse-item__header {
	color: #bbb;
	cursor: not-allowed;
}

.el-collapse-item__header {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	height: 48px;
	line-height: 48px;
	background-color: #fff;
	color: var(--el-text-color-primary);
	cursor: pointer;
	border-bottom: 1px solid var(--el-border-color-lighter);
	font-size: 13px;
	font-weight: 500;
	-webkit-transition: border-bottom-color 0.3s;
	transition: border-bottom-color 0.3s;
	outline: 0;
}

.el-collapse-item__arrow {
	margin: 0 8px 0 auto;
	transition: -webkit-transform 0.3s;
	transition: transform 0.3s;
	transition:
		transform 0.3s,
		-webkit-transform 0.3s;
	font-weight: 300;
}

.el-collapse-item__arrow.is-active {
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
}

.el-collapse-item__header.focusing:focus:not(:hover) {
	color: var(--el-color-primary);
}

.el-collapse-item__header.is-active {
	border-bottom-color: transparent;
}

.el-collapse-item__wrap {
	will-change: height;
	background-color: #fff;
	overflow: hidden;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	border-bottom: 1px solid var(--el-border-color-lighter);
}

.el-collapse-item__content {
	padding-bottom: 25px;
	font-size: 13px;
	color: var(--el-text-color-primary);
	line-height: 1.769230769230769;
}

.el-collapse-item:last-child {
	margin-bottom: -1px;
}
</style>
