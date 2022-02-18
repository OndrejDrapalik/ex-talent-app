export default function AccountDropdown({
  onClickSignOut,
  onClickDeleteAccount,
}) {
  return (
    <div
      // The white background with shadow frame
      className="absolute  top-[52px] right-0 z-20 w-40 cursor-pointer rounded-lg
                bg-white shadow-xl 
                transition-all duration-100 ease-linear "
    >
      <div
        // Logout group
        className="group flex flex-row items-center justify-between
                  hover:bg-gray-700"
      >
        <div className="left-0 py-1 pl-2">👋</div>
        <div
          onClick={onClickSignOut}
          className=" font-lato  py-1 pr-2 
                    text-right text-sm
                      text-gray-900 transition-all
                      duration-100 ease-linear group-hover:text-white"
        >
          Sign out
        </div>
      </div>
      <div
        // Other group
        className="group flex flex-row items-center justify-between
                  hover:bg-gray-700"
      >
        <div className="left-0 py-1 pl-2">💸 </div>
        <p
          className=" font-lato  py-1 pr-2
                    text-right text-sm
                      text-gray-900 transition-all
                      duration-100 ease-linear group-hover:text-white"
        >
          Send help
        </p>
      </div>
      <div
        // Delete account
        className="group flex flex-row items-center justify-between
                  hover:bg-gray-700"
      >
        <div className="left-0 py-1 pl-2">❌</div>
        <p
          onClick={onClickDeleteAccount}
          className=" font-lato  py-1 pr-2
                    text-right text-sm
                      text-gray-900 transition-all
                      duration-100 ease-linear group-hover:text-white"
        >
          Delete account
        </p>
      </div>
    </div>
  );
}
