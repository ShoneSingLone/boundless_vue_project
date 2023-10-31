<template>
	<div class="recommend">
		<title-view
			:label="$t('home.recommend')"
			:btn="$t('home.seeAll')"></title-view>
		<div class="recommend-list">
			<div
				class="recommend-item"
				v-for="(item, index) in data"
				:key="index"
				@click="showBookDetail(item)">
				<div class="img-wrapper">
					<img class="img" :src="item.cover" />
				</div>
				<div class="content-wrapper">
					<div class="title title-medium" ref="title">{{ item.title }}</div>
					<div class="num sub-title" ref="num">
						{{ $t("home.readers").replace("$1", item.readers) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default async function () {
	const TitleView = await _.$importVue("./Title.vue");
	const { storeHomeMixin } = await _.$importVue("@/utils/mixin.vue");

	return {
		mixins: [storeHomeMixin],
		components: {
			TitleView
		},
		props: {
			data: Array
		}
	};
}
</script>
