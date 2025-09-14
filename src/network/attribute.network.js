import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (page, perPage) => {
    return await privateRequest.get(`/admin/attribute?page=${page}&page_size=${perPage}`);
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/attribute', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/attribute/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.put(`/admin/attribute/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/attribute/${id}`)
}

/** attribute list */
export const attributeList = async () => {
    return await privateRequest.get(`/admin/attribute/`);
};
