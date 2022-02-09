import AccountDropdown from './HelperComponents/AccountDropdown';
import GrayOverlay from './HelperComponents/GrayOverlay';
import NavBarIcons from './HelperComponents/NavBarIcons';
import Image from 'next/image';

export default function TopRightMenu({
  photoURL,
  dropdown,
  onClick,
  onClickSignOut,
}) {
  return (
    <div
      // User icon + Dropdown + Gray overlay group
      className="flex items-center gap-1 "
    >
      <NavBarIcons
        // User icon
        onClick={onClick}
        icon={
          <Image
            src={photoURL || '/images/hacker.png'}
            alt="user-profile-picture"
            width={32}
            height={32}
            unoptimized
            fill="none"
            tabIndex={1}
            className="z-20 rounded-3xl"
          />
        }
      ></NavBarIcons>
      {
        // Gray overlay when dropdown is toggled
        dropdown && <GrayOverlay zIndex="z-10" onClick={onClick} />
      }
      {
        // Drowpdown menu
        dropdown && <AccountDropdown onClickSignOut={onClickSignOut} />
      }
    </div>
  );
}
