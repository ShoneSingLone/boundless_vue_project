const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const cheerio = require("cheerio");

(async () => {
    const indexHtmlString = await fs.promises.readFile(
        path.resolve(__dirname, "./source_svg.html"),
        "utf-8"
    );
    const $ = cheerio.load(indexHtmlString);
    const $allSvg = $("li");
    $allSvg.each((index, el) => {
        const $el = $(el);
        const name = $el.find(".icon-name").text();
        const svgHtml = $($el.find("svg")[0]).toString();
        fs.writeFileSync(`./saved_svg/${_.kebabCase(name)}.svg`, svgHtml, "utf-8");
    });
})();
