/* Custom class implementation */
export default function NavBarIcons({ icon, onClick }) {
  return (
    <div onClick={onClick} className="navbar-icons">
      {icon}
    </div>
  );
}
