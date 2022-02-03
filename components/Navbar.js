import Link from 'next/link';
import Image from 'next/image';
import { auth } from '../lib/firebase';
import { FaHome, FaPlus, FaUserPlus } from 'react-icons/fa';

import AccountDropdown from './AccountDropdown';
import GrayOverlay from './GrayOverlay';

// Top navbar
export default function Navbar({
  user,
  dropdown,
  text,
  effect,
  signInWithGoogle,
  onAnimationEnd,
  onClickSetEntryTrue,
  onClickFlipEffectState,
  onClickFlipDropdownState,
}) {
  return (
    <>
      <div
        // NAV BAR
        /// add custom values with "h-[56px]""
        className="top-0 w-screen h-16  px-6
                  flex flex-row justify-between items-center
                  bg-secondary text-primary shadow-mg"
      >
        <Link href={'/'} passHref>
          <div
            // Home button + some test animation on click w effect state
            /// animation only works when Plus sign button is clicked
            className={`flex items-center text-purple-400 z-50 hover:text-white ${
              effect && 'animate-spin'
            } `}
            onAnimationEnd={onAnimationEnd}
          >
            {<FaHome size="36" />}
          </div>
        </Link>

        <div
        // Right side icons
        >
          {
            // User logged in
            user && (
              <div className="relative flex items-center gap-4 ">
                <Link href={`/admin/${user.uid}`} passHref>
                  <div
                    // Add entry plus icon + animation on hover
                    className="flex items-center gap-1 group"
                  >
                    <span
                      /// animation only works when there's not a text input field
                      className={`navbar-tooltip ${
                        !text && 'group-hover:scale-100'
                      }`}
                    >
                      🖋 Add your entry
                    </span>
                    <NavBarIcons
                      icon={<FaPlus size="20" />}
                      onClick={(onClickFlipEffectState, onClickSetEntryTrue)}
                    />
                  </div>
                </Link>

                <div
                  // User icon + Dropdown + Gray overlay group
                  className="flex items-center gap-1 "
                >
                  <NavBarIcons
                    // User icon
                    onClick={onClickFlipDropdownState}
                    icon={
                      <Image
                        loader={() => user?.photoURL}
                        src={user?.photoURL}
                        alt="profile pic"
                        width="32"
                        height="32"
                        fill="none"
                        tabIndex={1}
                        className="rounded-3xl z-20"
                      />
                    }
                  ></NavBarIcons>
                  {
                    // Gray overlay when dropdown is toggled
                    dropdown && (
                      <GrayOverlay
                        zIndex="z-10"
                        onClick={onClickFlipDropdownState}
                      />
                    )
                  }
                  {
                    // Drowpdown menu
                    dropdown && (
                      <AccountDropdown
                        onClickSignOut={() => {
                          auth.signOut();
                          onClickFlipDropdownState;
                        }}
                      />
                    )
                  }
                </div>
              </div>
            )
          }
          {
            // User NOT logged in
            !user && (
              <div className="relative flex items-center gap-4">
                <div className="relative flex items-center gap-1 group">
                  <span className="navbar-tooltip group-hover:scale-100">
                    🖋 Sign up before you add your entry
                  </span>
                  <NavBarIcons
                    onClick={signInWithGoogle}
                    icon={<FaPlus size="20" />}
                  />
                </div>
                <NavBarIcons
                  onClick={signInWithGoogle}
                  icon={<FaUserPlus size="26" />}
                />
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}

/* Custom class implementation */
const NavBarIcons = ({ icon, onClick }) => (
  <div onClick={onClick} className="navbar-icons">
    {icon}
  </div>
);
