export default function AccountDropdown({ onClick }) {
  return (
    <div
      // The white background with shadow frame
      className="absolute right-0 w-28 mt-28 rounded-lg shadow-xl
                bg-white cursor-pointer
                transition-all duration-100 ease-linear "
    >
      <div
        // Logout group
        className="flex flex-row justify-between items-center group
                  hover:bg-gray-700"
      >
        <div className="left-0 pl-2 py-1">👋</div>
        <div
          onClick={onClick}
          className=" text-right  pr-2 py-1 
                    text-gray-900 group-hover:text-white
                      text-sm font-lato
                      transition-all duration-100 ease-linear"
        >
          Sign out
        </div>
      </div>
      <div
        // Other group
        className="flex flex-row justify-between items-center group
                  hover:bg-gray-700"
      >
        <div className="left-0 pl-2 py-1">💸</div>
        <p
          className=" text-right  pr-2 py-1
                    text-gray-900 group-hover:text-white
                      text-sm font-lato
                      transition-all duration-100 ease-linear"
        >
          Send help
        </p>
      </div>
    </div>
  );
}
