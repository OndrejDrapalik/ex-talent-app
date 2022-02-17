import Link from 'next/link';
import NavBarIcons from './HelperComponents/NavBarIcons';
import { FaHome, FaPlus, FaUserPlus, FaEdit } from 'react-icons/fa';

export default function CreateOrEditEntry({
  entryCheck,
  onClick,
  linkPath,
  entry,
}) {
  return entryCheck ? (
    <Link href={linkPath} passHref>
      <div
        // Add entry plus icon + animation on hover
        className="group flex items-center"
      >
        <span
          /// animation only works when there's not a text input field
          className={`navbar-tooltip ${!entry && 'group-hover:scale-100'}`}
        >
          🖋 Edit your entry
        </span>
        <NavBarIcons icon={<FaEdit size="20" />} onClick={onClick} />
      </div>
    </Link>
  ) : (
    <Link href={linkPath} passHref>
      <div
        // Add entry plus icon + animation on hover
        className="group flex items-center"
      >
        <span
          /// animation only works when there's not a text input field
          className={`navbar-tooltip ${!entry && 'group-hover:scale-100'}`}
        >
          🖋 Add your entry
        </span>
        <NavBarIcons icon={<FaPlus size="20" />} onClick={onClick} />
      </div>
    </Link>
  );
}
