export default function GrayOverlay({ onClick, zIndex }) {
  return (
    <button
      onClick={onClick}
      className={`fixed top-0 right-0 bottom-0 left-0 w-full h-full ${zIndex}
                              bg-gray-900 opacity-50 
                              transform transition-all duration-300 ease-linear
                              cursor-default`}
    />
  );
}
