import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import user from './config.jsx';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import GlobalStyles from "./styles/global-styles.jsx";
import RegistrationForm from './components/form/form-component.jsx';


function App() {
  
  return (
    <>
    <GlobalStyles />
      <Header user={user}></Header>
      <main>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 col-md-12">
              <h2>Hi, Valentyn Starushok</h2>
              <p className='mb-5'>Thank you for using our service. Below you will find all the relevant details about your parcel, including information on how to make a payment for customs and VAT.</p>

              <RegistrationForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
