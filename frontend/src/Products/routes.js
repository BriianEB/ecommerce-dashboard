import i18n from 'i18next';

import ViewProducts, { loader as productsLoader } from './ViewProducts';
import CreateProduct, { action as createProductAction } from './CreateProduct';

import EditProduct, {
    loader as editProductLoader,
    action as editProductAction
} from './EditProduct';

import { action as deleteProductAction } from './DeleteProduct';


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
            handle: {crumb: () => ({
                name: `${i18n.t('actions.create')} ${i18n.t('products.product.product')}`,
                path: '/products/create'
            })}
        },
        {
            path: ':id/edit',
            element: <EditProduct  />,
            loader: editProductLoader,
            action: editProductAction,
            handle: {crumb: (data) => ({
                name: data.name,
                path: `/products/${data.id}/edit`
            })}
        },
        {
            path: ':id/delete',
            action: deleteProductAction
        }
    ],
    handle: {crumb: () => ({
        name: i18n.t('products.label'),
        path: '/products'
    })}
}

export default routes;