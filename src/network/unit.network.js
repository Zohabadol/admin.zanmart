import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (page, perPage) => {
    return await privateRequest.get(`/admin/unit?page=${page}&page_size=${perPage}`);
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/unit', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/unit/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.put(`/admin/unit/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/unit/${id}`)
}

/** unit list */
export const unitList = async () => {
    return await privateRequest.get(`/admin/unit/`);
};
