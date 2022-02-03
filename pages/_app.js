import '../styles/index.css';
import Navbar from '../components/Navbar';
import AppState from '../lib/contexts/AppState';

function MyApp({ Component, pageProps }) {
  return (
    <AppState>
      <Navbar />
      <Component {...pageProps} />
    </AppState>
  );
}

export default MyApp;
