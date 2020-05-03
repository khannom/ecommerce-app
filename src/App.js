import React from 'react';
import {Route, Switch} from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

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
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        //onSnapShot() es como onAuthStateChanged(), se llama cada que sucede un cambio en el snapshot
        //esta funcion retorna siempre un snapshot la 1era vez que se ejecuta
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
          console.log(this.state);
        });
        
      }
      else{
        console.log(userAuth);
        this.setState({currentUser: userAuth});
      }
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
