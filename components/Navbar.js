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

/// Top navbar
export default function Navbar({}) {
  const { user } = useContext(UserContext);
  const [dropdown, setDropdown] = useState(false);

  // EXPERIMENTAL - delete later
  const scale = dropdown ? null : 'scale-zero';
  console.log(scale);

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
        // Right side iccons
        >
          {
            // User logged in
            user && (
              <div className="relative flex items-center gap-4 ">
                <div
                  // Add entry
                  className="flex items-center gap-1 group"
                >
                  <span className="navbar-tooltip group-hover:scale-100">
                    add your entry 🖋
                  </span>
                  <NavBarIcons icon={<FaPlus size="20" />} />
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
                        className=" rounded-3xl z-10"
                      />
                    }
                  ></NavBarIcons>
                  {
                    // Gray overlay when dropdown is toggled
                    dropdown && (
                      <button
                        onClick={() => setDropdown(!dropdown)}
                        className={`fixed top-0 right-0 bottom-0 left-0 w-full h-full
                              bg-gray-900 opacity-50 
                              ${scale} transform transition-all duration-300 ease-linear
                              cursor-default`}
                      />
                    )
                  }
                </div>
                {
                  // Drowpdown menu
                  dropdown && <AccountDropdown onClick={() => auth.signOut()} />
                }
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
