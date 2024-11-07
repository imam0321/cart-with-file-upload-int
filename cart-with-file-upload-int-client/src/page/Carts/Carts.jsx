import { useState } from "react";
import axios from "axios";
import {
  FaCodepen,
  FaRegComments,
  FaCalendarAlt,
  FaLink,
  FaClipboardList,
} from "react-icons/fa";

const Carts = ({ items }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileLink = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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
                    className="w-6 h-6 rounded-full"
                  />
                ))}

                <span>{item.stats.view_user_count}+</span>
              </div>
              <div className="flex items-center gap-1">
                <FaRegComments />
                <span>{item.stats.comment_count}</span>
              </div>
              <div
                onClick={() => {
                  handleFileLink();
                }}
                className="flex items-center gap-1"
              >
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Upload your File</h2>
            <input type="file" onChange={handleFileChange} />
            <div className="mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
                Upload
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 ml-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carts;
