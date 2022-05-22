import Loggin from "./component/loggin";
import {Route ,  BrowserRouter as Router , Routes} from "react-router-dom";
import ChatRoom from "./component/chatRoom";

function App() {
  return (
    <div className="App">
       <Routes>
           <Route path="/" element={<Loggin/>}/>
           <Route path="/chatroom" element={<ChatRoom/>}/>

       </Routes>
    </div>
  );
}

export default App;
