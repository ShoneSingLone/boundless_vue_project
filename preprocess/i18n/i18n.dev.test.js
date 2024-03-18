// i18n("双引号");
// i18n('单引号');
// i18n(`${1}反引号`);
const axios = require("axios");


(async () => {
    try {
        const res = await axios({
            url: "http://10.143.133.216:3001/api/i18n/get",
            method: "post",
            data: {
                key: "项目"
            }
        });
        debugger;
        console.log("🚀 ~ file: Interception.proxy.js ~ line 66 ~ asyncGetXAuthToken ~ error", res.data.data);
    } catch (error) {
        console.log("🚀 ~ file: Interception.proxy.js ~ line 66 ~ asyncGetXAuthToken ~ error", error);
    }
})();
