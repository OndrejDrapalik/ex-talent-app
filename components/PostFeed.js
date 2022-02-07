export default function PostFeed({ entries }) {
  return entries
    ? entries.map((item) => (
        <div key={item.values.id}>
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
        className="rounded-lg bg-green-600 px-14 pb-14 pt-10 shadow-md"
      >
        <div>{entry.values.firstName}</div>
        {entry.values.jobTitle}
      </div>
    </>
  );
};
