type t_options = {
		label: string;
		value: any;
		[prop: string]: any;
	};
export type t_mo_ack = {
bootType:t_options[]
fileSystemType:t_options[]
bindingMode:t_options[]
recyclingStrategy:t_options[]
grayReleaseStrategyRule:t_options[]
grayReleaseStrategyType:t_options[]
AllocationMode:t_options[]
PersistentVolumeClaim:t_options[]
storageClass:t_options[]
schedulingToleranceOpr:t_options[]
opr:t_options[]
storageTypeCloud:t_options[]
storageType:t_options[]
upgrading_type:t_options[]
metric_cpu_mem:t_options[]
diskType:t_options[]
/* 数据盘 */
diskType_Data:t_options[]
protocol_http_https:t_options[]
accessMode:t_options[]
namespace_status:t_options[]
secret_type:t_options[]
protocol:t_options[]
envType:t_options[]
effect:t_options[]
};