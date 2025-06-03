const ListCard = ({ listNum, items, selected, onSelect }) => {
  return (
    <div className={`border rounded-lg p-4 ${selected ? "border-blue-500 border-2" : "border-gray-300"}`}>
      <div className="flex items-center mb-3">
        <input type="checkbox" checked={selected} onChange={() => onSelect(listNum)} className="h-5 w-5 text-blue-600 rounded" />
        <h2 className="ml-2 font-semibold text-lg">
          List {listNum} ({items.length})
        </h2>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-3 last:mb-0">
            <div className="font-medium">{item.name}</div>
            <div className="text-sm text-gray-600">{item.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCard;
