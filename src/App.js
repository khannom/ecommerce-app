import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selectors';

// exact == exact = {true}
// si exact es true, la page no se renderea a menos que la url sea exacta

// cuando un route matchea dentro de un switch, solo se renderea dicho route y nada mas
// solo sirve para mas control
class App extends React.Component{
   
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;

    // onAuthStateChanged() siempre esta ejecutandose, no tenemos que fetchear datos manualmente
    // cada vez que fetch() se ejecuta, monta la pagina denuevo, eso es malo xd
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        //onSnapShot() es como onAuthStateChanged(), se llama cada que sucede un cambio en el snapshot
        //esta funcion retorna siempre un snapshot la 1era vez que se ejecuta
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      }
      else{
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route 
            exact 
            path='/signin' 
            render={() => (
              this.props.currentUser ? (
                <Redirect to = '/' />
              ) : (
                <SignInAndSignUpPage/>
              )
            )} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
});


//mapDispatchToProps es la función que va a enviar currentUser al rootReducer.
const mapDispatchToProps = dispatch => ({
  //dispatch() es una funcion de redux que se va a encargar de enviar la accion a todos los reducers de la app
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);