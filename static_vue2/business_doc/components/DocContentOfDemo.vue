<style lang="less">
.el-DocContentOfDemo {
	&-left {
		position: relative;
		display: flex;
		flex-flow: column nowrap;
		flex: 1;
		width: 1px;

		.markdown-wrapper {
			margin-bottom: var(--ui-one);
		}
	}
}
</style>
<template>
	<div class="flex">
		<div :class="ns.b('left')">
			<slot> </slot>
		</div>
		<xAffix :offset="100">
			<xCard :style="xCardStyle" v-xloading="isLoading">
				<ul>
					<li
						v-for="(item, index) in contents"
						:key="index"
						class="mb pointer"
						@click="scrollTo(item)">
						<xTag>
							{{ item[0] }}
						</xTag>
					</li>
				</ul>
			</xCard>
		</xAffix>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		setup(props) {
			return {
				ns: _xUtils.useNamespace("DocContentOfDemo"),
				xCardStyle: `min-width: 200px;
margin: var(--ui-one);
max-height:calc(100vh - 200px);
overflow:auto;`
			};
		},
		data() {
			const vm = this;
			vm.handleUpdate = _.debounce(() => {
				const contents = _.map($(vm.$el).find("[data-path]"), el => {
					return [$(el).text(), el];
				});

				const api = _.map($(vm.$el).find("[data-role=api]"), el => {
					return ["API", el];
				});
				vm.contents = contents.concat(api);
			}, 200);
			return {
				isLoading: true,
				contents: []
			};
		},
		mounted() {
			this.handleUpdate();
			setTimeout(() => {
				this.isLoading = false;
			}, 1000);

			this.$watch(
				() => {
					return [this.$route.query?.scrollTo, this.contents];
				},
				_.debounce(([itemName]) => {
					try {
						itemName = decodeURI(itemName);
						const item = _.find(this.contents, i => _.trim(i[0]) === itemName);
						item[1].scrollIntoView({ behavior: "smooth", block: "center" });
					} catch (error) {}
				}, 300),
				{ immediate: true }
			);
		},
		methods: {
			scrollTo(item) {
				this.$router.push({
					path: this.$route.path,
					query: {
						...this.$route.query,
						scrollTo: encodeURI(_.trim(item[0]))
					}
				});
			}
		}
	});
}
</script>
