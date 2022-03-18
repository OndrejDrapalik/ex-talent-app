import { FaMoon, FaSun } from 'react-icons/fa';
import { useDarkMode } from '../../lib/hooks/useDarkMode';
import NavBarIcons from './HelperComponents/NavBarIcons';

export default function ThemeIcon() {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <NavBarIcons icon={<FaSun size="24" />} />
      ) : (
        <NavBarIcons icon={<FaMoon size="24" />} />
      )}
    </span>
  );
}
