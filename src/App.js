import React from 'react';
import {Route, Switch} from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import {auth} from './firebase/firebase.utils';

// exact == exact = {true}
// si exact es true, la page no se renderea a menos que la url sea exacta

// cuando un route matchea dentro de un switch, solo se renderea dicho route y nada mas
// solo sirve para mas control
class App extends React.Component{
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }
  
  unsubscribeFromAuth = null;

  componentDidMount(){
    // onAuthStateChanged() siempre esta ejecutandose, no tenemos que fetchear datos manualmente
    // cada vez que fetch() se ejecuta, monta la pagina denuevo, eso es malo xd
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user});
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
