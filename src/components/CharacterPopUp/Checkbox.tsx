import React from 'react';

interface ICheckbox {
  isChecked: boolean;
}

const Checkbox = ({ isChecked }: ICheckbox) => {
  return (
    <label className='flex items-center p-5'>
      <input
        type='checkbox'
        checked={isChecked}
        className='form-checkbox h-5 w-5'
      />
    </label>
  );
};

export default Checkbox;
