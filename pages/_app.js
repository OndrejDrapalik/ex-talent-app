import '../styles/index.css';
import Navbar from '../components/Navbar';
import { UserContext, NavbarContext } from '../lib/contexts/user-context';
import { useUserData } from '../lib/hooks';
import AppState from '../lib/contexts/AppState';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <AppState>
        <Navbar />
        <Component {...pageProps} />
      </AppState>
    </UserContext.Provider>
  );
}

export default MyApp;
