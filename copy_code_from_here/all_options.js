var options = {

    yesOrNo: [
        { label: i18n("是"), value: true, labelKey: "是" },
        { label: i18n("否"), value: false, labelKey: "否" }
    ],
    paidMode: [
        { label: i18n("按需计费"), value: "PostPaid", labelKey: "按需计费" },
        { label: i18n("包年/包月"), value: "PrePaid", labelKey: "包年/包月" }
    ],
    flavorCPU: [
        { label: i18n("全部"), value: "" },
        { label: i18n("1核"), value: "1" },
        { label: i18n("2核"), value: "2" },
        { label: i18n("4核"), value: "4" },
        { label: i18n("8核"), value: "8" },
        { label: i18n("12核"), value: "12" },
        { label: i18n("16核"), value: "16" },
        { label: i18n("24核"), value: "24" },
        { label: i18n("32核"), value: "32" },
        { label: i18n("48核"), value: "48" },
        { label: i18n("60核"), value: "60" },
        { label: i18n("64核"), value: "64" },
        { label: i18n("96核"), value: "96" }
    ],
    flavorRam: [
        { label: i18n("全部"), value: "" },
        { label: "1G", value: "1" },
        { label: "2G", value: "2" },
        { label: "4G", value: "4" },
        { label: "8G", value: "8" },
        { label: "16G", value: "16" },
        { label: "24G", value: "24" },
        { label: "32G", value: "32" },
        { label: "48G", value: "48" },
        { label: "64G", value: "64" },
        { label: "96G", value: "96" },
        { label: "120G", value: "120" },
        { label: "128G", value: "128" },
        { label: "192G", value: "192" },
        { label: "240G", value: "240" },
        { label: "256G", value: "256" },
        { label: "384G", value: "384" },
        { label: "480G", value: "480" },
        { label: "512G", value: "512" },
        { label: "768G", value: "768" }
    ],
    EcsStatus: [
        { type: "info", label: i18n("备份中"), value: "backingup" },
        { type: "info", label: i18n("创建中"), value: "creating" },
        { type: "info", label: i18n("已到期"), value: "expired" },
        { type: "info", label: i18n("冻结中"), value: "freezing" },
        { type: "info", label: i18n("重装"), value: "rebuild" },
        { type: "info", label: i18n("重启中"), value: "restarting" },
        { type: "success", label: i18n("运行中"), value: "running" },
        { type: "info", label: i18n("开机中"), value: "starting" },
        { type: "info", label: i18n("已关机"), value: "stopped" },
        { type: "info", label: i18n("关机中"), value: "stopping" },
        { type: "info", label: i18n("错误"), value: "error" },
        { type: "info", label: i18n("快照创建中"), value: "snapshotting" }
    ],
    BuyTime: [
        { label: i18n("1个月"), value: 1 },
        { label: i18n("2个月"), value: 2 },
        { label: i18n("3个月"), value: 3 },
        { label: i18n("4个月"), value: 4 },
        { label: i18n("5个月"), value: 5 },
        { label: i18n("6个月"), value: 6 },
        { label: i18n("7个月"), value: 7 },
        { label: i18n("8个月"), value: 8 },
        { label: i18n("9个月"), value: 9 },
        { label: i18n("10个月"), value: 10 },
        { label: i18n("11个月"), value: 11 },
        { label: i18n("1年"), value: 12 },
        { label: i18n("2年"), value: 24 },
        { label: i18n("3年"), value: 36 },
        { label: i18n("4年"), value: 48 },
        { label: i18n("5年"), value: 60 }
    ],
    snapshotTime: [...new Array(24)].map((i, index) => {
        let label = "";

        if (index < 10) {
            label = `0${index}:00`;
        } else {
            label = `${index}:00`;
        }
        return {
            label,
            value: String(index)
        };
    }),
    customTimeCount: [
        { label: i18n("不限"), value: 0 },
        { label: i18n("1年"), value: 1 }
    ],
    retentionType: [
        { label: i18n("时间"), value: "date" },
        { label: i18n("数量"), value: "num" }
    ],
    cycleWeek: _.map(["sun", "mon", "tue", "wed", "thu", "fri", "sat"], (label, index) => {
        return {
            label: i18n(label),
            value: String(index)
        };
    }),
    cycleType: [
        {
            label: i18n("周"),
            value: "week"
        },
        {
            label: i18n("日"),
            value: "day"
        }
    ],
    SnapshotPolicy: [
        { label: i18n("启用"), value: 1 },
        { label: i18n("不启用"), value: 0 }
    ],
    create_pwd_type: [
        { label: i18n("密码"), value: "0" },
        { label: i18n("密钥对"), value: "1" }
    ],
    eip_type: [
        { label: i18n("不使用"), value: "0" },
        { label: i18n("使用已有"), value: "1" }
    ],
    ecs_boot_disk_type: [
        { label: i18n("SATA（普通IO）"), value: "SATA" },
        { label: i18n("SAS（高IO）"), value: "SAS" },
        { label: i18n("SSD（超高IO）"), value: "SSD" },
        { label: i18n("genric（通用型SSD）"), value: "SSD-genric" },
        { label: i18n("SSD（极速型SSD"), value: "FAST-SSD" }
    ],
    ecs_image_visibility: [
        { label: i18n("私有镜像"), value: 0 },
        { label: i18n("公共镜像（默认值）"), value: 1 },
        { label: i18n("共享镜像"), value: 2 },
        { label: i18n("安全产品镜像"), value: 3 },
        { label: i18n("甄选应用镜像"), value: 4 }
    ],
    /* https://www.vdun.cn/document/10026755/10040953 */
    securityGroupRules_direction: [
        { label: i18n("入方向"), value: "ingress" },
        { label: i18n("出方向"), value: "egress" }
    ],
    securityGroupRules_ethertype: [
        { label: i18n("IPv4"), value: "IPv4" },
        { label: i18n("IPv6"), value: "IPv6" }
    ],
    securityGroupRules_action: [
        { label: i18n("允许"), value: "accept" },
        { label: i18n("拒绝"), value: "drop" }
    ],
    securityGroupRules_protocol: [
        { label: i18n("ANY"), value: "ANY" },
        { label: i18n("TCP"), value: "TCP" },
        { label: i18n("UDP"), value: "UDP" },
        /* ICMP(v4) */
        { label: i18n("ICMP"), value: "ICMP" }
    ],
    /**
     * 云主机组策略类型。
     * 取值范围：
     * 0：反亲和（ANTI-AFFINITY）。
     * 1：亲和（AFFINITY）。
     * 2：软反亲和（SOFT-ANTI-AFFINITY）。
     * 3：软亲和（SOFT-AFFINITY)，
     * 默认值：2
     */
    SvrGrpPolicy: [
        { label: i18n("反亲和"), value: 0 },
        { label: i18n("亲和"), value: 1 },
        { label: i18n("软反亲和"), value: 2 },
        { label: i18n("软亲和"), value: 3 }
    ],
    evsSnapshot: [
        { label: i18n("创建中"), value: "creating", type: "warring" },
        { label: i18n("删除中"), value: "deleting", type: "warring" },
        { label: i18n("回滚中"), value: "rollbacking", type: "warring" },
        { label: i18n("从快照创建云硬盘中"), value: "cloning", type: "warring" },
        { label: i18n("可用"), value: "available", type: "warring" },
        { label: i18n("错误"), value: "error", type: "warring" }
    ],
    ebs: [
        { label: i18n("删除中"), value: "deleting", type: "warring" },
        { label: i18n("资源创建中"), value: "creating", type: "warring" },
        { label: i18n("解绑中"), value: "detaching", type: "warring" },
        { label: i18n("未绑定云主机"), value: "detached", type: "warring" },
        { label: i18n("绑定中"), value: "attaching", type: "warring" },
        { label: i18n("已绑定"), value: "attached", type: "warring" },
        { label: i18n("扩容中"), value: "extending", type: "warring" },
        { label: i18n("错误状态"), value: "error", type: "warring" },
        { label: i18n("备份中"), value: "backup", type: "warring" },
        { label: i18n("从备份恢复中"), value: "backupRestoring", type: "warring" },
        { label: i18n("包周期已结束"), value: "expired", type: "warring" },
        { label: i18n("按需计费，处于冻结状态，可能账户受限或余额不足"), value: "freezing", type: "warring" },
        { label: i18n("可用"), value: "available", type: "warring" },
        { label: i18n("已挂载云主机"), value: "in-use", type: "warring" },
        { label: i18n("扩容中"), value: "resizing", type: "warring" }
    ],
    sbw: [
        { label: i18n("正常"), value: "ACTIVE", type: "warring" },
        { label: i18n("到期"), value: "EXPIRED", type: "warring" },
        { label: i18n("冻结"), value: "FREEZING", type: "warring" }
    ],
    eip: [
        { label: i18n("已绑定"), value: "ACTIVE", type: "warring" },
        { label: i18n("未绑定"), value: "DOWN", type: "warring" },
        { label: i18n("已冻结"), value: "FREEZING", type: "warring" },
        { label: i18n("错误"), value: "ERROR", type: "warring" },
        { label: i18n("更新中"), value: "UPDATING", type: "warring" },
        { label: i18n("绑定中"), value: "BINDING", type: "warring" },
        { label: i18n("解绑中"), value: "UNBANGDING", type: "warring" },
        { label: i18n("删除中"), value: "DELETING", type: "warring" },
        { label: i18n("已删除"), value: "DELETED", type: "warring" },
        { label: i18n("已过期"), value: "EXPIRED", type: "warring" }
    ],
    ecs: [
        { label: i18n("备份中"), value: "backingup", type: "warring" },
        { label: i18n("创建中"), value: "creating", type: "warring" },
        { label: i18n("已到期"), value: "expired", type: "warring" },
        { label: i18n("冻结中"), value: "freezing", type: "warring" },
        { label: i18n("重装"), value: "rebuild", type: "warring" },
        { label: i18n("重启中"), value: "restarting", type: "warring" },
        { label: i18n("运行中"), value: "running", type: "warring" },
        { label: i18n("开机中"), value: "starting", type: "warring" },
        { label: i18n("已关机"), value: "stopped", type: "warring" },
        { label: i18n("关机中"), value: "stopping", type: "warring" },
        { label: i18n("错误"), value: "error", type: "warring" },
        { label: i18n("快照创建中"), value: "snapshotting", type: "warring" }
    ],
    router: [
        { label: i18n("vpcpeering"), value: "vpcpeering", type: "warring" },
        { label: i18n("havip"), value: "havip", type: "warring" },
        { label: i18n("bm"), value: "bm", type: "warring" },
        { label: i18n("vm"), value: "vm", type: "warring" },
        { label: i18n("natgw"), value: "natgw", type: "warring" },
        { label: i18n("igw6"), value: "igw6", type: "warring" },
        { label: i18n("dc"), value: "dc", type: "warring" },
        { label: i18n("ticc"), value: "ticc", type: "warring" },
        { label: i18n("vpngw"), value: "vpngw", type: "warring" },
        { label: i18n("enic"), value: "enic", type: "warring" }
    ],
    vpc: [
        { label: i18n("正常"), value: "available", type: "warring" },
        { label: i18n("删除中"), value: "deleting", type: "warring" }
    ],
    ecsSnapshotStatus: [
        { label: i18n("创建中"), value: "pending", type: "warring" },
        { label: i18n("可用"), value: "available", type: "warring" },
        { label: i18n("恢复中"), value: "restoring", type: "warring" },
        { label: i18n("错误"), value: "error", type: "warring" }
    ]
};