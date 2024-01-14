<template></template>

<script lang="ts">
export default async function () {
	const Vuex = await _.$importVue("/common/libs/Vuex.vue");
	const book = await _.$importVue("@/store/modules/book.vue");
	const store = await _.$importVue("@/store/modules/store.vue");
	const getters = await _.$importVue("@/store/getters.vue");
	const actions = await _.$importVue("@/store/actions.vue");

	return new Vuex.Store({
		modules: {
			book,
			store
		},
		getters,
		actions
	});
}
</script>
