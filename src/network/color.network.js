import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (page, perPage) => {
    return await privateRequest.get(`/admin/color?page=${page}&page_size=${perPage}`);
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/color', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/color/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.put(`/admin/color/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/color/${id}`)
}

/** color list */
export const colorList = async () => {
    return await privateRequest.get(`/admin/color/`);
};
