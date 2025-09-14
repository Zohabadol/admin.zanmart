import { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import ReactDatePicker from "react-datepicker";
import { useController } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

/* Text input */

export const TextInput = (props) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name: props.name,
    control: props.control,
    rules: { ...props.rules },
    defaultValue: props.defaultvalue,
  });
  return (
    <div>
      {props?.error ? (
        <p className="text-sm mb-1 text-red-500">{props.error}</p>
      ) : (
        <p className="text-sm mb-1 text-gray-500">
          {props?.label}{" "}
          <span className="text-red-500">
            {props?.rules?.required ? "*" : ""}
          </span>
        </p>
      )}
      <input
        onChange={onChange} // send value to hook form
        onBlur={onBlur} // notify when input is touched/blur
        value={value} // input value
        name={props?.name} // send down the input name
        placeholder={props?.placeholder}
        disabled={props?.disabled}
        type={props?.type || "text"}
        defaultValue={props?.defaultvalue}
        min={props?.min}
        max={props?.max}
        className={
          props.error
            ? `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border !border-danger ${props?.className}`
            : `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 ${props?.className}`
        }
      />
    </div>
  );
};

/* Password input */
export const PasswordInput = (props) => {
  const [show, setShow] = useState(false);
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name: props.name,
    control: props.control,
    rules: { ...props.rules },
    defaultValue: props.defaultvalue,
  });

  return (
    <div>
      {props.error ? (
        <p className="text-sm mb-1 text-red-500">{props.error}</p>
      ) : (
        <p className="text-sm mb-1 text-gray-500">
          {props.label}{" "}
          <span className="text-red-500">
            {props.rules.required ? "*" : ""}
          </span>
        </p>
      )}

      <div className="relative">
        <input
          onChange={onChange} // send value to hook form
          onBlur={onBlur} // notify when input is touched/blur
          value={value} // input value
          name={props.name} // send down the input name
          placeholder={props.placeholder}
          type={show ? "text" : "password"}
          disabled={props.disabled}
          className={
            props.error
              ? `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border border-danger ${props.className}`
              : `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 ${props.className}`
          }
        />

        {show ? (
          <AiOutlineEye
            size={21}
            className="cursor-pointer absolute top-3 right-3 text-gray-500"
            onClick={() => setShow(!show)}
          />
        ) : (
          <AiOutlineEyeInvisible
            size={21}
            className="cursor-pointer absolute top-3 right-3 text-gray-500"
            onClick={() => setShow(!show)}
          />
        )}
      </div>
    </div>
  );
};

/* Textarea input */
export const TextAreaInput = (props) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name: props.name,
    control: props.control,
    rules: { ...props.rules },
    defaultValue: props.defaultvalue,
  });

  return (
    <div>
      {props.error ? (
        <p className="text-sm mb-1 text-danger">{props.error}</p>
      ) : (
        <p className="text-sm mb-1 text-gray-500">{props.label}</p>
      )}

      <textarea
        onChange={onChange} // send value to hook form
        onBlur={onBlur} // notify when input is touched/blur
        value={value} // input value
        name={props.name} // send down the input name
        placeholder={props.placeholder}
        disabled={props.disabled}
        rows={props.rows || 4}
        className={
          props.error
            ? `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border border-danger ${props.className}`
            : `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 ${props.className}`
        }
      />
    </div>
  );
};

/* Date input */
export const DateInput = (props) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name: props.name,
    control: props.control,
    rules: { ...props.rules },
    defaultValue: props.defaultvalue ? new Date(props.defaultvalue) : null,
  });

  return (
    <div>
      {props.error ? (
        <p className="text-sm mb-1 text-danger">{props.error}</p>
      ) : (
        <p className="text-sm mb-1 text-gray-500">{props.label}</p>
      )}

      <div>
        <ReactDatePicker
          onChange={onChange} // send value to hook form
          onBlur={onBlur} // notify when input is touched/blur
          value={value} // input value
          name={props.name} // send down the input name
          ref={ref} // send input ref, so we can focus on input when error appear
          placeholderText={props.placeholder}
          selected={value ? new Date(value) : null}
          disabled={props.disabled}
          dateFormat="dd-MM-yyyy"
          className={
            props.error
              ? `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border border-danger ${props.className}`
              : `w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 ${props.className}`
          }
        />
      </div>
    </div>
  );
};

/* ------------------------ Single Select field -------------------- */

const customStyles = (error) => {
  const myStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: 50,
      fontSize: 14,
      color: "#000",
      background: "#fff",
      boxShadow: "none",
      "&:hover": { borderColor: "1px solid #fff" },
      border: error ? "1px solid red" : "1px solid #dfdfdf",
      borderRadius: 6,
    }),
  };
  return myStyles;
};

/* Single select field */
export const SingleSelect = (props) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name: props?.name,
    control: props.control,
    rules: { ...props.rules },
    defaultValue: props.defaultvalue,
  });
  // console.log("value",value)
  const handleSelect = (event) => {
    onChange(event);
    props.onSelected?.(event);
  };
  // ||"light"
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  // Optional: Listen for theme changes across tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      setTheme(event.detail); // Update the state with the new theme from the event
    };

    window.addEventListener("localStorageUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageChange);
    };
  }, []);

  return (
    <div className="">
      {props?.error ? (
        <p className="text-sm mb-1 text-danger text-red-500">{props?.error}</p>
      ) : (
        <p className="text-sm mb-1 text-gray-500 ">{props?.label}</p>
      )}
      <Select
        classNamePrefix={`custom-select cursor-pointer`}
        onBlur={onBlur} // notify when input is touched/blur
        value={value} // input value
        name={props?.name} // send down the input name
        styles={customStyles(props?.error, theme)}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        options={props.options}
        onChange={handleSelect}
        isClearable={props.isClearable}
        defaultValue={props.defaultvalue ? { ...props?.defaultvalue } : null}
        placeholder={props.placeholder}
        // disabled={props.disabled}
        isDisabled={props?.disabled}
      />
    </div>
  );
};

/* ------------------------ Multi Select field -------------------- */
export const MultiSelect = (props) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name: props.name,
    control: props.control,
    rules: { ...props.rules },
    defaultValue: props.defaultvalue,
  });

  const handleSelect = (event) => {
    onChange(event);
    props.onSelected?.(event);
  };

  return (
    <div>
      {props.error ? (
        <p className="text-sm mb-1 text-danger">{props?.error}</p>
      ) : (
        <p className="text-sm mb-1 text-gray-500">{props?.label}</p>
      )}

      <Select
        isMulti
        value={value}
        onBlur={onBlur}
        name={props.name}
        options={props.options}
        onChange={handleSelect}
        classNamePrefix={`custom-select`}
        styles={customStyles(props?.error)}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        isClearable={props?.isClearable}
        placeholder={props?.placeholder}
        defaultValue={
          props?.defaultvalue
            ? props.defaultvalue.map((item) => ({
                value: item?.value,
                label: item?.label,
              }))
            : null
        }
      />
    </div>
  );
};

/* ------------------------ Searchable Select field -------------------- */
export const SearchableSelect = (props) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name: props.name,
    control: props.control,
    rules: { ...props.rules },
    defaultValue: props?.defaultvalue,
  });

  /* Search from API */
  const searchOptions = (inputValue, callback) => {
    props.onSearch(inputValue).then((results) => {
      if (results) {
        setTimeout(() => {
          callback(results);
        }, 500);
      }
    });
  };

  const handleSelect = (event) => {
    onChange(event);
    props.onSelected?.(event);
  };

  return (
    <div>
      {props.error ? (
        <p className="text-sm mb-1 text-danger">{props?.error}</p>
      ) : (
        <p className="text-sm mb-1 text-gray-500">{props?.label}</p>
      )}

      <AsyncSelect
        classNamePrefix={`custom-select`}
        cacheOptions
        onBlur={onBlur} // notify when input is touched/blur
        value={value} // input value
        name={props.name} // send down the input name
        styles={customStyles(props?.error)}
        onChange={handleSelect}
        loadOptions={searchOptions}
        isClearable={props.isClearable}
        defaultValue={props.defaultvalue ? { ...props.defaultvalue } : null}
        placeholder={props.placeholder}
        loadingMessage={() => "Searching ..."}
        noOptionsMessage={() => "No results found !"}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

/* checkbox input */

export const Checkbox = ({ name, control, label, rules }) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: 0,
  });

  const toggle = () => {
    onChange(value === 1 ? 0 : 1);
  };

  return (
    <div className="mb-4">
      {/* The entire div will be clickable */}
      <label
        htmlFor={name}
        // onClick={toggle}
        className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-md w-full cursor-pointer" // Full-width clickable area
      >
        <input
          id={name}
          type="checkbox"
          checked={value === 1}
          onChange={toggle}
          onBlur={onBlur}
          className="w-5 h-5 text-green-600 rounded"
        />
        <span className="text-gray-800 text-lg font-medium">{label}</span>
        <span
          className={`ml-auto text-sm font-semibold px-3 py-1 rounded-full ${
            value === 1
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value === 1 ? "Active" : "Inactive"}
        </span>
      </label>
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

// image upload field
export const ImageUpload = (props) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control,
    rules: {
      required: props.required ? "Image is required" : false,
      validate: (file) => {
        if (!file && props.required) return "Image is required";
        return (
          !file || file.size < 2 * 1024 * 1024 || "File must be less than 2MB"
        );
      },
    },
    defaultValue: props.defaultValue || null,
  });

  const [preview, setPreview] = useState(
    value ? URL.createObjectURL(value) : props.defaultValue || null
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onChange(file);
      setPreview(URL.createObjectURL(file)); // Show file preview
      props.onUpload?.(file); // Callback for additional handling
    }
  };
  return (
    <div className="flex flex-col space-y-1">
      <span className="text-sm   text-gray-500 flex gap-1">
        {props?.label}{" "}
        <span className="text-white">{props?.rules?.required ? "*" : ""}</span>
      </span>
      <div className="relative border rounded-md w-full cursor-pointer bg-white">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onBlur={onBlur}
          onChange={handleFileChange}
        />
        <div className="flex items-center space-x-2 cursor-pointer">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-12 w-12 object-cover rounded-md cursor-pointer"
            />
          ) : (
            <div className="h-12 w-12 flex items-center justify-center bg-gray-200 rounded-md cursor-pointer">
              {props?.imgUrl ? (
                <img
                  src={`${process.env.REACT_APP_BASE_API}${props?.imgUrl}`}
                  alt="loading"
                  className="h-12 w-12 object-cover rounded-md cursor-pointer"
                />
              ) : (
                "📷"
              )}
            </div>
          )}
          <span className="text-gray-700">Click to upload</span>
        </div>
      </div>
      {props?.error && (
        <p className="text-xs text-red-500 pl-3.5">{props?.error}</p>
      )}
    </div>
  );
};
