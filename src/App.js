import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './LogIn.js'

class App extends Component {
  constructor(){
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      },
      debits: {},
      credits: {}
    }
  }


  componentDidMount(){
    this.fetchDebitsCredits();
  }

  componentDidUpdate(prevProps, prevState) {
  if (this.state.debits !== debits ) {
    this.setState({ debits: debits });
  }
}

  fetchDebitsCredits = () => {
    fetch('https://moj-api.herokuapp.com/debits')
      .then((res) => (res.json()))
      .then(res => (this.setState((state, props) => {return{debits: res.map((obj) => obj.amount)}})))
      .then(console.log(this.state.debits))
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  render(){
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)


    return (
      <Router>
        <Switch>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
