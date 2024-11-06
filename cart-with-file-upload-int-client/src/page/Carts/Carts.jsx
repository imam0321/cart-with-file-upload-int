import {
  FaCodepen,
  FaRegComments,
  FaCalendarAlt,
  FaLink,
  FaClipboardList,
} from "react-icons/fa";

const Carts = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item._id} className="w-[370px] my-8 px-6">
          <div className="mt-3 scroll-y-0">
            {/* cart header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <img
                  src={item.client.image_url}
                  className="w-10 h-10"
                  alt="img"
                />

                <p className="font-semibold">{item.client.name}</p>
              </div>
              <div className="flex items-center gap-1">
                <img
                  src={item?.user?.image_url}
                  className="w-10 h-10"
                  alt="img"
                />
                <p className="font-semibold">{item.user.name}</p>
              </div>
            </div>
            {/* cart body  */}
            <div className="flex justify-between items-center my-4">
              <div className="flex justify-between gap-1">
                <FaCodepen />
                <p className="text-sm text-slate-600">{item.user.about}</p>
              </div>
              <div className="flex items-center gap-1">
                <FaClipboardList />
                <span>{item.stats.note_count}</span>
              </div>
            </div>
            {/* cart footer  */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                {item.stats.views.map((img, index) => (
                  <img
                    key={index}
                    src={img.image_url}
                    alt="view"
                    className="w-8 h-8 rounded-full"
                  />
                ))}

                <span>{item.stats.view_user_count}+</span>
              </div>
              <div className="flex items-center gap-1">
                <FaRegComments />
                <span>{item.stats.comment_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaLink />
                <span>{item.stats.file_count.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCalendarAlt />
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carts;
