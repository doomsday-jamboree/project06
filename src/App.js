import React, { Component } from 'react';
import './App.css';
import './styles/map.css';
import firebase from 'firebase';
import Login from './components/Login.js';
import Intro from './components/Intro.js';
import Bunker from './components/Bunker.js';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import Map from './components/Map.js';

//sets google as the authentication provider thru firebase
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

//we changed database read and write rules in firebase 
class App extends Component {
  constructor() {
    super();
    this.state = {
      userName: null,
      bunker: "alex"
    };
  }
  //set state by default to null (upon home page load, no username)

  //function that gets the user in upon clicking the 'login' button (conditionally rendered)
  login = () => {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        userName: user
      });
    });
  };

  //function that logs out upon clicking the 'logout' button
  logout = () => {
    auth.signOut().then(() => {
      this.setState({
        userName: null
      });
    });
  };

  guest = () => {
    const guestName = {
      displayName: "Guest"
    };
    this.setState({
      userName: guestName
    });
  };

  setBunker = event => {
    //Search for specific bunker from bunkerList and set as current Bunker
    //2. Make firebase call get info on specific bunker? Set as list
    const bunkerChoice = event.target.value;
    this.setState({
      bunker: bunkerChoice
    });
  };

  //upon page load, if a user is logged in, persist the login
  componentDidMount() {
    //Fetch All Bunkers
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          userName: user
        });
      }
    });
  }
  render() {


    return (
      /*pass dynamic CSS background image based on 'bunker'*/
      <div className={`App + ${this.state.bunker}`}>
        {this.state.userName ? (
          <Header logout={this.logout} user={this.state.userName.displayName} />
        ) : null}
        <div className="wrapper">
          <main>
            <div>
              {/* used ternary operator to check if userName is truthy then show Bunker component otherwise show Login component */}
              {this.state.userName ?
                <div>
                  <Intro />
                  <form className="bunkerNames" action="" onChange={this.setBunker}>

                      <input type="radio" name="bunkerChoice" defaultChecked="alex" id="alex" value="alex" />
                      <label htmlFor='alex'><span>Alex's</span> Bunker</label>
               
                      <input type="radio" name="bunkerChoice" id="glen" value="glen" />
                      <label htmlFor="glen"><span>Glen's</span> Bunker</label>
                 
                      <input type="radio" name="bunkerChoice" id="oiza" value="oiza" />
                      <label htmlFor="oiza"><span>Oiza's</span> Bunker</label>
                  
                      <input type="radio" name="bunkerChoice" id="zoe" value="zoe" /> 
                      <label htmlFor="zoe"><span>Zoe's</span> Bunker</label>
                  </form>

                  <Bunker
                    userName={this.state.userName}
                    choice={this.state.bunker}
                  />
                  <div className="mapSection">
                    <Map choice={this.state.bunker}/>
                  </div>
                </div>
               : 
                <Login
                  userName={this.state.userName}
                  login={this.login}
                  guest={this.guest}
                />
              }
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}
export default App;
