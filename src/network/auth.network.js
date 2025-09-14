import {publicRequest} from '../config/axios.config'

export const login = async (data) => {
    
    return await publicRequest.post(`login`, data);
};

export const registration = async (data) => {
    return await publicRequest.post(`/account/users/`, data);
};

export const otpVarification = async (data, otp) => {
    return await publicRequest.post(`/account/users/?otp=${otp}`, data);
};