<style lang="less"></style>
<script lang="ts">
export default async function () {
	const [hljs] = await Promise.all([_.$importVue("/common/libs/highlight.vue")]);
	const rightArrow = `<div class="el-image-preview-switch-right right"><span role="img" aria-label="right" class="anticon anticon-right"><svg focusable="false" class="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg></span></div>`;
	const leftArrow = `<div class="el-image-preview-switch-left left"><span role="img" aria-label="left" class="anticon anticon-left"><svg focusable="false" class="" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg></span></div>`;

	function newImageDomString(title, text, href, index) {
		return `<div class="el-image pointer" style="max-width: 600px;" title="${title}" alt="${text}" data-el-image-index="${index}">
	<img class="el-image-img" src="${href}">
</div>`;
	}

	class PreprocessHTML {
		constructor(html) {
			this.html = html;
			this.img().a().codejs();
		}

		img() {
			const $html = $(this.html);
			const imgArray = $html.find("img");
			_.each(imgArray, (img, index) => {
				const { alt, src } = img;
				this.html = this.html.replace(img.outerHTML, newImageDomString(alt, alt, src, index));
			});
			return this;
		}

		a() {
			const $html = $(this.html);
			const aArray = $html.find("a");
			_.each(aArray, (aDom, index) => {
				const aDomOuterHTML = aDom.outerHTML;
				const outerHTML = $(aDom).attr({
					target: "_blank",
					"data-markdwon-a-index": index
				})[0].outerHTML;
				this.html = this.html.replace(aDomOuterHTML, outerHTML);
			});
			return this;
		}

		codejs() {
			const $html = $(this.html);
			const codeArray = $html.find("code[data-language='js']");
			_.each(codeArray, (codeDom, index) => {
				const $codeDom = $(codeDom);
				const codeDomOuterHTML = codeDom.outerHTML;
				$codeDom.addClass("hljs");
				let codeDomInnerHTML = String($codeDom[0].innerHTML);
				const innerHTML = hljs.highlightAuto(codeDomInnerHTML).value;
				/* => TODO:解析出问题 实体符的转换*/
				const innerHTMLReplaceGreatThan = innerHTML.replace(/=\&amp;gt;/g, "=>");
				/* => 解析出问题 */
				$codeDom[0].innerHTML = innerHTMLReplaceGreatThan;
				this.html = this.html.replace(codeDomOuterHTML, $codeDom[0].outerHTML);
			});
			return this;
		}
	}

	return {
		PreprocessHTML,
		leftArrow,
		rightArrow
	};
}
</script>
