import ListPanel from "./ListPanel";

const ListCreationView = ({ creationState, actions, onCancel, onUpdate }) => {
  const { leftListId, rightListId, leftItems, newItems, rightItems } = creationState;

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-6">List Creation</h1>
      <p className="mb-4">Create a new list</p>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <ListPanel title={`List ${leftListId}`} items={leftItems} onAction={actions.moveLeftToNew} direction="right" />
        <ListPanel title="New List" items={newItems} onActionLeft={actions.moveNewToLeft} onActionRight={actions.moveNewToRight} dualButtons />
        <ListPanel title={`List ${rightListId}`} items={rightItems} onAction={actions.moveRightToNew} direction="left" />
      </div>

      <div className="flex justify-end gap-4">
        <button onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
          Cancel
        </button>
        <button onClick={onUpdate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Update
        </button>
      </div>
    </div>
  );
};

export default ListCreationView;
