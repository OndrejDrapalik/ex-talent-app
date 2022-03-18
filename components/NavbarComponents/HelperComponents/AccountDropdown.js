export default function AccountDropdown({
  onClickSignOut,
  onClickDeleteAccount,
}) {
  return (
    <div
      // The white background with shadow frame
      className="bg-lightest  absolute top-[52px] right-0 z-20 w-40 cursor-pointer
                rounded-lg shadow-xl 
                transition duration-300 ease-in-out "
    >
      <div
        // Logout group
        className="group hover:bg-dark flex flex-row items-center
                  justify-between"
      >
        <div className="left-0 py-1 pl-2">👋</div>
        <div
          onClick={onClickSignOut}
          className=" font-lato  group-hover:text-lightest text-darkest 
                    py-1 pr-2
                      text-right text-sm
                      transition-all duration-100 ease-linear"
        >
          Sign out
        </div>
      </div>
      <div
        // Other group
        className="group hover:bg-dark flex flex-row items-center
                  justify-between"
      >
        <div className="left-0 py-1 pl-2">💸 </div>
        <p
          className=" font-lato  group-hover:text-lightest text-darkest
                    py-1 pr-2
                      text-right text-sm
                      transition-all duration-100 ease-linear"
        >
          Send help
        </p>
      </div>
      <div
        // Delete account
        className="group hover:bg-dark flex flex-row items-center
                  justify-between"
      >
        <div className="left-0 py-1 pl-2">❌</div>
        <p
          onClick={onClickDeleteAccount}
          className=" font-lato  group-hover:text-lightest text-darkest
                    py-1 pr-2
                      text-right text-sm
                      transition-all duration-100 ease-linear"
        >
          Delete account
        </p>
      </div>
    </div>
  );
}
