const TodoNoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
      <img src="../../../public/clipboard.png" alt="No results found" className="w-12" />
      <h2>No results found</h2>
      <p className="text-gray-400 text-center text-xs italic">Try adding a new todo</p>
    </div>
  );
}
export default TodoNoResults;