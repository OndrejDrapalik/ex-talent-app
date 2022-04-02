import '../styles/index.css';
import Navbar from '../components/Navbar';
import AppState from '../lib/contexts/AppState';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <AppState>
      <Component {...pageProps} />
      <Footer />
    </AppState>
  );
}

export default MyApp;
