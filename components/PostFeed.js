export default function PostFeed({ entries }) {
  return entries
    ? entries.map((item) => <PostItem entry={item} key={item.values.id} />)
    : null;
}

const PostItem = ({ entry }) => {
  return <>{entry.values.firstName}</>;
};
