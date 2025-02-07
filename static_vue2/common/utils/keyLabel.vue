<script lang="ts">
export default async function () {
	return {
		STATUS_MAP: {
			queued: "queued",
			running: "running",
			success: "success",
			error: "error"
			/*cancel: 'cancel',*/
		},
		PLAT_MAP: {
			0: "tenantSide",
			1: "managementSide",
			2: "interfaceSide"
		},
		TASK_NAME_MAP: {
			startVM: "startVM",
			stopVM: "stopVM",
			restartVM: "restartVM",
			suspendVM: "suspendVM",
			forcedRestartVM: "forcedRestartVM",
			forcedStopVM: "forcedStopVM",
			resizeFlavor: "resizeFlavor",
			setTools: "setTools",
			upgradeTools: "upgradeTools",
			transferVM: "transferVM",
			reinstallVm: "reinstallVm",
			openVnc: "openVnc",
			updateVmName: "updateVmName",
			cloneVM: "cloneVM",
			createPort: "createPort",
			deletePort: "deletePort",
			setPort: "setPort",
			applyImage: "applyImage",
			deleteImage: "deleteImage",
			createVM: "createVM",
			deleteVM: "deleteVM",
			snapshotVM: "snapshotVM",
			deleteVmSnapshot: "deleteVmSnapshot",
			createVmSnapshot: "createVmSnapshot",
			restoreVmSnapshot: "restoreVmSnapshot",
			extendDisk: "extendDisk",
			attachVolume: "attachVolume",
			detachVolume: "detachVolume",
			createVolume: "createVolume",
			deleteVolume: "deleteVolume",
			deleteSnapshot: "deleteSnapshot",
			createSnapshot: "createSnapshot",
			shutdownHost: "shutdownHost",
			restartHost: "restartHost",
			enterModelHost: "enterModelHost",
			exitModelHost: "exitModelHost",
			vlbHost: "vlbHost",
			createDvPortGroup: "createDvPortGroup",
			delDvPortGroup: "delDvPortGroup",
			incorporateManage: "transferTenant",
			updateDvPortGroup: "updateDvPortGroup",
			setDvPortGroup: "setDvPortGroup",
			createQos: "createQos",
			updateQos: "updateQos",
			setExternalNetwork: "setExternalNetwork",
			cancelSetExternalNetwork: "cancelSetExternalNetwork",
			deleteQos: "deleteQos"
		}
	};
}
</script>
