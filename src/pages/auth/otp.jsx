import './style.css'
import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import { Link, useNavigate } from "react-router-dom";
import { Toastify } from '../../components/toastify';
import { NetworkServices } from '../../network';
import { getToken, networkErrorHandeller, setToken } from '../../utils/helper';


const OTP = () => {
    const navigate = useNavigate();
    const [{ otp, numInputs, separator, minLength, maxLength, placeholder, inputType }, setConfig] = React.useState({
        otp: '',
        numInputs: 6,
        separator: '-',
        minLength: 0,
        maxLength: 40,
        placeholder: '',
        inputType: 'text',
    });

    const handleOTPChange = (otp) => {
        setConfig((prevConfig) => ({ ...prevConfig, otp }));
    };


    const clearOtp = () => {
        setConfig((prevConfig) => ({ ...prevConfig, otp: '' }));
    };

    const handleSubmit = async (event) => {



        event.preventDefault();

        try {
            const existRegisterData = JSON.parse(localStorage.getItem('job-media-registration-data-admin'))
     
            const response = await NetworkServices.Authentication.otpVarification(existRegisterData, otp)
         
            if (response) {
                setToken(response.data.access)
                Toastify.Success("OTP varification successfully done")
                navigate("/dashboard");
            }
        } catch (error) {
           
            networkErrorHandeller(error)
        }
    };


    return (
        <section className="container mx-12">

            <section className="flex items-center justify-center h-screen">

                <section className="p-5 shadow rounded">


                    <form onSubmit={handleSubmit}>
                        <p className="text-center text-[15px]">Please Enter the six digit code sent to your phone number !</p>
                        <div className=" my-10">
                            <OTPInput
                                inputStyle="inputStyle"
                                numInputs={numInputs}
                                onChange={handleOTPChange}
                                renderSeparator={<span>{separator}</span>}
                                value={otp}
                                placeholder={placeholder}
                                inputType={inputType}
                                renderInput={(props) => <input {...props} />}
                                shouldAutoFocus
                            />
                        </div>

                        {/* <p className="text-[12px] text-center">
                            Didn’t get the code yet ?   <Link href="/auth/resend" className=" underline text-primary">Resend</Link> instead
                        </p> */}

                        <div className="flex items-center justify-center gap-5 my-5">
                            <button className="btn-otp" type="button" disabled={otp.trim() === ''} onClick={clearOtp}>
                                Clear
                            </button>
                            <button className="btn-otp" disabled={otp.length < numInputs}>
                                Varify
                            </button>
                        </div>
                    </form>

                    {/* <p className="text-[12px] text-center">
                        Already have an account ? <Link href="/auth/login" className=" underline text-primary">Sing In</Link> instead
                    </p> */}

                </section>
            </section>

        </section>
    );
}

export default OTP