import {
  FaLinkedinIn,
  FaLink,
  FaUserEdit,
  FaRegAddressCard,
  FaUser,
} from 'react-icons/fa';

export default function PostFeed({ entries }) {
  return entries
    ? entries.map((item) => (
        <div key={item.id} className=" pb-5">
          <PostItem entry={item} />
        </div>
      ))
    : null;
}

const PostItem = ({ entry }) => {
  return (
    <>
      <div
        // Inner box styling
        className="flex flex-col rounded-lg border bg-white px-5 py-10 drop-shadow-lg"
      >
        <div className=" pb-1 text-2xl font-bold">
          {entry.values.firstName} {entry.values.lastName}
        </div>
        <div
          // First group
          className="pb-3"
        >
          <div>{entry.values.jobTitle}</div>
          <div>{entry.values.department}</div>
          <div>{entry.values.city}</div>
          <div className="italic">
            {entry.values.remoteWork ? 'Open to remote' : null}
            {entry.values.remoteWork && entry.values.relocation ? ', ' : null}
            {entry.values.relocation ? 'Open to  relocation' : null}
          </div>
        </div>

        {(entry.values.linkedIn || entry.values.otherURL) && (
          <div
            // Links group
            className="pb-3"
          >
            {entry.values.linkedIn && (
              <div className="flex items-center">
                <div>
                  <FaLinkedinIn size="18" />
                </div>
                <div className="w-3" />
                <a
                  className="hover:opacity-50"
                  href={
                    entry.values.linkedIn.slice(0, 8) !== 'https://'
                      ? 'https://' + entry.values.linkedIn
                      : entry.values.linkedIn
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            )}
            {entry.values.otherURL && (
              <div className="flex items-center">
                <div className=" mr-0.5">
                  <FaLink size="16" />
                </div>
                <div className="w-3" />
                <a
                  className="hover:opacity-50"
                  href={
                    entry.values.otherURL.slice(0, 8) !== 'https://'
                      ? 'https://' + entry.values.otherURL
                      : entry.values.otherURL
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Other URL
                </a>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center">
          <FaUser size="18" />
          <div className="w-3" />
          <div className="whitespace-pre-line">{entry.values.aboutYou}</div>
        </div>
      </div>
    </>
  );
};
