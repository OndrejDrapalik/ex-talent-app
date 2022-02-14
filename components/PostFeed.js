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
        {entry.values.remoteWork ? 'Open to remote work' : null}
        {entry.values.remoteWork && entry.values.relocation ? ', ' : null}
        {entry.values.relocation ? 'Open to remote relocation' : null}
        <div className="font-bold">
          <a
            href={entry.values.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <div className="whitespace-pre-line">{entry.values.aboutYou}</div>
      </div>
    </>
  );
};
