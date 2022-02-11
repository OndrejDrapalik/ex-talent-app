export default function PostFeed({ entries }) {
  return entries
    ? entries.map((item) => (
        <div key={item.id} className="pb-5">
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
        <div className="text-xl font-bold">
          {entry.values.firstName} {entry.values.lastName}
        </div>
        <div>{entry.values.jobTitle}</div>
        <div className="font-bold">
          <a href={entry.values.linkedIn}>{entry.values.linkedIn}</a>
        </div>
        {/* <div className="whitespace-pre-line">{entry.values.aboutYou}</div> */}
      </div>
    </>
  );
};
