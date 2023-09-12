import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { CreateTodos } from "./pages/create-todos";
import { SavedTodos } from "./pages/saved-todos";
import { Navbar } from "./components/navbar";


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>

        <Route path="/" element={<Home />} />


        <Route path="/auth" element={<Auth />} />


        <Route path="/create-todos" element={<CreateTodos />} />


        <Route path="/saved-todos" element={<SavedTodos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
