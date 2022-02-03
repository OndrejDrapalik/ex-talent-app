import '../styles/index.css';
import Navbar from '../components/Navbar';
import { UserContext, NavbarContext } from '../lib/context';
import { useUserData } from '../lib/hooks';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
