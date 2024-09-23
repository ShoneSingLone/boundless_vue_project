type t_options = {
		label: string;
		value: any;
		[prop: string]: any;
	};
export type t_vdun = {
hubStatus:t_options[]
virtual:t_options[]
yesOrNo:t_options[]
diskType:t_options[]
gatherFlag:t_options[]
nodeType:t_options[]
monitorMethod:t_options[]
snmpVersion:t_options[]
osType:t_options[]
ecsMonitor:t_options[]
};