<template>
	<div class="ebook-reader">
		<div id="read"></div>
		<div class="ebook-reader-mask" @click="onMaskClick" @touchmove="move" @touchend="moveEnd" @mousedown.left="onMouseEnter" @mousemove.left="onMouseMove" @mouseup.left="onMouseEnd"></div>
	</div>
</template>

<script>
            export default async function () {





const { ebookMixin }  = await _.$importVue("@/utils/mixin.vue");
const { flatten }  = await _.$importVue("@/utils/book.vue");
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme,
  getLocation
}  = await _.$importVue("@/utils/localStorage.vue");
const Epub = await _.$importVue("epubjs");
const { getLocalForage }  = await _.$importVue("@/utils/localForage.vue");

return {mixins: [ebookMixin],
  methods: {
    onMouseEnter(e) {
      this.mouseState = 1;
      this.mouseStartTime = e.timeStamp;
      e.preventDefault();
      e.stopPropagation();
    },
    onMouseMove(e) {
      if (this.mouseState === 1) {
        this.mouseState = 2;
      } else if (this.mouseState === 2) {
        let offsetY = 0;
        if (this.firstOffsetY) {
          offsetY = e.clientY - this.firstOffsetY;
          this.setOffsetY(offsetY);
        } else {
          this.firstOffsetY = e.clientY;
        }
      }
      e.preventDefault();
      e.stopPropagation();
    },
    onMouseEnd(e) {
      if (this.mouseState === 2) {
        this.setOffsetY(0);
        this.firstOffsetY = null;
        this.mouseState = 3;
      } else {
        this.mouseState = 4;
      }
      const time = e.timeStamp - this.mouseStartTime;
      if (time < 200) {
        this.mouseState = 4;
      }
      e.preventDefault();
      e.stopPropagation();
    },
    move(e) {
      let offsetY = 0;
      if (this.firstOffsetY) {
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY;
        this.setOffsetY(offsetY);
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY;
      }
      e.preventDefault();
      e.stopPropagation;
    },
    moveEnd() {
      this.setOffsetY(0);
      this.firstOffsetY = null;
    },
    onMaskClick(e) {
      if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
        return;
      }
      const offsetX = e.offsetX;
      const width = window.innerWidth;
      if (offsetX > 0 && offsetX < width * 0.3) {
        this.prevPage();
      } else if (offsetX > width * 0.7) {
        this.nextPage();
      } else {
        this.toggleTitleAndMenu();
      }
    },
    initFontFamily() {
      let font = getFontFamily(this.fileName);
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily);
      } else {
        this.rendition.themes.font(font);
        this.setDefaultFontFamily(font);
      }
    },
    initFontSize() {
      let fontSize = getFontSize(this.fileName);
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize);
      } else {
        this.rendition.themes.fontSize(fontSize + "px");
        this.setDefaultFontSize(fontSize);
      }
    },
    initTheme() {
      let defaultTheme = getTheme();
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name;
        saveTheme(defaultTheme);
      }
      this.setDefaultTheme(defaultTheme);
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style);
      });
      this.rendition.themes.select(defaultTheme);
    },
    initRendition() {
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        //method 支持微信能使用
        method: "default"
      });
      const location = getLocation(this.fileName);
      this.display(location, () => {
        this.initFontFamily();
        this.initFontSize();
        this.initTheme();
        this.initGlobalStyle();
        this.refreshLocation();
      });
      this.rendition.hooks.content.register(contents => {
        contents.addStylesheet(
          `${window.VUE_APP_RES_URL}/fonts/cabin.css`
        );
        contents.addStylesheet(
          `${window.VUE_APP_RES_URL}/fonts/daysOne.css`
        );
        contents.addStylesheet(
          `${window.VUE_APP_RES_URL}/fonts/montserrat.css`
        );
        contents.addStylesheet(
          `${window.VUE_APP_RES_URL}/fonts/tangerine.css`
        );
      });
    },
    initGesture() {
      this.rendition.on("touchstart", event => {
        this.touchStartX = event.changedTouches[0].clientX;
        this.touchStartTime = event.timeStamp;
      });
      this.rendition.on("touchend", event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX;
        const interval = event.timeStamp - this.touchStartTime;
        if (interval < 500 && offsetX > 40) {
          this.prevPage();
        } else if (interval < 500 && offsetX < -40) {
          this.nextPage();
        } else {
          this.toggleTitleAndMenu();
        }
        event.preventDefault();
        event.stopPropagation();
      });
    },
    parseBook() {
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url);
        });
      });
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata);
      });
      this.book.loaded.navigation.then(nav => {
        const navItems = flatten(nav.toc);
        function findLevel(item, level = 0) {
          if (!item.parent) {
            return level;
          } else {
            return findLevel(
              navItems.filter(parentItem => {
                return parentItem.id === item.parent;
              })[0],
              ++level
            );
          }
        }
        navItems.forEach(item => {
          item.level = findLevel(item);
        });
        this.setNavigation(navItems);
      });
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation();
        });
        this.hideTitleAndMenu();
        this.setFontFamilyVisible(false);
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation();
        });
        this.hideTitleAndMenu();
        this.setFontFamilyVisible(false);
      }
    },
    toggleTitleAndMenu() {
      if (this.menuVisible) {
        this.setSettingVisible(-1);
        this.setFontFamilyVisible(false);
      }
      this.setMenuVisible(!this.menuVisible);
    },
    hideTitleAndMenu() {
      this.setMenuVisible(false);
      this.setSettingVisible(-1);
      this.setFontFamilyVisible(false);
    },
    initEpub(url) {
      this.book = new Epub(url);
      this.setCurrentBook(this.book);
      this.initRendition();
      //this.initGesture();
      this.parseBook();
      this.book.ready.then(() => {
        return this.book.locations
          .generate(
            750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)
          )
          .then(locations => {
            this.navigation.forEach(nav => {
              nav.pagelist = [];
            });
            locations.forEach(item => {
              const loc = item.match(/\[(.*?)\]!/)[1];
              this.navigation.forEach(nav => {
                if (nav.href) {
                  const href = nav.href.match(/^(.*?)\.x?html$/)[1];
                  if (href === loc) {
                    nav.pagelist.push(item);
                  }
                }
              });
            });
            let currentPage = 1;
            this.navigation.forEach((nav, index) => {
              if (index === 0) {
                nav.page = 1;
              } else {
                nav.page = currentPage;
              }
              currentPage += nav.pagelist.length + 1;
            });
            this.setPagelist(locations);
            this.setBookAvailable(true);
            this.refreshLocation();
          });
      });
    }
  },
  mounted() {
    const books = this.$route.params.fileName.split("|");
    const fileName = books[1];
    getLocalForage(fileName, (err, blob) => {
      if (!err && blob) {
        this.setFileName(books.join("/")).then(() => {
          this.initEpub(blob);
        });
      } else {
        //console.log("在线获取电子书");
      }
    });
    this.setFileName(this.$route.params.fileName.replace(/\|/g, "/")).then(
      () => {
        const url = `${window.VUE_APP_EPUB_URL}/${this.fileName}.epub`;
        this.initEpub(url);
      }
    );
    window.addEventListener("resize", () => {
      this.rendition.resize(window.innerWidth, window.innerHeight);
    });
  }
};

            }
</script>
