import actions from './actions';
import auth from './auth';
import dashboard from './dashboard';
import table from './table';
import orders from './orders';
import products from './products';
import validations from './validations';

const translations = {
    ...actions,
    ...auth,
    ...dashboard,
    ...table,
    ...orders,
    ...products,
    ...validations
};

export default translations;