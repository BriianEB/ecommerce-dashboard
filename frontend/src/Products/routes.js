import ViewProducts, { loader as productsLoader } from './ViewProducts';
import CreateProduct from './CreateProduct';

import EditProduct, {
    loader as editProductLoader,
    action as editProductAction
} from './EditProduct';


const routes = {
    path: 'products',
    children: [
        {
            index: true,
            element: <ViewProducts />,
            loader: productsLoader
        },
        {
            path: 'create',
            element: <CreateProduct />
        },
        {
            path: ':id/edit',
            element: <EditProduct  />,
            loader: editProductLoader,
            action: editProductAction
        }
    ]
}

export default routes;