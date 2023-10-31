<template>
	<div class="cover-title-wrapper">
		<div class="cover-title-left-wrapper">
			<img class="cover-img" :src="cover" />
		</div>
		<div class="cover-title-right-wrapper">
			<div class="detail-cover-title-wrapper">
				<div class="cover-title-text">{{ title }}</div>
			</div>
			<div class="cover-author-wrapper">
				<div class="cover-author-text">{{ author }}</div>
			</div>
			<div class="detail-cover-description-wrapper">
				<div class="detail-cover-description-text">{{ desc }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default async function () {
	return {
		props: {
			cover: String,
			title: String,
			author: String,
			desc: String
		}
	};
}
</script>
