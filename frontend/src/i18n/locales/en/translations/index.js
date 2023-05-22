import actions from './actions';
import dashboard from './dashboard';
import table from './table';
import orders from './orders';
import products from './products';

export default {
    ...actions,
    ...dashboard,
    ...table,
    ...orders,
    ...products
};