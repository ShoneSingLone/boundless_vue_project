<style lang="less"></style>
<template>
	<transition-group name="fade-transform" mode="out-in">
		<InnerLink
			v-for="(item, index) in cptIframeViews"
			:key="item.path"
			:iframeId="iframeId(index)"
			v-show="$route.path === item.path"
			:src="iframeUrl(item)" />
	</transition-group>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		data() {
			return {};
		},
		computed: {
			cptIframeViews() {
				return this.APP.tagsView.state.iframeViews;
			}
		},
		methods: {
			iframeId(index) {
				return "iframe" + index;
			},
			iframeUrl(item) {
				debugger;
				const url = item.meta.link;
				const query = item.query;
				const params = _.map(query, (value, key) => {
					return `${key}=${value}`;
				}).join("$");
				debugger;
				if (params.length > 2) {
					return url + "?" + params;
				}
				return url;
			}
		}
	});
}
</script>
