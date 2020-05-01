import React from 'react';

import './custom-buttom.styles.scss';

//children es el texto que le mandan dentro de las etiquetas
const CustomButton = ({ children, ...otherProps }) => (
  <button className='custom-button' {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
