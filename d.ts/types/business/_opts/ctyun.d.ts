type t_options = {
		label: string;
		value: any;
		[prop: string]: any;
	};
export type t_ctyun = {
EcsStatus:t_options[]
BuyTime:t_options[]
snapshotTime:t_options[]
retentionType:t_options[]
cycleWeek:t_options[]
cycleType:t_options[]
SnapshotPolicy:t_options[]
create_pwd_type:t_options[]
eip_type:t_options[]
ecs_boot_disk_type:t_options[]
ecs_image_visibility:t_options[]
/* https://www.ctyun.cn/document/10026755/10040953 */
securityGroupRules_direction:t_options[]
securityGroupRules_ethertype:t_options[]
securityGroupRules_action:t_options[]
securityGroupRules_protocol:t_options[]
/**
			 * 云主机组策略类型。
			 * 取值范围：
			 * 0：反亲和（ANTI-AFFINITY）。
			 * 1：亲和（AFFINITY）。
			 * 2：软反亲和（SOFT-ANTI-AFFINITY）。
			 * 3：软亲和（SOFT-AFFINITY)，
			 * 默认值：2
			 */
SvrGrpPolicy:t_options[]
evsSnapshot:t_options[]
ebs:t_options[]
sbw:t_options[]
eip:t_options[]
ecs:t_options[]
router:t_options[]
vpc:t_options[]
};