const ListPanel = ({ title, items, onAction, onActionLeft, onActionRight, dualButtons, direction }) => {
  return (
    <div className="flex-1 border border-gray-300 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-3">{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-3 p-2 hover:bg-gray-50 rounded flex justify-between items-center">
            {dualButtons ? (
              <>
                <button onClick={() => onActionLeft(item.id)} className="text-gray-500 hover:text-blue-600">
                  ←
                </button>
                <div className="text-center">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </div>
                <button onClick={() => onActionRight(item.id)} className="text-gray-500 hover:text-blue-600">
                  →
                </button>
              </>
            ) : direction === "right" ? (
              <>
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </div>
                <button onClick={() => onAction(item.id)} className="ml-4 text-gray-500 hover:text-blue-600">
                  →
                </button>
              </>
            ) : (
              <>
                <button onClick={() => onAction(item.id)} className="text-gray-500 hover:text-blue-600">
                  ←
                </button>
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </div>
              </>
            )}
          </li>
        ))}
        {items.length === 0 && <li className="text-gray-500 italic">No items</li>}
      </ul>
    </div>
  );
};

export default ListPanel;
