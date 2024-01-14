<style lang="less">
:root {
	--color-white: white;
}

.x-sider_wrapper {
	height: 100%;
	width: 300px;
	overflow: hidden;
	flex-flow: column nowrap;
	display: flex;
	transition: 0.1s ease;

	.resize_bar {
		&:hover {
			cursor: ew-resize;
		}
		position: absolute;
		top: 40px;
		bottom: 0;
		right: 0;
		width: var(--ui-one);
	}
}
.x-sider_wrapper_tree {
	height: 100px;
	flex: 1;
	padding: var(--ui-one);

	[role="treeitem"] {
		&.el-tree-node.treeitem-is-active {
			background-color: var(--ui-primary-light-7) !important;
			&:hover {
				background-color: var(--ui-primary-light-7) !important;
			}
		}
	}

	.el-tree-treenode {
		width: 100%;
		font-size: 14px;

		span {
			transition: 0.3s all ease-in-out;
		}

		span[title] {
			flex: 1;
		}

		.el-tree-node-content-wrapper {
			padding: 0;

			[data-interface-all-menu] {
				transform: translateX(-32px);
			}
		}
	}
}

.asideTreeItem {
	display: flex;
	flex: 1;
	width: 1px;
	// padding: var(--ui-one);
	align-items: center;
	&:hover {
		.node-icon-add {
			display: inline-block;
		}
	}

	.node-name {
		width: 1px;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	&.is-current {
		.node-icon-current {
			display: inline-block;
		}
	}
	.node-icon-current,
	.node-icon-add {
		display: none;
	}
}
</style>

<script lang="ts">
export default async function () {
	return {};
}
</script>
