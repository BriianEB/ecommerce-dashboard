import { api } from 'shared/utils/apiRequest';

import ViewOrders from "./ViewOrders";
import CreateOrder from "./CreateOrder";


const routes = {
    path: 'orders', children: [
        { index: true, element: <ViewOrders />, loader: () => api.get('/orders') },
        { path: 'create', element: <CreateOrder /> }
    ]
};

export default routes;