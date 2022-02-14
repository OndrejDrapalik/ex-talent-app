export default function Filters({ value, props, onChange }) {
  return (
    <>
      <select name="countryFilter" value={value} onChange={onChange}>
        {props.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
}
