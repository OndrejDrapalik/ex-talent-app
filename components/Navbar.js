import React, { useContext } from 'react';
import { AppContext } from '../lib/contexts/app-context';
import { UserContext } from '../lib/contexts/user-context';

import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';

import toast from 'react-hot-toast';

import TopRightMenu from './NavbarComponents/TopRightMenu';
import CreateOrEditEntry from './NavbarComponents/CreateOrEditEntry';
import ThemeIcon from './NavbarComponents/ThemeIcon';

import {
  Google,
  MagnifyingGlass,
} from './NavbarComponents/HelperComponents/IconsSvg';
import useWindowSize from '../lib/hooks/useWindowSize';

// Top navbar
export default function Navbar() {
  const { user, entryCheck } = useContext(UserContext);
  const { dropdown, setDropdown, entry, setEntry, effect, setEffect } =
    useContext(AppContext);

  const router = useRouter();
  const size = useWindowSize();

  const signInWithGoogle = async () => {
    try {
      const userObject = await auth.signInWithRedirect(googleAuthProvider);
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
        // Dumb background
        className="bg-light/75 dark:bg-darkest w-screen"
      >
        <div
          // NAV BAR main
          className=" text-primary shadow-mg  top-0
                  m-auto flex h-20 max-w-6xl items-center
                   justify-between px-[5vw] md:px-10"
        >
          <Link href={'/'} passHref>
            <div
              // Home button + some test animation on click w effect state
              /// animation only works when Plus sign button is clicked
              className={`text-darker dark:text-light  z-10 flex items-center ${
                effect && 'animate-wiggle'
              } `}
              onAnimationEnd={() => setEffect(false)}
            >
              <div className="dark:bg-darkest mr-2 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <MagnifyingGlass
                  className="dark:hover:fill-accent fill-accent  flex cursor-pointer   transition-all duration-300 
              ease-linear hover:fill-yellow-400 dark:fill-yellow-400"
                />
              </div>

              {size.width < 420 ? (
                <h1 className="font-heading cursor-pointer pl-2 text-xl"></h1>
              ) : (
                <h1 className="font-heading cursor-pointer pl-2 text-xl">
                  talents.fyi
                </h1>
              )}
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
                    onClick={() => setEntry(true)}
                    linkPath={`/admin/${user.uid}`}
                    entry={entry}
                    entryCheck={entryCheck}
                  />
                  <div className="invisible w-4" />
                  <ThemeIcon />
                  <div className="invisible w-4" />
                  <TopRightMenu
                    photoURL={user.photoURL}
                    dropdown={dropdown}
                    onClick={() => setDropdown(!dropdown)}
                    onClickSignOut={() => auth.signOut()}
                    onClickDeleteAccount={deleteAccount}
                    onClickSendSupport={() => setEffect(true)}
                    effect={effect}
                    setEffect={() => setEffect(false)}
                  />
                </div>
              ) : (
                // User NOT logged in
                <div className="relative flex items-center gap-4">
                  <ThemeIcon />
                  <div className="invisible w-4" />
                  <button
                    className="flex items-center rounded-xl bg-white px-[12px] py-[8px]"
                    onClick={() => {
                      signInWithGoogle();
                      setDropdown(false);
                    }}
                  >
                    <Google className=" bg-white" />

                    <p className="font-roboto pl-4">
                      {size.width < 550 ? 'Google' : 'Continue with Google '}
                    </p>
                  </button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}
