interface TodoResultsHeaderProps {
  total: number;
  done: number;
}

const TodoResultsHeader: React.FC<TodoResultsHeaderProps> = ({ total, done }) => {
  return (
    <div className="text-core-todo-darker text-sm font-bold flex flex-row items-center justify-between mt-20 sm:mt-6 pb-3 mb-2 border-b border-solid border-b-gray-700">
      <div className="flex items-center gap-2">Total <span className="bg-base w-5 h-5 flex items-center justify-center rounded-full text-gray-200">{total || 0}</span></div>
      <div className="flex items-center gap-2">Done <span className="bg-base w-5 h-5 flex items-center justify-center rounded-full text-gray-200">{done || 0}</span></div>
    </div>
  );
}

export default TodoResultsHeader;