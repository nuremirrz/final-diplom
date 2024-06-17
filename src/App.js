import './App.css';
import {Router, Routes, Route, TitlePage, MainPage, SignInPage, SignUpPage, TliPage, TsiPage, CalculatorPage, InfoPage, HydrochemicalPage} from './pages'

function App() {
  return (    
      <>  
        <Router>
          <Routes>
            <Route path="/" element={<TitlePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/tli" element={<TliPage />} />
            <Route path="/tsi" element={<TsiPage />} />
            <Route path="/hydrochem" element={<HydrochemicalPage />} />
            <Route path="/calculate" element={<CalculatorPage />} />
            <Route path="/info" element={<InfoPage />} />
          </Routes>
        </Router>
      </>    
  );
}

export default App;
