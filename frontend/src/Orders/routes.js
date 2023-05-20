import i18n from 'i18next';

import ViewOrders from "./ViewOrders";
import CreateOrder from "./CreateOrder";

import { api } from 'shared/utils/apiRequest';


const routes = {
    path: 'orders',
    children: [
        {
            index: true,
            element: <ViewOrders />,
            loader: () => api.get('/orders')
        },
        {
            path: 'create',
            element: <CreateOrder />
        }
    ],
    handle: {crumb: () => ({
        name: i18n.t('orders.label'),
        path: '/orders'
    })}
};

export default routes;