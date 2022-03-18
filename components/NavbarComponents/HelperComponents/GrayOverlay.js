export default function GrayOverlay({ onClick, zIndex }) {
  return (
    <button
      onClick={onClick}
      className={`fixed top-0 right-0 bottom-0 left-0 h-full w-full ${zIndex}
                              bg-darkest cursor-default 
                              opacity-50`}
    />
  );
}
