<template></template>

<script lang="ts">
export default async function () {
	const VueRouter = await _.$importVue("/common/libs/VueRouter.vue");

	return new VueRouter({
		mode: "hash",
		base: window.BASE_URL,
		routes: [
			{
				path: "/",
				redirect: "/store"
			},
			{
				path: "/ebook",
				component: () => _.$importVue("@/views/ebook/index.vue"),
				children: [
					{
						path: ":fileName",
						component: () => _.$importVue("@/components/ebook/EbookReader.vue")
					}
				]
			},
			{
				path: "/store",
				component: () => _.$importVue("@/views/store/index.vue"),
				redirect: "/store/shelf",
				children: [
					{
						path: "shelf",
						component: () => _.$importVue("@/views/store/StoreShelf.vue")
					},
					{
						path: "category",
						component: () => _.$importVue("@/views/store/StoreCategory.vue")
					},
					{
						path: "home",
						component: () => _.$importVue("@/views/store/StoreHome.vue")
					},
					{
						path: "list",
						component: () => _.$importVue("@/views/store/StoreList.vue")
					},
					{
						path: "detail",
						component: () => _.$importVue("@/views/store/StoreDetail.vue")
					},
					{
						path: "speaking",
						component: () => _.$importVue("@/views/store/StoreSpeaking.vue")
					}
				]
			}
		]
	});
}
</script>
