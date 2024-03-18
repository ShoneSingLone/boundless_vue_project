<template>
	<header class="AppLayoutHeader flex middle">
		<span class="flex middle YapiLogo">
			<xIcon :icon="icon" :style="logoStyle" />
		</span>
		<YapiBreadcrumbNavigation />

		<xGap f />
		<a class="flex middle" :href="i18nHref" target="_blank">
			<xIcon icon="_icon_i18n" />
		</a>
		<xGap r="4" />
		<a class="flex middle" :href="publicNoteHref" target="_blank">
			<xIcon icon="_wikidoc" />
		</a>
		<xGap f />
		<YapiToolUserBar />
	</header>
</template>

<script lang="ts">
export default async function () {
	return {
		inject: ["APP"],
		name: "AppLayoutHeader",
		components: {
			YapiToolUserBar: () => _.$importVue("@/components/YapiToolUserBar.vue"),
			YapiBreadcrumbNavigation: () => _.$importVue("@/components/YapiBreadcrumbNavigation.vue")
		},
		methods: {
			handleCommand(value) {
				if (localStorage["X-Language"] !== value) {
					localStorage["X-Language"] = value;
					window.location.reload();
				}
			}
		},
		data() {
			return {
				value1: "",
				languageOptions: [
					{
						label: "中文",
						value: "zh-CN"
					},
					{
						label: "English",
						value: "en-US"
					}
				],
				language: localStorage["X-Language"] || "zh-CN"
			};
		},
		computed: {
			i18nHref() {
				return _.$aHashLink("/i18n", {});
			},
			publicNoteHref() {
				return _.$aHashLink("/note", {});
			},
			icon() {
				if (["/api/group", "/wiki", "/xI"].includes(this.$route.path)) {
					return "_yapi_logo";
				}
				return "_yapi_logo";
			},
			logoStyle() {
				return { width: "48px", height: "48px" };
			},
			languageLabel() {
				return _.find(this.languageOptions, {
					value: this.language
				}).label;
			}
		},
		methods: {
			goToGroup() {
				this.$router.push("/api/group");
			}
		},
		mounted() {
			localStorage["X-Language"] = this.language;
		}
	};
}
</script>

<style lang="less">
.AppLayoutHeader {
	display: flex;
	align-items: center;
	height: 64px;
	padding-left: 20px;
	line-height: 44px;
	background-color: var(--el-color-white);
	box-shadow: var(--el-box-shadow-lighter);
	z-index: 1;
	.YapiLogo {
		box-shadow: var(--el-box-shadow-lighter);
		// border: 1px solid gray;
		border-radius: 50%;
		margin-right: var(--ui-one);
	}
}
</style>
