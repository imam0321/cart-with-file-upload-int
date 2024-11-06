import { useEffect, useState } from "react";
import {
  FaCodepen,
  FaRegComments,
  FaCalendarAlt,
  FaLink,
  FaClipboardList,
} from "react-icons/fa";
import axios from "axios";

const Carts = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        axios.get("http://localhost:5000/tasks").then((data) => {
          setTasks(data.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
  }, []);
  console.log(tasks);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="my-8 px-6">
          <div className="mt-3 scroll-y-0">
            {/* cart header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <img
                  src={task.client.image_url}
                  className="w-10 h-10"
                  alt="img"
                />

                <p className="font-semibold">{task.client.name}</p>
              </div>
              <div className="flex items-center gap-1">
                <img
                  src={task?.user?.image_url}
                  className="w-10 h-10"
                  alt="img"
                />
                <p className="font-semibold">{task.user.name}</p>
              </div>
            </div>
            {/* cart body  */}
            <div className="flex justify-between items-center my-4">
              <div className="flex justify-between gap-1">
                <FaCodepen />
                <p className="text-sm text-slate-600">{task.user.about}</p>
              </div>
              <div className="flex items-center gap-1">
                <FaClipboardList />
                <span>{task.stats.note_count}</span>
              </div>
            </div>
            {/* cart footer  */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                {task.stats.views.map((img, index) => (
                  <img
                    key={index}
                    src={img.image_url}
                    alt="view"
                    className="w-8 h-8 rounded-full"
                  />
                ))}

                <span>{task.stats.view_user_count}+</span>
              </div>
              <div className="flex items-center gap-1">
                <FaRegComments />
                <span>{task.stats.comment_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaLink />
                <span>{task.stats.file_count.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCalendarAlt />
                <span>{task.date}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carts;
