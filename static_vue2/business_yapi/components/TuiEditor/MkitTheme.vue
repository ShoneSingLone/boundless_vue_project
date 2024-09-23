<style lang="less">
.x-mkit-wrapper {
	width: 100%;
	.x-mkit-img {
		min-width: 100px;
		max-width: 90%;
		border: 1px solid var(--el-border-color-lighter);
		background-color: #fff;
		color: var(--el-text-color-primary);
		transition: 0.3s;
	}
}
</style>
<script lang="ts">
export default async function () {
	const [hljs] = await Promise.all([_.$importVue("/common/libs/highlight.vue")]);

	function newImageDomString(title, text, href, index) {
		return `<div class="x-mkit-wrapper flex middle center" title="${title}" alt="${text}" data-x-mkit-wrapper-index="${index}">
	<img class="x-mkit-img pointer" src="${href}" >
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
				this.html = this.html.replace(
					img.outerHTML,
					newImageDomString(alt, alt, src, index)
				);
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
		PreprocessHTML
	};
}
</script>
