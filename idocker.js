const axios = require('axios');

const baseUrl = 'https://dk.ggbycf.ggff.net/api/v1/user';
const authorization = '';

/**
 *  根据当前月份动态生成优惠码。
 *  例如，当前是 4 月，则生成 "rongseven@4"。
 *  @returns {string} 生成的优惠码
 */
function generateCouponCode() {
    const currentMonth = new Date().getMonth() + 1; // getMonth() 返回 0-11，所以要 +1
    return `rongseven@${currentMonth}`;
}

async function checkCoupon(code, plan_id) {
    try {
        const response = await axios.post(`${baseUrl}/coupon/check`, { code: code, plan_id: plan_id }, {
            headers: {
                'authorization': authorization,
                'Content-Type': 'application/json'
            }
        });

        console.log('Coupon Check Response (优惠券检查响应):', response.data);
        return response.data;
    } catch (error) {
        console.error('Coupon Check Error (优惠券检查错误):', error?.response?.data?.message || error.message); // 打印 error message
        throw new Error(error?.response?.data?.message || error.message); // 抛出 message 供上层处理
    }
}

async function saveOrder(plan_id, period, coupon_code) {
    try {
        const response = await axios.post(`${baseUrl}/order/save`, { plan_id: plan_id, period: period, coupon_code: coupon_code }, {
            headers: {
                'authorization': authorization,
                'Content-Type': 'application/json'
            }
        });

        console.log('Save Order Response (保存订单响应):', response.data);
        return response.data.data; // 只返回 trade_no
    } catch (error) {
        console.error('Save Order Error (保存订单错误):', error?.response?.data?.message || error.message); // 打印 error message
        throw new Error(error?.response?.data?.message || error.message); // 抛出 message 供上层处理
    }
}

async function getOrderDetail(trade_no) {
    const t = Date.now();
    try {
        const response = await axios.get(`${baseUrl}/order/detail?trade_no=${trade_no}&t=${t}`, {
            headers: {
                'authorization': authorization
            }
        });

        console.log('Order Detail Response (订单详情响应):', response.data);
        return response.data;
    } catch (error) {
        console.error('Order Detail Error (订单详情错误):', error?.response?.data?.message || error.message); // 打印 error message
        throw new Error(error?.response?.data?.message || error.message); // 抛出 message 供上层处理
    }
}

async function getPaymentMethod() {
    const t = Date.now();
    try {
        const response = await axios.get(`${baseUrl}/order/getPaymentMethod?t=${t}`, {
            headers: {
                'authorization': authorization
            }
        });

        console.log('Payment Method Response (支付方式响应):', response.data);
        return response.data;
    } catch (error) {
        console.error('Payment Method Error (支付方式错误):', error?.response?.data?.message || error.message); // 打印 error message
        throw new Error(error?.response?.data?.message || error.message); // 抛出 message 供上层处理
    }
}

async function checkout(trade_no, method) {
    try {
        const response = await axios.post(`${baseUrl}/order/checkout`, { trade_no: trade_no, method: method }, {
            headers: {
                'authorization': authorization,
                'Content-Type': 'application/json'
            }
        });

        console.log('Checkout Response (结算响应):', response.data);
        return response.data;
    } catch (error) {
        console.error('Checkout Error (结算错误):', error?.response?.data?.message || error.message); // 打印 error message
        throw new Error(error?.response?.data?.message || error.message); // 抛出 message 供上层处理
    }
}

async function checkOrder(trade_no) {
    const t = Date.now();
    try {
        const response = await axios.get(`${baseUrl}/order/check?trade_no=${trade_no}&t=${t}`, {
            headers: {
                'authorization': authorization
            }
        });

        console.log('Order Check Response (订单检查响应):', response.data);
        return response.data;
    } catch (error) {
        console.error('Order Check Error (订单检查错误):', error?.response?.data?.message || error.message); // 打印 error message
        throw new Error(error?.response?.data?.message || error.message); // 抛出 message 供上层处理
    }
}

async function main() {
    try {
        // 动态生成优惠码
        const couponCode = generateCouponCode();
        console.log(`Using coupon code: ${couponCode}`);

        const couponData = await checkCoupon(couponCode, 5);
        const tradeNo = await saveOrder(5, 'month_price', couponCode);
        await getOrderDetail(tradeNo);
        await getPaymentMethod();
        await checkout(tradeNo, 2);
        await checkOrder(tradeNo);
        await getOrderDetail(tradeNo);

        console.log('All requests completed successfully! (所有请求成功完成!)');

    } catch (error) {
        console.error('An error occurred during the process: (流程中发生错误:) ', error.message); // 只打印最上层函数的 message
    }
}

main();
