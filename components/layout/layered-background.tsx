export function LayeredBackground() {
  const layers = Array.from({ length: 20 });

  return (
    <div className="relative w-full mb-[54px]">
      {layers.map((_, i) => (
        <div
          key={i}
          className="w-full"
          style={{
            backgroundColor: i % 2 !== 0 ? '#ffffff' : '#000000',
            height: `${20 - i}px`,
          }}
        />
      ))}
    </div>
  );
}
