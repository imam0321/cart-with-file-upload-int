import useTasks from "../../hook/useTasks";
import TaskCategory from "../TaskCategory/TaskCategory";

const Task = () => {
  const [tasks, loading] = useTasks();
  const incomplete = tasks.filter((task) => task.category === "incomplete");
  const toDo = tasks.filter((task) => task.category === "to_do");
  const doing = tasks.filter((task) => task.category === "doing");
  const underReview = tasks.filter((task) => task.category === "under_review");
  const completed = tasks.filter((task) => task.category === "completed");
  const finish = tasks.filter((task) => task.category === "finish");

  return (
    <>
      {loading ? (
        "Data loading...."
      ) : (
        <>
          <div className="flex overflow-x-scroll scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200 my-12 mx-4">
            <TaskCategory
              items={incomplete}
              title="Incomplete"
              color={"bg-red-500"}
            />
            <TaskCategory items={toDo} title="To Do" color={"bg-sky-500"} />
            <TaskCategory items={doing} title="Doing" color={"bg-yellow-500"} />
            <TaskCategory
              items={underReview}
              title="Under Review"
              color={"bg-red-500"}
            />
            <TaskCategory
              items={completed}
              title="Completed"
              color={"bg-red-500"}
            />
            <TaskCategory items={finish} title="Finish" color={"bg-blue-500"} />
          </div>
        </>
      )}
    </>
  );
};

export default Task;
