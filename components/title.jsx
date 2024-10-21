export default function Title({ name, sub }) {
  return (
    <div>
      <div className="flex items-center">
        <div className="w-3 h-8 bg-red-700 mr-3"></div>
        <h2>{sub}</h2>
      </div>
      <h1 className="font-bold text-lg mt-1">{name}</h1>
    </div>
  );
}
