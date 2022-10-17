const { rupiahFormat } = require('../casts.helper');

const summaryTransformer = (cart) => {
    const originalPrice = cart.reduce((acc, item) => acc + item.series.price, 0);
    const totalSaleDiscount = cart.reduce((acc, item) => {
        if (item.series.is_discount) {
            return acc + item.series.price - item.series.discount_price;
        }
        return acc;
    }, 0);
    const subTotal = cart.reduce((acc, item) => {
        const total = item.series.is_discount ? item.series.discount_price : item.series.price;
        return acc + total;
    }, 0);

    return {
        price: {
            raw: originalPrice,
            formatted: rupiahFormat(originalPrice),
        },
        sale_discount: {
            raw: totalSaleDiscount,
            formatted: rupiahFormat(totalSaleDiscount),
        },
        sub_total: {
            raw: subTotal,
            formatted: rupiahFormat(subTotal),
        },
        total_items: cart.length,
    };
};

module.exports = {
    CartSummaryTransformer: (cart) => ({
        ...summaryTransformer(cart),
    }),
};
