import Carts from "../Carts/Carts";

const Incomplete = () => {
  return (
    <div className="mx-10 w-[30%]">
      {/* header */}
      <div className="flex justify-between items-center mb-4 px-6">
        <div className="flex">
          <span className="bg-red-600 px-3 rounded-s-3xl me-1"></span>
          <p className="font-semibold">Incomplete</p>
        </div>
        <div className="px-1 rounded-sm bg-slate-300">0</div>
      </div>
      {/* cart */}
      <div className="h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200">
      <Carts></Carts>
      </div>
      
    </div>
  );
};

export default Incomplete;
