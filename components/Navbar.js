import React, { useContext } from 'react';
import { AppContext } from '../lib/contexts/app-context';
import { UserContext } from '../lib/contexts/user-context';

import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FaHome, FaUserPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

import TopRightMenu from './NavbarComponents/TopRightMenu';
import NavBarIcons from './NavbarComponents/HelperComponents/NavBarIcons';
import CreateOrEditEntry from './NavbarComponents/CreateOrEditEntry';

// Top navbar
export default function Navbar() {
  const { user, entryCheck } = useContext(UserContext);
  const { dropdown, setDropdown, entry, setEntry, effect, setEffect } =
    useContext(AppContext);

  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      const userObject = await auth.signInWithPopup(googleAuthProvider);
      saveData(userObject);
    } catch (error) {
      console.log(error);
    }
  };

  const saveData = (props) => {
    const userData = props.user.multiFactor.user;
    console.log('logged in user', userData);
    const userDoc = firestore.doc(`users/${userData.uid}`);
    userDoc.set({
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      email: userData.email,
    });
  };

  const deleteAccount = async () => {
    console.log('delete account');
    console.log(user);

    if (confirm('You are about to delete your account.') == true) {
      await firestore
        .doc(`users/${user.uid}/entry_collection/entry_doc`)
        .delete();
      await firestore.doc(`users/${user.uid}`).delete();
      await auth.signOut();
      toast.success('Account deleted successfully!');
      router.reload();
    } else {
      toast.error('You have cancelled the request!');
      setDropdown(!dropdown);
    }
  };

  // const entryDoc = true;
  console.log('entryCheck', entryCheck);

  return (
    <>
      <div
        // NAV BAR
        /// add custom values with "h-[56px]""
        className="bg-secondary text-primary shadow-mg  top-0
                  flex h-16 w-screen 
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
              <div className="relative flex items-center">
                <CreateOrEditEntry
                  onClick={() => {
                    setEffect(!effect);
                    setEntry(true);
                  }}
                  linkPath={`/admin/${user.uid}`}
                  entry={entry}
                  entryCheck={entryCheck}
                />
                <div className="w-4 appearance-none" />
                <TopRightMenu
                  photoURL={user?.photoURL}
                  dropdown={dropdown}
                  onClick={() => setDropdown(!dropdown)}
                  onClickSignOut={() => auth.signOut()}
                  onClickDeleteAccount={deleteAccount}
                />
              </div>
            ) : (
              // User NOT logged in
              <div className="relative flex items-center gap-4">
                <NavBarIcons
                  onClick={() => {
                    signInWithGoogle();
                    setDropdown(false);
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
