import React, { useContext } from 'react';
import { AppContext } from '../lib/contexts/app-context';
import { UserContext } from '../lib/contexts/user-context';

import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import Link from 'next/link';

import Image from 'next/image';
import { FaHome, FaPlus, FaUserPlus, FaEdit } from 'react-icons/fa';

import AccountDropdown from './AccountDropdown';
import GrayOverlay from './GrayOverlay';

// Top navbar
export default function Navbar() {
  const { user, entryCheck } = useContext(UserContext);
  const { dropdown, setDropdown, entry, setEntry, effect, setEffect } =
    useContext(AppContext);

  const signInWithGoogle = async () => {
    const userObject = await auth.signInWithPopup(googleAuthProvider);
    await saveData(userObject);
  };

  const saveData = async (props) => {
    const userData = props.user.multiFactor.user;
    console.log('logged in user', userData);
    const userDoc = firestore.doc(`users/${userData.uid}`);
    userDoc.set({
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      email: userData.email,
    });
  };

  // const entryDoc = true;

  return (
    <>
      <div
        // NAV BAR
        /// add custom values with "h-[56px]""
        className="bg-secondary text-primary shadow-mg  top-0
                  flex h-16 w-screen flex-row
                  items-center justify-between px-[5vw] lg:px-[6vw] xl:px-[15vw] 2xl:px-[22vw]"
      >
        <Link href={'/'} passHref>
          <div
            // Home button + some test animation on click w effect state
            /// animation only works when Plus sign button is clicked
            className={`z-10 flex items-center text-purple-400 hover:text-white ${
              effect && 'animate-spin'
            } `}
            onAnimationEnd={() => setEffect(false)}
          >
            {<FaHome size="36" />}
          </div>
        </Link>

        <div
        // Right side icons
        >
          {
            // ICONs conditional rendering
            user ? (
              // User logged
              entryCheck ? (
                <div className="relative flex items-center gap-4 ">
                  <Link href={`/admin/${user.uid}`} passHref>
                    <div
                      // Add entry plus icon + animation on hover
                      className="group flex items-center gap-1"
                    >
                      <span
                        /// animation only works when there's not a text input field
                        className={`navbar-tooltip ${
                          !entry && 'group-hover:scale-100'
                        }`}
                      >
                        🖋 Edit your entry
                      </span>
                      <NavBarIcons
                        icon={<FaEdit size="20" />}
                        onClick={() => {
                          setEffect(!effect);
                          setEntry(true);
                        }}
                      />
                    </div>
                  </Link>

                  <div
                    // User icon + Dropdown + Gray overlay group
                    className="flex items-center gap-1 "
                  >
                    <NavBarIcons
                      // User icon
                      onClick={() => setDropdown(!dropdown)}
                      icon={
                        <Image
                          src={user?.photoURL || '/images/hacker.png'}
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
                          onClickSignOut={() => auth.signOut()}
                        />
                      )
                    }
                  </div>
                </div>
              ) : (
                // User logged in but didnt create post yet
                <div className="relative flex items-center gap-4 ">
                  <Link href={`/admin/${user.uid}`} passHref>
                    <div
                      // Add entry plus icon + animation on hover
                      className="group flex items-center gap-1"
                    >
                      <span
                        /// animation only works when there's not a text input field
                        className={`navbar-tooltip ${
                          !entry && 'group-hover:scale-100'
                        }`}
                      >
                        🖋 Add your entry
                      </span>
                      <NavBarIcons
                        icon={<FaPlus size="20" />}
                        onClick={() => {
                          setEffect(!effect);
                          setEntry(true);
                        }}
                      />
                    </div>
                  </Link>

                  <div
                    // User icon + Dropdown + Gray overlay group
                    className="flex items-center gap-1 "
                  >
                    <NavBarIcons
                      // User icon
                      onClick={() => setDropdown(!dropdown)}
                      icon={
                        <Image
                          src={user?.photoURL || '/images/hacker.png'}
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
                          onClickSignOut={() => auth.signOut()}
                        />
                      )
                    }
                  </div>
                </div>
              )
            ) : (
              // User NOT logged in
              <div className="relative flex items-center gap-4">
                <NavBarIcons
                  onClick={() => {
                    signInWithGoogle();
                    setDropdown(!dropdown);
                  }}
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
