import Carts from "../Carts/Carts";

const TaskCategory = ({ items, title, color }) => {
  return (
    <div>
      {/* header */}
      <div className="flex justify-between items-center mb-4 px-6">
        <div className="flex">
          <span className={`${color} px-3 rounded-s-3xl me-1`}></span>
          <p className="font-semibold">{title}</p>
        </div>
        <div className="px-1 rounded-sm bg-slate-300">0</div>
      </div>
      {/* cart */}
      <div className="h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200">
        <Carts items={items}></Carts>
      </div>
    </div>
  );
};

export default TaskCategory;
