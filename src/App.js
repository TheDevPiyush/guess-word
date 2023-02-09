import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Route exact path="/home">
          <Home />

        </Route>
        <Route exact path="/">
          <Home />

        </Route>
        <Route exact path="/about">
          <About />
        </Route>


      </BrowserRouter>
    </>
  );
}

export default App;
