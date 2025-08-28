import React from 'react';

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-yellow-400" 
      
      >
        {labelName}
      </label>
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="font-semibold text-xs bg-yellow-400 hover:bg-yellow-500 
                     text-black py-1 px-2 rounded-md shadow-md transition duration-200
                     hover:shadow-[0_0_8px_2px_rgba(255,255,0,0.7)]"
        >
          Surprise me
        </button>
      )}
    </div>
    <input
      type={type}
      id={name}
      name={name}
      className="bg-black border border-gray-700 text-white text-sm rounded-lg 
                 focus:border-white focus:shadow-[0_0_8px_2px_rgba(255,255,255,0.7)] 
                 outline-none block w-full p-3 placeholder-gray-400 transition duration-200"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

export default FormField;
