import { useState } from "react";
import ListCard from "./ListCard";

const AllListsView = ({ items, selectedLists, onSelectList, onCreateNewList }) => {
  const [showMessage, setShowMessage] = useState(false);

  const grouped = items?.reduce((acc, item) => {
    acc[item.list_number] = acc[item.list_number] || [];
    acc[item.list_number].push(item);
    return acc;
  }, {});
  const listNumbers = Object.keys(grouped || {}).sort((a, b) => a - b);

  const handleCreateNewList = () => {
    if (selectedLists.length !== 2) {
      setShowMessage(true);
      return;
    }
    setShowMessage(false);
    onCreateNewList();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl  text-center mb-6 mt-10">List Creation</h1>
      <div className="flex justify-center items-center mb-6">
        <button onClick={handleCreateNewList} className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700`}>
          Create a new list
        </button>
      </div>

      {showMessage && (
        <div className="flex justify-center items-center mb-6">
          <p className="mb-4 text-red-600">*You should select exactly 2 lists to create a new list</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listNumbers.map((listNum) => (
          <ListCard key={listNum} listNum={Number(listNum)} items={grouped[listNum]} selected={selectedLists.includes(Number(listNum))} onSelect={onSelectList} />
        ))}
      </div>
    </div>
  );
};

export default AllListsView;
