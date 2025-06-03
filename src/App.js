import { useState, useEffect, useCallback } from "react";
import AllListsView from "./components/AllListsView";
import ListCreationView from "./components/ListCreationView";

function App() {
  const [view, setView] = useState("allLists");
  const [items, setItems] = useState([]);
  const [selectedLists, setSelectedLists] = useState([]);
  const [creationState, setCreationState] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("https://apis.ccbp.in/list-creation/lists");
      const data = await response.json();
      setItems(data.lists);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const groupItemsByList = () => {
    const groups = {};
    items?.forEach((item) => {
      if (!groups[item.list_number]) groups[item.list_number] = [];
      groups[item.list_number].push(item);
    });
    return groups;
  };

  const handleSelectList = (listNumber) => {
    setSelectedLists((prev) => (prev.includes(listNumber) ? prev.filter((num) => num !== listNumber) : prev.length < 2 ? [...prev, listNumber] : prev));
  };

  const handleCreateNewList = () => {
    if (selectedLists.length !== 2) return;
    const grouped = groupItemsByList();
    const [leftListId, rightListId] = selectedLists;
    setCreationState({
      leftListId,
      rightListId,
      leftItems: grouped[leftListId] || [],
      newItems: [],
      rightItems: grouped[rightListId] || [],
    });
    setView("listCreation");
    setSelectedLists([]);
  };

  const handleCancel = () => {
    setView("allLists");
    setCreationState(null);
  };

  const handleUpdate = () => {
    const maxListNum = Math.max(...items.map((i) => i.list_number));
    const newListNum = maxListNum + 1;

    const updated = items.map((item) => {
      if (creationState.leftItems.find((i) => i.id === item.id)) {
        return { ...item, list_number: creationState.leftListId };
      }
      if (creationState.rightItems.find((i) => i.id === item.id)) {
        return { ...item, list_number: creationState.rightListId };
      }
      if (creationState.newItems.find((i) => i.id === item.id)) {
        return { ...item, list_number: newListNum };
      }
      return item;
    });

    setItems(updated);
    setView("allLists");
    setCreationState(null);
  };

  const creationActions = {
    moveLeftToNew: (id) =>
      setCreationState((prev) => {
        const item = prev.leftItems.find((i) => i.id === id);
        return {
          ...prev,
          leftItems: prev.leftItems.filter((i) => i.id !== id),
          newItems: [...prev.newItems, item],
        };
      }),
    moveNewToLeft: (id) =>
      setCreationState((prev) => {
        const item = prev.newItems.find((i) => i.id === id);
        return {
          ...prev,
          newItems: prev.newItems.filter((i) => i.id !== id),
          leftItems: [...prev.leftItems, item],
        };
      }),
    moveRightToNew: (id) =>
      setCreationState((prev) => {
        const item = prev.rightItems.find((i) => i.id === id);
        return {
          ...prev,
          rightItems: prev.rightItems.filter((i) => i.id !== id),
          newItems: [...prev.newItems, item],
        };
      }),
    moveNewToRight: (id) =>
      setCreationState((prev) => {
        const item = prev.newItems.find((i) => i.id === id);
        return {
          ...prev,
          newItems: prev.newItems.filter((i) => i.id !== id),
          rightItems: [...prev.rightItems, item],
        };
      }),
  };

  if (view === "allLists") {
    return <AllListsView items={items} selectedLists={selectedLists} onSelectList={handleSelectList} onCreateNewList={handleCreateNewList} />;
  }

  if (view === "listCreation" && creationState) {
    return <ListCreationView creationState={creationState} actions={creationActions} onCancel={handleCancel} onUpdate={handleUpdate} />;
  }

  return <div className="p-6 text-gray-500">Loading...</div>;
}

export default App;
