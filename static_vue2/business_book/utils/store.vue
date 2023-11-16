<template></template>

<script>
export default async function () {
	const { getLocalStorage, getBookShelf, saveBookShelf } = await _.$importVue("@/utils/localStorage.vue");

	function addToShelf(book) {
		let shelfList = getBookShelf();
		shelfList = removeAddFromShelf(shelfList);
		book.type = 1;
		shelfList.push(book);
		shelfList = computeId(shelfList);
		shelfList = appendAddToShelf(shelfList);
		saveBookShelf(shelfList);
	}

	function removeFromBookShelf(book) {
		return getBookShelf().filter(item => {
			if (item.itemList) {
				item.itemList = removeAddFromShelf(item.itemList);
			}
			return item.fileName !== book.fileName;
		});
	}

	function flatBookList(bookList) {
		if (bookList) {
			let orgBookList = bookList.filter(item => {
				return item.type !== 3;
			});
			const categoryList = bookList.filter(item => {
				return item.type === 2;
			});
			categoryList.forEach(item => {
				const index = orgBookList.findIndex(v => {
					return v.id === item.id;
				});
				if (item.itemList) {
					item.itemList.forEach(subItem => {
						orgBookList.splice(index, 0, subItem);
					});
				}
			});
			orgBookList.forEach((item, index) => {
				item.id = index + 1;
			});
			orgBookList = orgBookList.filter(item => item.type !== 2);
			return orgBookList;
		} else {
			return [];
		}
	}

	function findBook(fileName) {
		const bookList = getLocalStorage("shelf");
		return flatBookList(bookList).find(item => item.fileName === fileName);
	}

	function computeId(list) {
		return list.map((book, index) => {
			if (book.type !== 3) {
				book.id = index + 1;
				if (book.itemList) {
					book.itemList = computeId(book.itemList);
				}
			}
			return book;
		});
	}

	function gotoBookDetail(vue, book) {
		vue.$router.push({
			path: "/store/detail",
			query: {
				fileName: book.fileName,
				category: book.categoryText
			}
		});
	}

	function gotoStoreHome(vue) {
		vue.$router.push({
			path: "/store/home"
		});
	}

	function appendAddToShelf(list) {
		list.push({
			id: -1,
			type: 3
		});
		return list;
	}

	function removeAddFromShelf(list) {
		return list.filter(item => item.type !== 3);
	}

	const flapCardList = [
		{
			r: 255,
			g: 102,
			_g: 102,
			b: 159,
			imgLeft: "url(" + "/@/assets/images/gift-left.png" + ")",
			imgRight: "url(" + "/@/assets/images/gift-right.png" + ")",
			backgroundSize: "50% 50%",
			zIndex: 100,
			rotateDegree: 0
		},
		{
			r: 74,
			g: 171,
			_g: 171,
			b: 255,
			imgLeft: "url(" + "/@/assets/images/compass-left.png" + ")",
			imgRight: "url(" + "/@/assets/images/compass-right.png" + ")",
			backgroundSize: "50% 50%",
			zIndex: 99,
			rotateDegree: 0
		},
		{
			r: 255,
			g: 198,
			_g: 198,
			b: 102,
			imgLeft: "url(" + "/@/assets/images/star-left.png" + ")",
			imgRight: "url(" + "/@/assets/images/star-right.png" + ")",
			backgroundSize: "50% 50%",
			zIndex: 98,
			rotateDegree: 0
		},
		{
			r: 255,
			g: 102,
			_g: 102,
			b: 159,
			imgLeft: "url(" + "/@/assets/images/heart-left.png" + ")",
			imgRight: "url(" + "/@/assets/images/heart-right.png" + ")",
			backgroundSize: "50% 50%",
			zIndex: 97,
			rotateDegree: 0
		},
		{
			r: 59,
			g: 201,
			_g: 201,
			b: 22,
			imgLeft: "url(" + "/@/assets/images/crown-left.png" + ")",
			imgRight: "url(" + "/@/assets/images/crown-right.png" + ")",
			backgroundSize: "50% 50%",
			zIndex: 96,
			rotateDegree: 0
		}
	];

	const categoryList = {
		ComputerScience: 1,
		SocialSciences: 2,
		Economics: 3,
		Education: 4,
		Engineering: 5,
		Environment: 6,
		Geography: 7,
		History: 8,
		Laws: 9,
		LifeSciences: 10,
		Literature: 11,
		Biomedicine: 12,
		BusinessandManagement: 13,
		EarthSciences: 14,
		MaterialsScience: 15,
		Mathematics: 16,
		MedicineAndPublicHealth: 17,
		Philosophy: 18,
		Physics: 19,
		PoliticalScienceAndInternationalRelations: 20,
		Psychology: 21,
		Statistics: 22
	};

	function getCategoryName(id) {
		switch (id) {
			case 1:
				return "ComputerScience";
			case 2:
				return "SocialSciences";
			case 3:
				return "Economics";
			case 4:
				return "Education";
			case 5:
				return "Engineering";
			case 6:
				return "Environment";
			case 7:
				return "Geography";
			case 8:
				return "History";
			case 9:
				return "Laws";
			case 10:
				return "LifeSciences";
			case 11:
				return "Literature";
			case 12:
				return "Biomedicine";
			case 13:
				return "BusinessandManagement";
			case 14:
				return "EarthSciences";
			case 15:
				return "MaterialsScience";
			case 16:
				return "Mathematics";
			case 17:
				return "MedicineAndPublicHealth";
			case 18:
				return "Philosophy";
			case 19:
				return "Physics";
			case 20:
				return "PoliticalScienceAndInternationalRelations";
			case 21:
				return "Psychology";
			case 22:
				return "Statistics";
		}
	}

	function categoryText(category, vue) {
		switch (category) {
			case 1:
				return i18n("category.computerScience");
			case 2:
				return i18n("category.socialSciences");
			case 3:
				return i18n("category.economics");
			case 4:
				return i18n("category.education");
			case 5:
				return i18n("category.engineering");
			case 6:
				return i18n("category.environment");
			case 7:
				return i18n("category.geography");
			case 8:
				return i18n("category.history");
			case 9:
				return i18n("category.laws");
			case 10:
				return i18n("category.lifeSciences");
			case 11:
				return i18n("category.literature");
			case 12:
				return i18n("category.biomedicine");
			case 13:
				return i18n("category.businessandManagement");
			case 14:
				return i18n("category.earthSciences");
			case 15:
				return i18n("category.materialsScience");
			case 16:
				return i18n("category.mathematics");
			case 17:
				return i18n("category.medicineAndPublicHealth");
			case 18:
				return i18n("category.philosophy");
			case 19:
				return i18n("category.physics");
			case 20:
				return i18n("category.politicalScienceAndInternationalRelations");
			case 21:
				return i18n("category.psychology");
			case 22:
				return i18n("category.statistics");
		}
	}

	return {
		addToShelf,
		removeFromBookShelf,
		flatBookList,
		findBook,
		computeId,
		gotoBookDetail,
		gotoStoreHome,
		appendAddToShelf,
		removeAddFromShelf,
		flapCardList,
		categoryList,
		getCategoryName,
		categoryText
	};
}
</script>
