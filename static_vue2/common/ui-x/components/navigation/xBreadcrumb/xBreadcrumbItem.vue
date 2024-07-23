<template>
	<span class="el-breadcrumb__item" v-on="$listeners">
		<span :class="['el-breadcrumb__inner', to ? 'is-link' : '']" ref="link" role="link">
			<slot></slot>
		</span>
		<i v-if="separatorClass" class="el-breadcrumb__separator" :class="separatorClass"></i>
		<span v-else class="el-breadcrumb__separator" role="presentation">{{ separator }}</span>
	</span>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "ElBreadcrumbItem",
		props: {
			to: {},
			replace: Boolean
		},
		data() {
			return {
				separator: "",
				separatorClass: ""
			};
		},
		inject: ["xBreadcrumb"],
		mounted() {
			this.separator = this.xBreadcrumb.separator;
			this.separatorClass = this.xBreadcrumb.separatorClass;
			const link = this.$refs.link;
			link.setAttribute("role", "link");
			link.addEventListener("click", _ => {
				const { to, $router } = this;
				if (!to || !$router) return;
				this.replace ? $router.replace(to) : $router.push(to);
			});
		}
	});
}
</script>
<style lang="less"></style>
