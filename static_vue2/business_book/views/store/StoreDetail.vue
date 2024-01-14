<template>
	<div class="book-detail">
		<detail-title @back="back" :showShelf="true" ref="title"></detail-title>
		<scroll class="content-wrapper" :top="42" :bottom="52" @onScroll="onScroll" ref="scroll">
			<book-info :cover="cover" :title="title" :author="author" :desc="desc"></book-info>
			<div class="book-detail-content-wrapper">
				<div class="book-detail-content-title">
					{{ $t("detail.copyright") }}
				</div>
				<div class="book-detail-content-list-wrapper">
					<div class="book-detail-content-row">
						<div class="book-detail-content-label">
							{{ $t("detail.publisher") }}
						</div>
						<div class="book-detail-content-text">{{ publisher }}</div>
					</div>
					<div class="book-detail-content-row">
						<div class="book-detail-content-label">
							{{ $t("detail.category") }}
						</div>
						<div class="book-detail-content-text">{{ categoryText }}</div>
					</div>
					<div class="book-detail-content-row">
						<div class="book-detail-content-label">{{ $t("detail.lang") }}</div>
						<div class="book-detail-content-text">{{ lang }}</div>
					</div>
					<div class="book-detail-content-row">
						<div class="book-detail-content-label">{{ $t("detail.ISBN") }}</div>
						<div class="book-detail-content-text">{{ isbn }}</div>
					</div>
				</div>
			</div>
			<div class="book-detail-content-wrapper">
				<div class="book-detail-content-title">
					{{ $t("detail.navigation") }}
				</div>
				<div class="book-detail-content-list-wrapper">
					<div class="loading-text-wrapper" v-if="!this.navigation">
						<span class="loading-text">{{ $t("detail.loading") }}</span>
					</div>
					<div class="book-detail-content-item-wrapper">
						<div class="book-detail-content-item" v-for="(item, index) in flatNavigation" :key="index" @click="read(item)">
							<div class="book-detail-content-navigation-text" :class="{ 'is-sub': item.deep > 1 }" :style="itemStyle(item)" v-if="item.label">
								{{ item.label }}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="book-detail-content-wrapper">
				<div class="book-detail-content-title">{{ $t("detail.trial") }}</div>
				<div class="book-detail-content-list-wrapper">
					<div class="loading-text-wrapper" v-if="!this.displayed">
						<span class="loading-text">{{ $t("detail.loading") }}</span>
					</div>
				</div>
				<div id="preview" v-show="this.displayed" ref="preview"></div>
			</div>
		</scroll>
		<div class="bottom-wrapper">
			<div class="bottom-btn" @click.stop.prevent="readBook()">
				{{ $t("detail.read") }}
			</div>
			<div class="bottom-btn" @click.stop.prevent="trialListening()">
				{{ $t("detail.listen") }}
			</div>
			<div class="bottom-btn" @click.stop.prevent="addOrRemoveShelf()">
				<span class="icon-check" v-if="inBookShelf"></span>
				{{ inBookShelf ? $t("detail.isAddedToShelf") : $t("detail.addOrRemoveShelf") }}
			</div>
		</div>
		<toast :text="toastText" ref="toast"></toast>
	</div>
</template>

<script lang="ts">
            export default async function () {





import { storeShelfMixin } from '@/utils/mixin.vue';
import DetailTitle from '../../components/detail/DetaiTitle';
import BookInfo from '../../components/detail/BookInfo';
import Scroll from '../../components/common/Scroll';
import Toast from '../../components/common/Toast';
import { detail } from '../../api/store';
import { px2rem, realPx } from '@/utils/utils.vue';
import Epub from 'epubjs';
import { getLocalForage } from '../../utils/localForage';
import { removeFromBookShelf, addToShelf } from '../../utils/store';
import { saveBookShelf, getBookShelf } from '../../utils/localStorage';

global.ePub = Epub;

return {
  components: {
    DetailTitle,
    Scroll,
    BookInfo,
    Toast
  },
  mixins: [storeShelfMixin],
  computed: {
    desc() {
      if (this.description) {
        return this.description.substring(0, 100);
      } else {
        return '';
      }
    },
    flatNavigation() {
      if (this.navigation) {
        return Array.prototype.concat.apply([], Array.prototype.concat.apply([], this.doFlatNavigation(this.navigation.toc)));
      } else {
        return [];
      }
    },
    lang() {
      return this.metadata ? this.metadata.language : '-';
    },
    isbn() {
      return this.metadata ? this.metadata.identifier : '-';
    },
    publisher() {
      return this.metadata ? this.metadata.publisher : '-';
    },
    title() {
      return this.metadata ? this.metadata.title : '';
    },
    author() {
      return this.metadata ? this.metadata.creator : '';
    },
    inBookShelf() {
      if (this.bookItem && this.shelfList) {
        // 定义一个自执行函数，将书架转为一维数组结构，并且只保留type为1的数据（type=1的为电子书）
        const flatShelf = (function flatten(arr) {
          return [].concat(...arr.map(v => v.itemList ? [v, ...flatten(v.itemList)] : v));
        })(this.shelfList).filter(item => item.type === 1);
        // 查找当前电子书是否存在于书架
        const book = flatShelf.filter(item => item.fileName === this.bookItem.fileName);
        return book && book.length > 0;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      bookItem: null,
      book: null,
      metadata: null,
      trialRead: null,
      cover: null,
      navigation: null,
      displayed: false,
      audio: null,
      randomLocation: null,
      description: null,
      toastText: '',
      trialText: null,
      categoryText: null,
      opf: null
    };
  },
  methods: {
    addOrRemoveShelf() {
      // 如果电子书存在于书架，则从书架中移除电子书
      if (this.inBookShelf) {
        this.setShelfList(removeFromBookShelf(this.bookItem))
          .then(() => {
            // 将书架数据保存到LocalStorage
            saveBookShelf(this.shelfList);
          });
      } else {
        // 如果电子书不存在于书架，则添加电子书到书架
        addToShelf(this.bookItem);
        this.setShelfList(getBookShelf());
      }
    },
    showToast(text) {
      this.toastText = text;
      this.$refs.toast.show();
    },
    readBook() {
      this.$router.push({
        path: `/ebook/${this.bookItem.categoryText}|${this.fileName}`
      });
    },
    trialListening() {
      getLocalForage(this.bookItem.fileName, (err, blob) => {
        if (!err && blob && blob instanceof Blob) {
          this.$router.push({
            path: "/store/speaking",
            query: {
              fileName: this.bookItem.filter
            }
          });
        } else {
          this.$router.push({
            path: "/store/speaking",
            query: {
              fileName: this.bookItem.fileName,
              opf: this.opf
            }
          });
        }
      });
    },
    read() {
      this.$router.push({
        path: `/ebook/${this.categoryText}|${this.fileName}`
      });
    },
    itemStyle(item) {
      return {
        marginLeft: (item.deep - 1) * 20px + 'rem';
    }
  },
  doFlatNavigation(content, deep = 1) {
    const arr = [];
    content.forEach(item => {
      item.deep = deep;
      arr.push(item);
      if (item.subitems && item.subitems.length > 0) {
        arr.push(this.doFlatNavigation(item.subitems, deep + 1));
      }
    });
    return arr;
  },
  downloadBook() {
    const opf = `${window.VUE_APP_EPUB_URL}/${this.bookItem.categoryText}/${this.bookItem.fileName}/OEBPS/package.opf`;
    this.parseBook(opf);
  },
  parseBook(url) {
    this.book = new Epub(url);
    this.book.loaded.metadata.then(metadata => {
      this.metadata = metadata;
    });
    this.book.loaded.navigation.then(nav => {
      this.navigation = nav;
      if (this.navigation.toc && this.navigation.toc.length > 1) {
        const candisplay = this.display(this.navigation.toc[1].href);
        if (candisplay) {
          candisplay.then(section => {
            if (this.$refs.scroll) {
              this.$refs.scroll.refresh();
            }
            this.displayed = true;
            const reg = new RegExp('<.+?>', 'g');
            const text = section.output.replace(reg, '').replace(/\s\s/g, '');
            this.description = text;
          });
        }
      }
    });
  },
  init() {
    this.fileName = this.$route.query.fileName;
    this.categoryText = this.$route.query.category;
    if (this.fileName) {
      detail({
        fileName: this.fileName
      }).then(response => {
        if (response.status === 200 && response.data.error_code === 0 && response.data.data) {
          //console.log("response", response);
          const data = response.data.data;
          this.bookItem = data;
          this.cover = this.bookItem.cover;
          let rootFile = data.rootFile;
          if (rootFile.startsWith('/')) {
            rootFile = rootFile.substring(1, rootFile.length);
          }
          this.opf = `${window.VUE_APP_EPUB_OPF_URL}/${this.fileName}/${rootFile}`;
          this.parseBook(this.opf);
        } else {
          this.showToast(response.data.msg);
        }
      });
    }
  },
  back() {
    this.$router.go(-1);
  },
  display(location) {
    if (this.$refs.preview) {
      if (!this.rendition) {
        this.rendition = this.book.renderTo('preview', {
          width: window.innerWidth > 640 ? 640 : window.innerWidth,
          height: window.innerHeight,
          method: 'default'
        });
      }
      if (!location) {
        return this.rendition.display();
      } else {
        return this.rendition.display(location);
      }
    }
  },
  onScroll(offsetY) {
    if (offsetY > realPx(42)) {
      this.$refs.title.showShadow();
    } else {
      this.$refs.title.hideShadow();
    }
  }
},
  mounted() {
  this.init();
  if (!this.shelfList || this.shelfList.length === 0) {
    this.getShelfList();
  }
}
}

            }
</script>
