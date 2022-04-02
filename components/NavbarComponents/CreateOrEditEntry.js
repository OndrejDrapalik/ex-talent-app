import Link from 'next/link';
import NavBarIcons from './HelperComponents/NavBarIcons';
import { Pencil, Plus } from './HelperComponents/IconsSvg';

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
          className={`navbar-tooltip hidden sm:inline ${
            !entry && 'group-hover:scale-100'
          }`}
        >
          🖋 Edit your entry
        </span>
        <NavBarIcons
          icon={
            <Pencil
              onClick={onClick}
              className="dark:stroke-light stroke-darkest hover:stroke-accent dark:hover:stroke-accent transition-all
            duration-300 ease-linear"
            />
          }
        />
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
          className={`navbar-tooltip hidden sm:inline ${
            !entry && 'group-hover:scale-100'
          }`}
        >
          🖋 Add your entry
        </span>

        <NavBarIcons
          icon={
            <Plus
              onClick={onClick}
              className="dark:stroke-light stroke-darkest hover:stroke-accent dark:hover:stroke-accent transition-all
            duration-300 ease-linear"
            />
          }
          onClick={onClick}
        />
      </div>
    </Link>
  );
}
