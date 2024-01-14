<script lang="ts">
export default async function () {}
</script>

<style lang="less">
@charset "utf-8";

:root[data-theme="tiny"] {
	--border-radius: 0;
	--border-radius--small: 0;
	--border-radius--mini: 0;

	.el-select__caret {
		&.el-input__icon {
			&.el-icon-arrow-up {
				color: var(--ui-base-color-5);
				&::before {
					content: "\e78f";
					// content: "\e790";
				}
			}
		}
	}
}
</style>
