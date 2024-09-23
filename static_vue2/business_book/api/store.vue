<template></template>

<script lang="ts">
export default async function () {
	const axios = function ({ url, method, params, data }) {
		return _.$ajax[method](url, { params, data });
	};
	const { setLocalForage } = await _.$importVue("@/utils/localForage.vue");

	function flatList() {
		return axios({
			method: "get",
			url: `${window.VUE_APP_BOOK_URL}/book/flat-list`
		});
	}

	function shelf() {
		return axios({
			method: "get",
			url: `${window.VUE_APP_BASE_URL}/book/shelf`
		});
	}

	function home() {
		return axios({
			method: "get",
			url: `${window.VUE_APP_BASE_URL}/book/home`
		});
	}

	function detail(book) {
		return axios({
			method: "get",
			url: `${window.VUE_APP_BOOK_URL}/book/detail`,
			params: {
				fileName: book.fileName
			}
		});
	}

	function list() {
		return axios({
			method: "get",
			url: `${window.VUE_APP_BASE_URL}/book/list`
		});
	}

	function download(book, onSucess, onError, onProgress) {
		if (onProgress == null) {
			onProgress = onError;
			onError = null;
		}
		return axios
			.create({
				baseURL: window.VUE_APP_EPUB_URL,
				method: "get",
				responseType: "blob",
				timeout: 180 * 1000,
				onDownloadProgress: progressEvent => {
					if (onProgress) onProgress(progressEvent);
				}
			})
			.get(`${book.categoryText}/${book.fileName}.epub`)
			.then(res => {
				const blob = new Blob([res.data]);
				setLocalForage(
					book.fileName,
					blob,
					() => onSucess(book),
					err => onError(err)
				);
			})
			.catch(err => {
				if (onError) onError(err);
			});
	}

	return {
		flatList,
		shelf,
		home,
		detail,
		list,
		download
	};
}
</script>
