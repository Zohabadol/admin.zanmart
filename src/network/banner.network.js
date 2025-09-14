import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (page=1, perPage=10) => {
    return await privateRequest.get(`/admin/banner?page=${page}&page_size=${perPage}`);
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/banner', data)
}
// banner ways to product 
export const homepagebannerproduct = async(data) => {
    return await privateRequest.post('/admin/banner-product', data)
}
// banner ways to product 
export const homepagebannershowproduct = async(id) => {
    return await privateRequest.get(`/admin/banner-product/${id}`)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/banner/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.post(`/admin/banner/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/banner/${id}`)
}

/** banner list */
export const bannerList = async () => {
    return await privateRequest.get(`/admin/banner/`);
};
