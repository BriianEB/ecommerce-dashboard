import { api } from 'shared/utils/apiRequest';


export async function action({ params }) {
    await api.delete(`/products/${params.id}`);

    return {
        state: 'success'
    }
}