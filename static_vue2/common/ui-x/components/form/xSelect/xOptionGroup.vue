<template>
	<ul class="el-select-group__wrap" v-show="visible">
		<li class="el-select-group__title">{{ label }}</li>
		<li>
			<ul class="el-select-group">
				<slot></slot>
			</ul>
		</li>
	</ul>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "xOptionGroup",
		componentName: "xOptionGroup",
		props: {
			label: String,
			disabled: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				visible: true
			};
		},

		watch: {
			disabled(val) {
				this.broadcast("xOption", "handleGroupDisabled", val);
			}
		},

		methods: {
			queryChange() {
				this.visible =
					this.$children &&
					Array.isArray(this.$children) &&
					this.$children.some(option => option.visible === true);
			}
		},

		created() {
			this.$on("queryChange", this.queryChange);
		},

		mounted() {
			if (this.disabled) {
				this.broadcast("xOption", "handleGroupDisabled", this.disabled);
			}
		}
	});
}
</script>
