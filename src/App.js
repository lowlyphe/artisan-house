import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Homepage from './components/Homepage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Homepage />
      <Footer />
    </div>
  );
}

export default App;
