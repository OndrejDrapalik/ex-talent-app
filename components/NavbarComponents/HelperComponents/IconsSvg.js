export const EyeExternalProps = ({ color }) => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    id="b80c53a0-fbf6-4494-bbaf-81c896ec0e14"
    data-name="Livello 1"
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
  >
    <title>prime</title>
    <g id="4dc291fc-8aac-47e7-9145-5c0baf1f8af9" data-name="eye">
      <circle cx="12" cy="11.88" r="3" />
      <path d="M12,4A13,13,0,0,0,0,12a13,13,0,0,0,24,0A13,13,0,0,0,12,4Zm0,12.88a5,5,0,1,1,5-5A5,5,0,0,1,12,16.88Z" />
    </g>
  </svg>
);

export const ArrowDown = ({ color, className }) => (
  <svg
    className={`${className}`}
    width="24"
    height="24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m19 9-7 7-7-7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
