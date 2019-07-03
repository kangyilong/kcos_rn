/*
* 获取首页banner
* */
export const HOMEPAGE_BANNER = 'SELECT * FROM bannerMsg';

/*
* 查找首页全部商品
* */
export const HOMEPAGE_SHOP_LIST = 'SELECT product_id, shop_id, shop_pic, shop_pri, shop_name, shop_txt FROM shopMsg';

/*
* 获取我的全部订单
* */
export const OWNERORDER_ALL = `
    SELECT dd.cvalue AS psTypeName, uuuu.*
    FROM
    (SELECT d.cvalue AS zfTypeName, uuu.*
    FROM
    (SELECT
    s.shop_pic AS shopPic,
    s.shop_name AS shopName,
    s.shop_Num AS shopNum,
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
    u.code = o.p_code) AS uu
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
export const OWNERORDER_DFK = `
    SELECT dd.cvalue AS psTypeName, uuuu.*
    FROM
    (SELECT d.cvalue AS zfTypeName, uuu.*
    FROM
    (SELECT
    s.shop_pic AS shopPic,
    s.shop_name AS shopName,
    s.shop_Num AS shopNum,
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
export const OWNERORDER_DFH = `
    SELECT dd.cvalue AS psTypeName, uuuu.*
    FROM
    (SELECT d.cvalue AS zfTypeName, uuu.*
    FROM
    (SELECT
    s.shop_pic AS shopPic,
    s.shop_name AS shopName,
    s.shop_Num AS shopNum,
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
export const OWNERORDER_DSH = `
    SELECT dd.cvalue AS psTypeName, uuuu.*
    FROM
    (SELECT d.cvalue AS zfTypeName, uuu.*
    FROM
    (SELECT
    s.shop_pic AS shopPic,
    s.shop_name AS shopName,
    s.shop_Num AS shopNum,
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
export const OWNERORDER_DPJ = `
    SELECT dd.cvalue AS psTypeName, uuuu.*
    FROM
    (SELECT d.cvalue AS zfTypeName, uuu.*
    FROM
    (SELECT
    s.shop_pic AS shopPic,
    s.shop_name AS shopName,
    s.shop_Num AS shopNum,
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
export const OWNERORDER_YWC = `
    SELECT dd.cvalue AS psTypeName, uuuu.*
    FROM
    (SELECT d.cvalue AS zfTypeName, uuu.*
    FROM
    (SELECT
    s.shop_pic AS shopPic,
    s.shop_name AS shopName,
    s.shop_Num AS shopNum,
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
export const OWNERORDER_YQX = `
    SELECT dd.cvalue AS psTypeName, uuuu.*
    FROM
    (SELECT d.cvalue AS zfTypeName, uuu.*
    FROM
    (SELECT
    s.shop_pic AS shopPic,
    s.shop_name AS shopName,
    s.shop_Num AS shopNum,
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