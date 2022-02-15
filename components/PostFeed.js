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
        className="rounded-lg border bg-white px-5 py-10 drop-shadow-lg"
      >
        <div className="text-2xl font-bold">
          {entry.values.firstName} {entry.values.lastName}
        </div>
        <div>{entry.values.jobTitle}</div>
        <div>{entry.values.department}</div>
        <div>{entry.values.city}</div>
        {entry.values.remoteWork ? 'Open to remote' : null}
        {entry.values.remoteWork && entry.values.relocation ? ', ' : null}
        {entry.values.relocation ? 'Open to  relocation' : null}
        {entry.values.linkedIn && (
          <div className="font-bold">
            <a
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
          <div className="font-bold">
            <a
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
        <div className="whitespace-pre-line">{entry.values.aboutYou}</div>
      </div>
    </>
  );
};
