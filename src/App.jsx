
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import appStore from "./utils/appStore"
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  
  return (
    <>
    <Provider store={appStore} >
    <BrowserRouter basename="/">
    <Routes>
      <Route path = "/"  element={<Body />}>
        <Route path = "/login" element= {<Login/>} />
        <Route path = "/users/feed" element= {<Feed />} />
        <Route path = "/profile" element= {<Profile />} />
        <Route path = "/user/connections" element={<Connections />} />
        <Route path = "/user/requests/received" element= {<Requests />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </Provider>
  </>
  )
}

export default App
