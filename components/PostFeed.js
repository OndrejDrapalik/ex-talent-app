export default function PostFeed({ entries }) {
  return entries
    ? entries.map((item) => <PostItem entry={item} key={item.id} />)
    : null;
}

const PostItem = ({ entry }) => {
  return (
    <>
      <div
        // Inner box styling
        className="rounded-lg border bg-white px-5 py-10 drop-shadow-lg"
      >
        <div>{entry.values.firstName}</div>
        <div>{entry.values.jobTitle}</div>
        <div>{entry.values.aboutYou}</div>
      </div>
    </>
  );
};
