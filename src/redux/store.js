import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

//el arreglo middelWares va a almacenar todos los middleware que querramos usar
//el logger es un middleware que printea en consola el estado antes y despues
//de una accion
const middleWares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;