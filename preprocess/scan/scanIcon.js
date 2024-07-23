const path = require('path');
const fs = require('fs');

const targetDir = `static_vue2/business_admin_normal/assets/svg`;

let dirlist = fs.readdirSync(path.join(__dirname, `../../${targetDir}`));

dirlist = dirlist.filter(i => /.svg$/.test(i)).map(dirname => {
    const label = dirname.replace(".svg", "");
    return {
        label,
        value: label,
    };
});

fs.writeFileSync(path.join(__dirname, `../../${targetDir}/icons.vue`), `
<script lang="ts">
export default async function () {
	return {icons:${JSON.stringify(dirlist)}};
}
</script>

`);
