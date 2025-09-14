import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (page=1, perPage=10) => {
    return await privateRequest.get(`/admin/product?page=${page}&per_page=${perPage}`);
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/product', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/product/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.post(`/admin/product/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/product/${id}`)
}
// update best selling product 
export const bestSellingProduct = async(ids)=>{
    return await privateRequest.post(`/admin/assign/best-selling-product`,{products:ids})
}
export const removeBestSellingProduct = async(ids)=>{
    return await privateRequest.post(`/admin/remove-assign/best-selling-product`,{products:ids})
}
/** category list */
export const categoryList = async () => {
    return await privateRequest.get(`/admin/product/`);
};
