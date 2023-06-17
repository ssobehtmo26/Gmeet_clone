import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import { Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
     <Routes>
      {/* <Switch> */}
      <Route path="/" element={<HomePage />} />
      <Route path="/callPage" element={<Callpage />} />
        {/* <Route exact path="/home">
          <HomePage />
        </Route> */}
        
      {/* </Switch> */}
    </Routes>
=======
      <Routes>
        <Route path="/" exact element={<CreateRoom/>} />
        <Route path="/room" element={<Room/>} />
      </Routes>
>>>>>>> 795787c59935e80e6e1eee71f4c24ab4275f42a9
    </BrowserRouter>
  );
}

export default App;
