const { fs, path } = require("../../preprocess/preprocess.utils");
const [APP_NAME, service] = process.argv.slice(2);
if (APP_NAME && service) {
  make();
} else {
  console.log("mo 的项目需要提供 appName 和 serviceName: npm run makeIndexHtmlJson mo_ctyun ctyun")
  console.log("mo 的项目需要提供 appName 和 serviceName: npm run makeIndexHtmlJson mo_ctyun ctyun")
  console.log("mo 的项目需要提供 appName 和 serviceName: npm run makeIndexHtmlJson mo_ctyun ctyun")
}

function make() {
  const htmlString = fs.readFileSync(
    path.resolve(__dirname, `../../static_vue2/business_${APP_NAME}/index.html`),
    "utf-8"
  );

  fs.writeFileSync(
    path.resolve(__dirname, `../../static_vue2/business_${APP_NAME}/html-templates.json`),
    `[
    {
      "service": "${service}",
      "content": ${JSON.stringify(htmlString)},
      "paths": [
        "",
        "/",
        "/index.html"
      ],
      "content_type": "text/html"
    }
  ]`
  );

}