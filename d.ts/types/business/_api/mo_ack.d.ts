export type t_mo_ack = {
/**
			 *  查询命名空间
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=36970/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=36970&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
namespaceList(args?:any):Promise<any>
/**
			 *  创建命名空间
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=36971/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=36971&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
namespaceAdd(args?:any):Promise<any>
/**
			 *  编辑命名空间
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=36973/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=36973&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
namespaceModify(args?:any):Promise<any>
/**
			 *  删除命名空间
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=36972/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=36972&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
namespaceDelete(args?:any):Promise<any>
/**
			 *  查询配置项
			 *  https://yapi.ghca.dev/#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37355/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37355&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
namespaceListConfigMap(args?:any):Promise<any>
/**
			 *  配额管理
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=36974/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=36974&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
namespaceManageQuota(args?:any):Promise<any>
/**
			 *  查询配额管理
			 *  https://yapi.ghca.dev/#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37354/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37354&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
namespaceListResourceQuota(args?:any):Promise<any>
/**
			 *  移除配置项
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37359/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37359&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
namespaceDeleteConfigMap(args?:any):Promise<any>
/**
			 *  创建配置项
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37363/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37363&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
namespaceAddConfigMap(args?:any):Promise<any>
/**
			 *  查询保密字典
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37353/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37353&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
namespaceListSecret(args?:any):Promise<any>
/**
			 *  移除保密字典
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37357/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37357&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
namespaceDeleteSecret(args?:any):Promise<any>
/**
			 *  创建保密字典
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37361/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37361&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
namespaceAddSecret(args?:any):Promise<any>
/**
			 *  查询节点
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37344/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37344&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
nodeList(args?:any):Promise<any>
/**
			 *  集群节点排水
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37480/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37480&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
nodeDrainNode(args?:any):Promise<any>
/**
			 *  集群节点调度设置
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37345/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37345&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
nodeDispatchNode(args?:any):Promise<any>
/**
			 *  查询节点详情
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37346/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37346&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
nodeDetail(args?:any):Promise<any>
/**
			 *  移除节点池结点
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37348/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37348&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
nodeDeleteNodePoolNode(args?:any):Promise<any>
/**
			 *  创建节点
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=1&wiki=421&interfaceType=interface&interfaceId=37347/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37347&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
nodeAdd(args?:any):Promise<any>
/**
			 *  查询节点池
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37339/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37339&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
nodePoolList(args?:any):Promise<any>
/**
			 *  负载列表
			 */
workloadListByType:   (
				type: "deployment" | "statefulSet" | "daemonset" | "cronjob" | "pod",
				data: object
			) => Promise<any>
/**
			 *  删除负载
			 */
workloadDeleteRowByType:   (
				type: "deployment" | "statefulSet" | "daemonset" | "cronjob" | "pod",
				data: object
			) => Promise<any>
/**
			 *  无状态负载详情
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37372/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37372&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
deploymentClusterIdNamespaceNameDetail(args?:any):Promise<any>
/**
			 *  容器组负载列表
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37394/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37394&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
podClusterIdList(args?:any):Promise<any>
/**
			 *  删除容器组负载
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37320/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37320&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
podClusterIdNamespaceNameDelete(args?:any):Promise<any>
/**
			 *  服务列表
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37410/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37410&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
serviceClusterIdList(args?:any):Promise<any>
/**
			 *  服务详情
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37407/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37407&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
serviceClusterIdNamespaceNameDetail(args?:any):Promise<any>
/**
			 *  路由列表
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37415/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37415&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
ingressClusterIdList(args?:any):Promise<any>
/**
			 *  路由详情
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37412/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37412&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
ingressClusterIdNamespaceNameDetail(args?:any):Promise<any>
/**
			 *  容器组负载详情
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37319/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37319&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
podClusterIdNamespaceNameDetail(args?:any):Promise<any>
/**
			 *  存储卷声明列表
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37328/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37328&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
persistentVolumeClaimList(args?:any):Promise<any>
/**
			 *  存储类列表
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=7&interfaceType=interface&interfaceId=37309/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37309&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
storageClassList(args?:any):Promise<any>
/**
			 *  存储卷详情
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=7&interfaceType=interface&interfaceId=37329/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37329&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
persistentVolumeClaimGetOne(args?:any):Promise<any>
/**
			 *  更新存储卷声明
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37327/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37327&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
persistentVolumeClaimUpdate(args?:any):Promise<any>
/**
			 *  存储卷列表
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37388/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37388&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
persistentVolumeList(args?:any):Promise<any>
/**
			 *   修改存储卷
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37323/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37323&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
persistentVolumeUpdate(args?:any):Promise<any>
/**
			 *  修改存储类
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37308/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37308&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
storageClassUpdate(args?:any):Promise<any>
/**
			 *  删除存储类
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37311/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37311&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
storageClassDelete(args?:any):Promise<any>
/**
			 *  查询 vpc 列表
			 *  http://localhost:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37520/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37520&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
vpcList(args?:any):Promise<any>
/**
			 *  根据vpcId查询交换机列表
			 *  http://localhost:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37521/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37521&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
vpcGetVSwitchByVpcId(args?:any):Promise<any>
/**
			 *  查询虚拟机规格列表
			 *  http://localhost:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37525/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37525&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
ecsList(args?:any):Promise<any>
mock(args?:any):Promise<any>
/**
			 *  根据虚拟机规格查询镜像列表
			 *  https://yapi.ghca.dev/#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37524/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37524&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
imageList(args?:any):Promise<any>
/**
			 *  创建集群
			 *  https://yapi.ghca.dev/#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=1&interfaceType=interface&interfaceId=37507/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37507&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
clusterCreate(args?:any):Promise<any>
/**
			 *  查询集群列表
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37386/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37386&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
clusterList(args?:any):Promise<any>
/**
			 *  创建节点池
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37343/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37343&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
nodePoolAdd(args?:any):Promise<any>
/**
			 *  查询KeyPairs
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=7&wiki=425&interfaceType=interface&interfaceId=37502/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37502&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
nodePoolGetKeyPairs(args?:any):Promise<any>
/**
			 *  删除节点池
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37341/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37341&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
nodePoolDelete(args?:any):Promise<any>
sgList(args?:any):Promise<any>
/**
			 *  查询自定义安全组
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37501/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37501&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
nodePoolGetSecurityGroups(args?:any):Promise<any>
/**
			 *  删除集群
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37506/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37506&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
clusterDeleteById(args?:any):Promise<any>
/**
			 *  查询集群详情
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37387/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37387&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
clusterGetById(args?:any):Promise<any>
/**
			 *  查询节点池详情
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37340/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37340&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
nodePoolDetail(args?:any):Promise<any>
/**
			 *  查询集群额外信息
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=7&interfaceType=interface&interfaceId=37565/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37565&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
clusterExtraInformationById(args?:any):Promise<any>
/**
			 *  校验cidr是否冲突
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=7&interfaceType=interface&interfaceId=37566/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37566&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
vpcCheckCidrConflict(args?:any):Promise<any>
/**
			 *  查询vpc
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=7&interfaceType=interface&interfaceId=37499/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37499&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
nodePoolGetVpcList(args?:any):Promise<any>
/**
			 *  新增存储卷声明
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=7&interfaceType=interface&interfaceId=37331/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37331&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
persistentVolumeClaimAdd(args?:any):Promise<any>
/**
			 *  删除存储卷声明
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=7&interfaceType=interface&interfaceId=37330/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37330&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
persistentVolumeClaimDelete(args?:any):Promise<any>
/**
			 *  磁盘列表
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37370/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37370&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
diskList(args?:any):Promise<any>
/**
			 *  新增存储卷
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37326/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37326&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
persistentVolumeAdd(args?:any):Promise<any>
/**
			 *  删除存储卷
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37325/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37325&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
persistentVolumeDelete(args?:any):Promise<any>
/**
			 *  新增存储类
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37312/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37312&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
storageClassAdd(args?:any):Promise<any>
/**
			 *  查询实例
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=358&groupId=430&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37482/#/api/project?projectId=358&groupId=430&interfaceType=interface&interfaceId=37482&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
			 */
nodeListInstances(args?:any):Promise<any>
};