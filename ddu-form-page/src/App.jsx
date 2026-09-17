import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import user from './config.jsx';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import GlobalStyles from "./styles/global-styles.jsx";
import RegistrationForm from './components/form/form-component.jsx';
import { translations } from './translations.jsx';

function App() {
  const [language, setLanguage] = useState('en'); // English by default
  const t = translations[language];
  return <><GlobalStyles /><Header user={user} language={language} onLanguageChange={setLanguage}/><main><div className="container"><div className="row"><div className="col-lg-10 offset-lg-1 col-md-12"><h2>{t.greeting}</h2><p className='mb-5'>{t.intro}</p><RegistrationForm language={language} /></div></div></div></main><Footer language={language} /></>;
}
export default App;
