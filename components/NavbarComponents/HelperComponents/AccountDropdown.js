export default function AccountDropdown({ onClickSignOut }) {
  return (
    <div
      // The white background with shadow frame
      className="absolute right-0 z-20 mt-16 w-28 cursor-pointer rounded-lg
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
        <div className="left-0 py-1 pl-2">💸</div>
        <p
          className=" font-lato  py-1 pr-2
                    text-right text-sm
                      text-gray-900 transition-all
                      duration-100 ease-linear group-hover:text-white"
        >
          Send help
        </p>
      </div>
    </div>
  );
}
