import Chat from "./components/Chat";
import { selectUsername } from "./store/userSlice";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Register from "./components/Register";


function App() {

  const userName = useSelector(selectUsername);

  return (
    <Router>
      <Switch>
        <Route path='/chats'>
          {
            userName != null ? <Chat /> : <Redirect to='/' />
          }
          
        </Route>
        <Route path='/' >
          <Register />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
