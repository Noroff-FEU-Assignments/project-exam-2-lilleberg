import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Establishments from "./pages/Establishments/Establishments";
import EstablishmentSpecific from "./pages/EstablishmentSpecific/EstablishmentSpecific";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import ContactMessages from "./pages/ContactMessages/ContactMessages";
import Enquiries from "./pages/Enquiries/Enquiries";
import NewEstablishment from "./pages/NewEstablishment/NewEstablishment";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Navigation from "./components/layout/Navigation/Navigation";
import Footer from "./components/layout/Footer/Footer";
import { AuthProvider } from "./context/AuthContext";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <header>
            <Navigation />
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/establishments" element={<Establishments />} />
              <Route
                path="/establishment/:id"
                element={<EstablishmentSpecific />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin/contact-messages"
                element={<ContactMessages />}
              />
              <Route path="/admin/enquiries" element={<Enquiries />} />
              <Route
                path="/admin/new-establishment"
                element={<NewEstablishment />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
