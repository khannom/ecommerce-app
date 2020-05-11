import React from 'react';
import {withRouter} from 'react-router-dom';
//vamos a usar withRouter para que nuestro componente tenga acceso a las props de Route

import './menu-item.styles.scss';

//`` pueden incluir cualquier codigo de javascript
//className puede tener varias clases, se separan con un espacio
//qué es history.push() o.O xddd
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div 
    className={`menu-item ${size}`} 
    onClick={() => history.push(`${match.url}${linkUrl}`)}>
    <div
      className='background-image'
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
);

export default withRouter(MenuItem);
