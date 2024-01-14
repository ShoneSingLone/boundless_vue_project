<template></template>

<script lang="ts">
export default async function () {
	const Storage = await _.$importVue("/common/libs/WebStorageCache.vue");

	const localStorage = new Storage();

	function setLocalStorage(key, value) {
		return localStorage.set(key, value);
	}

	function getLocalStorage(key) {
		return localStorage.get(key);
	}

	function removeLocalStorage(key) {
		return localStorage.delete(key);
	}

	function clearLocalStorage() {
		return localStorage.clear();
	}

	function setBookObject(fileName, key, value) {
		let book = getLocalStorage(`${fileName}-info`);
		if (!book) {
			book = {};
		}
		book[key] = value;
		setLocalStorage(`${fileName}-info`, book);
	}

	function getBookObject(fileName, key) {
		let book = getLocalStorage(`${fileName}-info`);
		if (book) {
			return book[key];
		}
		return null;
	}

	function getFontFamily(fileName) {
		return getBookObject(fileName, "fontFamily");
	}

	function saveFontFamily(fileName, font) {
		setBookObject(fileName, "fontFamily", font);
	}

	function getFontSize(fileName) {
		return getBookObject(fileName, "fontSize");
	}

	function saveFontSize(fileName, fontSize) {
		setBookObject(fileName, "fontSize", fontSize);
	}
	function getLocation(fileName) {
		return getBookObject(fileName, "location");
	}
	function saveLocation(fileName, location) {
		setBookObject(fileName, "location", location);
	}
	function getReadTime(fileName) {
		return getBookObject(fileName, "readTime");
	}
	function saveReadTime(fileName, readTime) {
		setBookObject(fileName, "readTime", readTime);
	}

	function getBookmark(fileName) {
		return getBookObject(fileName, "bookmark");
	}
	function saveBookmark(fileName, bookmark) {
		setBookObject(fileName, "bookmark", bookmark);
	}

	function getLocale() {
		return getLocalStorage("locale");
	}

	function saveLocale(locale) {
		setLocalStorage("locale", locale);
	}

	function getTheme() {
		return getLocalStorage("theme");
	}

	function saveTheme(theme) {
		setLocalStorage("theme", theme);
	}

	function saveBookShelf(shelf) {
		return setLocalStorage("shelf", shelf);
	}
	function getBookShelf() {
		return getLocalStorage("shelf");
	}

	return {
		setLocalStorage,
		getLocalStorage,
		removeLocalStorage,
		clearLocalStorage,
		setBookObject,
		getBookObject,
		getFontFamily,
		saveFontFamily,
		getFontSize,
		saveFontSize,
		getLocation,
		saveLocation,
		getReadTime,
		saveReadTime,
		getBookmark,
		saveBookmark,
		getLocale,
		saveLocale,
		getTheme,
		saveTheme,
		saveBookShelf,
		getBookShelf
	};
}
</script>
