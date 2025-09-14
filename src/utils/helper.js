import { Toastify } from "../components/toastify";
// token set in cookie 

const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 1 * 60 * 60 * 1000)); // Convert days to milliseconds
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/; Secure; SameSite=Strict`;
  };
//   get token using cookie 
  const getCookie = (name) => {
    const cookieArr = document.cookie.split(';');
    
    for (let cookie of cookieArr) {
      cookie = cookie.trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.split('=')[1];
      }
    }
    return null; // Return null if the cookie is not found
  };
//   remove token from cookie 
  const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict`;
  };
export const getToken = () => {
   
    
    return  getCookie("zan_mart_admin_token");
}



/* set token */
export const setToken = (token) => {
    
    return setCookie("zan_mart_admin_token", token, 7);
    // return localStorage.setItem("token", token);
}

/* remove token */
export const removeToken = () => {
    return removeCookie("zan_mart_admin_token")
};

/* Global network error handeller */
export const networkErrorHandeller = (error) => {
    
    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errors
    ) {
        error.response.data.errors.map((item) => {
            return <span className="">{Toastify.Error( error?.response?.data?.errors[0])}</span>
        });
    } else {
        return Toastify.Error("Something going wrong, Try again.");
    }
};



/* Gender data */
export const genderList = [
    {
        label: "male",
        value: "male",
    },
    {
        label: "female",
        value: "female",
    },
    {
        label: "Both",
        value: "Both",
    },
];

/* Gender data */
export const circularStatus = [
    {
        label: "publish",
        value: "publish",
    },
    {
        label: "draft",
        value: "draft",
    },
];

/* Gender data */
export const userType = [
    {
        label: "user",
        value: "user",
    },
    {
        label: "admin",
        value: "admin",
    },
];


/* Gender data */
export const employeeStatus = [
    {
        label: "Full Time",
        value: "Full time",
    },
    {
        label: "Part Time",
        value: "Part Time",
    },
    {
        label: "Contractual",
        value: "Contractual",
    },
    {
        label: "Freelance",
        value: "Freelance",
    },
    {
        label: "Internship",
        value: "Internship",
    },
    {
        label: "Temporary",
        value: "Temporary",
    },
    {
        label: "Permanent",
        value: "Permanent",
    },
    {
        label: "Seasonal",
        value: "Seasonal",
    },
    {
        label: "Remote",
        value: "Remote",
    },
    {
        label: "Consultancy",
        value: "Consultancy",
    },
];

export const responseChecker = (response,status_code=200) => {
    if ((response && response.status == status_code) || response.status == 201) {
      return true;
    } else {
      return false;
    }
  };