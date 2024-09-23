<script lang="ts">
export default async function () {
	return {
		STATUS_MAP: {
			queued: i18n("queued"),
			running: i18n("running"),
			success: i18n("success"),
			error: i18n("error")
			/*cancel: i18n('cancel'),*/
		},
		PLAT_MAP: {
			0: i18n("tenantSide"),
			1: i18n("managementSide"),
			2: i18n("interfaceSide")
		},
		TASK_NAME_MAP: {
			startVM: i18n("startVM"),
			stopVM: i18n("stopVM"),
			restartVM: i18n("restartVM"),
			suspendVM: i18n("suspendVM"),
			forcedRestartVM: i18n("forcedRestartVM"),
			forcedStopVM: i18n("forcedStopVM"),
			resizeFlavor: i18n("resizeFlavor"),
			setTools: i18n("setTools"),
			upgradeTools: i18n("upgradeTools"),
			transferVM: i18n("transferVM"),
			reinstallVm: i18n("reinstallVm"),
			openVnc: i18n("openVnc"),
			updateVmName: i18n("updateVmName"),
			cloneVM: i18n("cloneVM"),
			createPort: i18n("createPort"),
			deletePort: i18n("deletePort"),
			setPort: i18n("setPort"),
			applyImage: i18n("applyImage"),
			deleteImage: i18n("deleteImage"),
			createVM: i18n("createVM"),
			deleteVM: i18n("deleteVM"),
			snapshotVM: i18n("snapshotVM"),
			deleteVmSnapshot: i18n("deleteVmSnapshot"),
			createVmSnapshot: i18n("createVmSnapshot"),
			restoreVmSnapshot: i18n("restoreVmSnapshot"),
			extendDisk: i18n("extendDisk"),
			attachVolume: i18n("attachVolume"),
			detachVolume: i18n("detachVolume"),
			createVolume: i18n("createVolume"),
			deleteVolume: i18n("deleteVolume"),
			deleteSnapshot: i18n("deleteSnapshot"),
			createSnapshot: i18n("createSnapshot"),
			shutdownHost: i18n("shutdownHost"),
			restartHost: i18n("restartHost"),
			enterModelHost: i18n("enterModelHost"),
			exitModelHost: i18n("exitModelHost"),
			vlbHost: i18n("vlbHost"),
			createDvPortGroup: i18n("createDvPortGroup"),
			delDvPortGroup: i18n("delDvPortGroup"),
			incorporateManage: i18n("transferTenant"),
			updateDvPortGroup: i18n("updateDvPortGroup"),
			setDvPortGroup: i18n("setDvPortGroup"),
			createQos: i18n("createQos"),
			updateQos: i18n("updateQos"),
			setExternalNetwork: i18n("setExternalNetwork"),
			cancelSetExternalNetwork: i18n("cancelSetExternalNetwork"),
			deleteQos: i18n("deleteQos")
		}
	};
}
</script>
