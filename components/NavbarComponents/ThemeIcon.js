import { CheckmarkIcon } from 'react-hot-toast';
import { useDarkMode } from '../../lib/hooks/useDarkMode';
import { Sparkles, Sun } from './HelperComponents/IconsSvg';
import NavBarIcons from './HelperComponents/NavBarIcons';

export default function ThemeIcon() {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <NavBarIcons
          icon={
            <Sun
              className="stroke-light hover:stroke-accent transition-all
            duration-300 ease-linear"
            />
          }
        />
      ) : (
        <NavBarIcons
          icon={
            <Sparkles
              className="stroke-darkest hover:stroke-accent transition-all
            duration-300 ease-linear"
            />
          }
        />
      )}
    </span>
  );
}
