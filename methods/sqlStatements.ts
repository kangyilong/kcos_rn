/*
* 获取首页banner
* */
export const HOMEPAGE_BANNER = 'SELECT * FROM bannerMsg';

/*
* 查找首页全部商品
* */
export const HOMEPAGE_SHOP_LIST = `SELECT
    product_id,
    shop_id,
    shop_pic,
    shop_pri,
    shop_name,
    shop_txt
    FROM
    shopMsg`;

/*
* 获取其他商品
* */
export const OTHER_SHOP_LIST = `
    SELECT
    product_id,
    shop_id,
    shop_pic,
    shop_pri,
    shop_name,
    shop_txt
    FROM
    shopMsg
    WHERE
    product_id != ?
`;

/*
* 获取商品详情介绍
* */
export const GET_SHOP_DETMSG = `SELECT product_det FROM productMsg WHERE product_id = ?`;

/*
* 用户收藏
* */
export const USER_COLLECTION_LIST = `SELECT
    u.product_id,
    u.shop_id,
    s.shop_pic,
    s.shop_pri,
    s.shop_name
    FROM
    userCollection AS u
    LEFT JOIN
    shopMsg AS s
    ON
    u.shop_id = s.shop_id
    WHERE
    u.user_id = '@'`;

/*
* 消费明细
* */
export const USER_CONSUMPTION_LIST = `SELECT
    uu.*,
    s.shop_pri,
    s.shop_name,
    s.shop_pic,
    s.product_id
    FROM
    (SELECT
    u.money_run,
    u.run_type,
    u.run_time,
    o.shop_id,
    o.p_code,
    o.shop_val AS shopValue
    from
    user_running_water AS u
    LEFT JOIN
    orderMsg AS o
    ON
    u.run_order_code = o.p_code
    WHERE
    u.user_id = '@'
    ) AS uu
    LEFT JOIN
    shopMsg AS s
    ON
    uu.shop_id = s.shop_id
`;

/*
* 用户地址
* */
export let OWNER_ADDRESS_LIST = `
    SELECT
    *
    FROM userAddress
    WHERE user_id = '@'`;

/*
* 设置为默认地址
* */
export let SET_ADDRESS_DEFAULTE = `UPDATE userAddress SET is_default = $ WHERE address_id = '@'`;

/*
* 将默认地址去掉
* */
export let DEL_ADDRESS_DEFAULTE = `UPDATE userAddress SET is_default = 0 WHERE user_id = '@' AND is_default = 1 AND address_id != '%'`;

/*
* 根据address_id取该条数据
* */
export let GET_SINGLE_ADDRESS = `SELECT * FROM userAddress WHERE address_id = '@'`;

/*
* 修改地址信息
* */
export let EDIT_ADDRESS_DATA = `
    UPDATE
    userAddress
    SET
    user_province = ?,
    user_city = ?,
    user_area = ?,
    user_mobile = ?,
    user_name = ?,
    user_county = ?,
    is_default = ?
    WHERE
    address_id = ?
    AND
    user_id = ?
`;

/*
* 添加地址信息
* */
export let ADD_ADDRESS_DATA = `
    INSERT
    INTO
    userAddress
    (address_id, user_id, user_name, user_mobile, user_province, user_city, user_county, user_area, is_default)
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

/*
* 删除用户某条信息
* */
export let DELETE_ADDRESS = `DELETE FROM userAddress WHERE address_id = ?`;

/*
* 获取我的全部订单
* */
export let OWNERORDER_ALL = `
    SELECT dd.cvalue AS psTypeName, uuuu.*
    FROM
    (SELECT d.cvalue AS zfTypeName, uuu.*
    FROM
    (SELECT
    s.shop_pic AS shopPic,
    s.shop_name AS shopName,
    s.shop_Num AS shopNum,
    s.product_id,
    uu.*
    FROM
    (SELECT
    u.code,
    u.shop_sum AS shopSum,
    u.o_time AS orderTime,
    u.o_status,
    u.zf_type,
    u.ps_type,
    u.shop_total AS shopTotal,
    o.shop_id,
    o.shop_pri AS shopPrice,
    o.shop_val AS shopVal
    FROM
    userOrder AS u
    LEFT JOIN
    orderMsg AS o
    ON
    u.code = o.p_code
    WHERE
    u.user_id = '@'
    ORDER BY
    orderTime
    ) AS uu
    LEFT JOIN
    shopMsg AS s
    ON
    uu.shop_id = s.shop_id) AS uuu
    LEFT JOIN
    dictionary_data AS d
    ON
    uuu.zf_type = d.ckey
    WHERE
    d.belongs_to = 'userOrder'
    AND
    d.type = 'zf_type') AS uuuu
    LEFT JOIN
    dictionary_data AS dd
    ON
    uuuu.ps_type = dd.ckey
    WHERE
    dd.belongs_to = 'userOrder'
    AND
    dd.type = 'ps_type'`;

/*
* 获取我的待付款订单
* */
export let OWNERORDER_DFK = `
    SELECT dd.cvalue AS psTypeName, uuuu.*
    FROM
    (SELECT d.cvalue AS zfTypeName, uuu.*
    FROM
    (SELECT
    s.shop_pic AS shopPic,
    s.shop_name AS shopName,
    s.shop_Num AS shopNum,
    s.product_id,
    uu.*
    FROM
    (SELECT
    u.code,
    u.shop_sum AS shopSum,
    u.o_time AS orderTime,
    u.o_status,
    u.zf_type,
    u.ps_type,
    u.shop_total AS shopTotal,
    o.shop_id,
    o.shop_pri AS shopPrice,
    o.shop_val AS shopVal
    FROM
    userOrder AS u
    LEFT JOIN
    orderMsg AS o
    ON
    u.code = o.p_code
    WHERE
    u.o_status = '待付款'
    AND
    u.user_id = '@'
    ORDER BY
    orderTime
    ) AS uu
    LEFT JOIN
    shopMsg AS s
    ON
    uu.shop_id = s.shop_id) AS uuu
    LEFT JOIN
    dictionary_data AS d
    ON
    uuu.zf_type = d.ckey
    WHERE
    d.belongs_to = 'userOrder'
    AND
    d.type = 'zf_type') AS uuuu
    LEFT JOIN
    dictionary_data AS dd
    ON
    uuuu.ps_type = dd.ckey
    WHERE
    dd.belongs_to = 'userOrder'
    AND
    dd.type = 'ps_type'`;
/*
* 获取我的待发货订单
* */
export let OWNERORDER_DFH = `
    SELECT dd.cvalue AS psTypeName, uuuu.*
    FROM
    (SELECT d.cvalue AS zfTypeName, uuu.*
    FROM
    (SELECT
    s.shop_pic AS shopPic,
    s.shop_name AS shopName,
    s.shop_Num AS shopNum,
    s.product_id,
    uu.*
    FROM
    (SELECT
    u.code,
    u.shop_sum AS shopSum,
    u.o_time AS orderTime,
    u.o_status,
    u.zf_type,
    u.ps_type,
    u.shop_total AS shopTotal,
    o.shop_id,
    o.shop_pri AS shopPrice,
    o.shop_val AS shopVal
    FROM
    userOrder AS u
    LEFT JOIN
    orderMsg AS o
    ON
    u.code = o.p_code
    WHERE
    u.o_status = '待发货'
    AND
    u.user_id = '@'
    ORDER BY
    orderTime
    ) AS uu
    LEFT JOIN
    shopMsg AS s
    ON
    uu.shop_id = s.shop_id) AS uuu
    LEFT JOIN
    dictionary_data AS d
    ON
    uuu.zf_type = d.ckey
    WHERE
    d.belongs_to = 'userOrder'
    AND
    d.type = 'zf_type') AS uuuu
    LEFT JOIN
    dictionary_data AS dd
    ON
    uuuu.ps_type = dd.ckey
    WHERE
    dd.belongs_to = 'userOrder'
    AND
    dd.type = 'ps_type'`;
/*
* 获取我的待收货订单
* */
export let OWNERORDER_DSH = `
    SELECT dd.cvalue AS psTypeName, uuuu.*
    FROM
    (SELECT d.cvalue AS zfTypeName, uuu.*
    FROM
    (SELECT
    s.shop_pic AS shopPic,
    s.shop_name AS shopName,
    s.shop_Num AS shopNum,
    s.product_id,
    uu.*
    FROM
    (SELECT
    u.code,
    u.shop_sum AS shopSum,
    u.o_time AS orderTime,
    u.o_status,
    u.zf_type,
    u.ps_type,
    u.shop_total AS shopTotal,
    o.shop_id,
    o.shop_pri AS shopPrice,
    o.shop_val AS shopVal
    FROM
    userOrder AS u
    LEFT JOIN
    orderMsg AS o
    ON
    u.code = o.p_code
    WHERE
    u.o_status = '待收货'
    AND
    u.user_id = '@'
    ORDER BY
    orderTime
    ) AS uu
    LEFT JOIN
    shopMsg AS s
    ON
    uu.shop_id = s.shop_id) AS uuu
    LEFT JOIN
    dictionary_data AS d
    ON
    uuu.zf_type = d.ckey
    WHERE
    d.belongs_to = 'userOrder'
    AND
    d.type = 'zf_type') AS uuuu
    LEFT JOIN
    dictionary_data AS dd
    ON
    uuuu.ps_type = dd.ckey
    WHERE
    dd.belongs_to = 'userOrder'
    AND
    dd.type = 'ps_type'`;
/*
* 获取我的待评价订单
* */
export let OWNERORDER_DPJ = `
    SELECT dd.cvalue AS psTypeName, uuuu.*
    FROM
    (SELECT d.cvalue AS zfTypeName, uuu.*
    FROM
    (SELECT
    s.shop_pic AS shopPic,
    s.shop_name AS shopName,
    s.shop_Num AS shopNum,
    s.product_id,
    uu.*
    FROM
    (SELECT
    u.code,
    u.shop_sum AS shopSum,
    u.o_time AS orderTime,
    u.o_status,
    u.zf_type,
    u.ps_type,
    u.shop_total AS shopTotal,
    o.shop_id,
    o.shop_pri AS shopPrice,
    o.shop_val AS shopVal
    FROM
    userOrder AS u
    LEFT JOIN
    orderMsg AS o
    ON
    u.code = o.p_code
    WHERE
    u.o_status = '待评价'
    AND
    u.user_id = '@'
    ORDER BY
    orderTime
    ) AS uu
    LEFT JOIN
    shopMsg AS s
    ON
    uu.shop_id = s.shop_id) AS uuu
    LEFT JOIN
    dictionary_data AS d
    ON
    uuu.zf_type = d.ckey
    WHERE
    d.belongs_to = 'userOrder'
    AND
    d.type = 'zf_type') AS uuuu
    LEFT JOIN
    dictionary_data AS dd
    ON
    uuuu.ps_type = dd.ckey
    WHERE
    dd.belongs_to = 'userOrder'
    AND
    dd.type = 'ps_type'`;
/*
* 获取我的已完成订单
* */
export let OWNERORDER_YWC = `
    SELECT dd.cvalue AS psTypeName, uuuu.*
    FROM
    (SELECT d.cvalue AS zfTypeName, uuu.*
    FROM
    (SELECT
    s.shop_pic AS shopPic,
    s.shop_name AS shopName,
    s.shop_Num AS shopNum,
    s.product_id,
    uu.*
    FROM
    (SELECT
    u.code,
    u.shop_sum AS shopSum,
    u.o_time AS orderTime,
    u.o_status,
    u.zf_type,
    u.ps_type,
    u.shop_total AS shopTotal,
    o.shop_id,
    o.shop_pri AS shopPrice,
    o.shop_val AS shopVal
    FROM
    userOrder AS u
    LEFT JOIN
    orderMsg AS o
    ON
    u.code = o.p_code
    WHERE
    u.o_status = '已完成'
    AND
    u.user_id = '@'
    ORDER BY
    orderTime
    ) AS uu
    LEFT JOIN
    shopMsg AS s
    ON
    uu.shop_id = s.shop_id) AS uuu
    LEFT JOIN
    dictionary_data AS d
    ON
    uuu.zf_type = d.ckey
    WHERE
    d.belongs_to = 'userOrder'
    AND
    d.type = 'zf_type') AS uuuu
    LEFT JOIN
    dictionary_data AS dd
    ON
    uuuu.ps_type = dd.ckey
    WHERE
    dd.belongs_to = 'userOrder'
    AND
    dd.type = 'ps_type'`;
/*
* 获取我的已取消订单
* */
export let OWNERORDER_YQX = `
    SELECT dd.cvalue AS psTypeName, uuuu.*
    FROM
    (SELECT d.cvalue AS zfTypeName, uuu.*
    FROM
    (SELECT
    s.shop_pic AS shopPic,
    s.shop_name AS shopName,
    s.shop_Num AS shopNum,
    s.product_id,
    uu.*
    FROM
    (SELECT
    u.code,
    u.shop_sum AS shopSum,
    u.o_time AS orderTime,
    u.o_status,
    u.zf_type,
    u.ps_type,
    u.shop_total AS shopTotal,
    o.shop_id,
    o.shop_pri AS shopPrice,
    o.shop_val AS shopVal
    FROM
    userOrder AS u
    LEFT JOIN
    orderMsg AS o
    ON
    u.code = o.p_code
    WHERE
    u.o_status = '已取消'
    AND
    u.user_id = '@'
    ORDER BY
    orderTime
    ) AS uu
    LEFT JOIN
    shopMsg AS s
    ON
    uu.shop_id = s.shop_id) AS uuu
    LEFT JOIN
    dictionary_data AS d
    ON
    uuu.zf_type = d.ckey
    WHERE
    d.belongs_to = 'userOrder'
    AND
    d.type = 'zf_type') AS uuuu
    LEFT JOIN
    dictionary_data AS dd
    ON
    uuuu.ps_type = dd.ckey
    WHERE
    dd.belongs_to = 'userOrder'
    AND
    dd.type = 'ps_type'`;