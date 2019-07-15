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
    shopMsg
`;

/*
* 筛选首页商品
* */
export const SCREENING_HOMEPAGE_SHOP = `
    SELECT
    s.product_id,
    s.shop_id,
    s.shop_pic,
    s.shop_pri,
    s.shop_name,
    s.shop_txt
    FROM
    shopMsg AS s
    LEFT JOIN
    productmsg AS p
    ON
    s.product_id = p.product_id
    WHERE
    p.@ = ?
`;

/*
* 加入收藏
* */
export const ADD_COLLECTION = `
    INSERT INTO
    userCollection
    (user_id, product_id, shop_id, code)
    VALUES
    (?, ?, ?, ?)
`;

/*
* 判断该商品是否加入了收藏
* */
export const IS_SHOP_COLLECTION = `SELECT * FROM userCollection WHERE shop_id = ? AND user_id = ?`;

/*
* 获取购物车中商品数据
* */
export const GET_SHOP_CART_LIST = `
    SELECT
    u.code,
    u.shop_id,
    u.shop_val,
    u.shop_pri,
    s.shop_pic,
    s.shop_name
    FROM
    userCart AS u
    LEFT JOIN
    shopMsg AS s
    ON
    u.shop_id = s.shop_id
    WHERE
    u.user_id = ?
`;

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
* 加入到购物车
* */
export const ADD_SHOP_CART = `
    INSERT INTO
    userCart
    (code, user_id, shop_id, product_id, shop_val, shop_pri)
    VALUES
    (?, ?, ?, ?, ?, ?)
`;

/*
* 判断该商品是否在购物车中并获取该在购物车中的数量
* */
export const IS_CART_GET_NUM = `SELECT shop_val FROM userCart WHERE user_id = ? AND shop_id = ?`;

/*
* 修改购物车中存在的商品数量
* */
export const EDIT_SHOP_CART = `
    UPDATE
    userCart
    SET
    shop_val = ?
    WHERE
    user_id = ?
    AND
    shop_id = ?
`;

/*
* 删除购物车中商品
* */
export const DELETE_CART_SHOP = function (params) {
    return `
        DELETE FROM
        userCart
        WHERE
        user_id = '${params.user_id}'
        AND
        (${params.sql})
    `;
};

/*
* 根据shop_id查商品详情
* */
export const GET_SHOPID_DETAIL = function(params) {
    return `
        SELECT
        *
        FROM
        shopMsg
        WHERE
       ${params.sql}
    `;
};

/*
* 结算下单
* */
export const SUBMIT_ORDER = `
    INSERT INTO
    userOrder
    (code,
    user_id,
    shop_total,
    shop_sum,
    add_ress_id,
    zf_type,
    ps_type,
    o_time,
    remark,
    o_status)
    values
    (?, ?, ?, ?, ?, ?, ?, ?, ?, '待付款')
`;

/*
* 新增订单详情
* */
export const ADD_ORDER_DETAIL = `
    INSERT INTO
    orderMsg
    (order_code,
    product_id,
    shop_id,
    p_code,
    shop_pri,
    shop_val)
    values
    (?, ?, ?, ?, ?, ?)
`;

/*
* 根据shop_id、user_id删除购物车商品
* */
export const REMOVE_CART_SHOP = `
    DELETE
    FROM
    userCart
    WHERE
    shop_id = ?
    AND
    user_id = ?
`;

/*
* 更新库存
* */
export const UPDATE_SHOP_NUM = `
    UPDATE
    shopMsg
    SET
    shop_Num = ?
    WHERE
    shop_id = ?
`;

/*
* 用户收藏
* */
export const USER_COLLECTION_LIST = `
    SELECT
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
    u.user_id = '@'
`;

/*
* 批量移除用户收藏
* */
export const BATCH_DEL_COLL = function(params) {
    return `
        DELETE FROM
        userCollection
        WHERE
        user_id = '${params.user_id}'
        AND
        (${params.sql})
    `;
};

/*
* 消费明细
* */
export const USER_CONSUMPTION_LIST = `
    SELECT
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
* 获取用户的默认收货地址
* */
export const GET_DEFAULT_ADDRESS = `
    SELECT
    user_province,
    user_city,
    user_county,
    user_area,
    user_mobile,
    user_name
    FROM
    userAddress
    WHERE
    user_id = ? AND is_default = 1
`;

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
* 获取我的订单
* */
export let OWNERORDER_ALL = function(params) {
    return `
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
        u.user_id = '${params.user_id}'
        ${params.and_sql}
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
        dd.type = 'ps_type'
    `;
};

/*
* 登录并获取用户信息
* */
export const GET_USER_MSG = `
    SELECT
    u.*,
    d.cvalue AS userLevel
    FROM
    (SELECT
    user_id,
    user_nick_name,
    user_level,
    user_hpic
    FROM
    userMsg
    WHERE
    user_nick_name = ?
    AND
    user_paw = ?) AS u
    LEFT JOIN
    dictionary_data AS d
    ON
    u.user_level = d.ckey
    WHERE
    d.belongs_to = 'userMsg'
    AND
    d.type = 'level'
`;

/*
* 设置头像
* */
export const SET_USER_HPIC = `
    UPDATE
    userMsg
    SET
    user_hpic = ?
    WHERE
    user_id = ?
`;