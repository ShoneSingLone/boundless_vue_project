type t_options = {
		label: string;
		value: any;
		[prop: string]: any;
	};
export type t_admin_db_audit = {
status:t_options[]
yesOrNo:t_options[]
sex:t_options[]
accountStatus:t_options[]
strategyStatus:t_options[]
warningStatus:t_options[]
probeStatus:t_options[]
warringLevel:t_options[]
warringMethods:t_options[]
menuType:t_options[]
};