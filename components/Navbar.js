import Link from 'next/link';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { UserContext } from '../lib/context';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import {
  FaUserCircle,
  FaHome,
  FaPlus,
  FaRegArrowAltCircleRight,
  FaUserPlus,
} from 'react-icons/fa';

import AccountDropdown from './AccountDropdown';
import { getDisplayName } from 'next/dist/shared/lib/utils';
import GrayOverlay from './GrayOverlay';

/// Top navbar
export default function Navbar({}) {
  const { user } = useContext(UserContext);
  const [dropdown, setDropdown] = useState(false);
  const [text, setText] = useState(false);

  const signInWithGoogle = async () => {
    const userObject = await auth.signInWithPopup(googleAuthProvider);
    await saveData(userObject);
  };

  const saveData = async (props) => {
    const userData = props.user.multiFactor.user;
    console.log('logged in user', userData);
    const userDoc = firestore.doc(`users/${userData.uid}`);
    const payload = userDoc.set({
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      email: userData.email,
    });
  };

  return (
    <>
      <div
        // NAV BAR
        // add custom values with "h-[56px]""
        className="top-0 w-screen h-16  px-6
                  flex flex-row justify-between items-center
                  bg-secondary text-primary shadow-mg"
      >
        <div
          // Home button
          className="flex items-center text-purple-400 hover:text-white"
        >
          {<FaHome size="36" />}
        </div>

        <div
        // Right side icons
        >
          {
            // User logged in
            user && (
              <div className="relative flex items-center gap-4 ">
                <div
                  // Add entry +gray overlay group
                  className="flex items-center gap-1 group"
                >
                  <span className="navbar-tooltip group-hover:scale-100">
                    add your entry 🖋
                  </span>
                  <NavBarIcons
                    onClick={() => setText(!text)}
                    icon={<FaPlus size="20" />}
                  />
                  {
                    // Gray overlay when Add entry is toggled
                    text && (
                      <GrayOverlay
                        zIndex="z-30"
                        onClick={() => setText(!text)}
                      />
                    )
                  }
                </div>

                <div
                  // User icon + gray overlay group
                  className="flex items-center gap-1 "
                >
                  <NavBarIcons
                    // User icon
                    onClick={() => setDropdown(!dropdown)}
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
                        onClick={() => setDropdown(!dropdown)}
                      />
                    )
                  }
                  {
                    // Drowpdown menu
                    dropdown && (
                      <AccountDropdown
                        onClickSignOut={() => {
                          auth.signOut();
                          setDropdown(!dropdown);
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
                    Sign up before you add your entry 🖋
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
