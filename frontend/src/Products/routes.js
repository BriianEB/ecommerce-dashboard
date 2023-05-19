import ViewProducts, { loader as productsLoader } from './ViewProducts';
import CreateProduct, { action as createProductAction } from './CreateProduct';

import EditProduct, {
    loader as editProductLoader,
    action as editProductAction
} from './EditProduct';

import { api } from 'shared/utils/apiRequest';


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
            element: <CreateProduct />,
            action: createProductAction,
            handle: {crumb: () => ({ name: 'Create Product', path: '/products/create' })}
        },
        {
            path: ':id/edit',
            element: <EditProduct  />,
            loader: editProductLoader,
            action: editProductAction,
            handle: {crumb: (data) => ({ name: data.name, path: `/products/${data.id}/edit`} )}
        },
        {
            path: ':id/delete',
            action: deleteProductAction
        }
    ],
    handle: {crumb: () => ({ name: 'Products', path: '/products' })}
}

async function deleteProductAction({ params }) {
    await api.delete(`/products/${params.id}`);

    return {
        state: 'success'
    }
}

export default routes;