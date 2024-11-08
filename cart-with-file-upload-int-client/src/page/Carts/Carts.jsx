import { useState } from "react";
import axios from "axios";
import {
  FaCodepen,
  FaRegComments,
  FaCalendarAlt,
  FaLink,
  FaClipboardList,
} from "react-icons/fa";
import FileUploadModal from "../Share/FileUploadModal/FileUploadModal";
import useTasks from "../../hook/useTasks";

const Carts = ({ items }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [, , refetch] = useTasks();

  const handleFileLink = (id) => {
    setCurrentItemId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFile(null);
    setCurrentItemId(null);
  };

   // Function to ensure URL has the correct 'https' protocol
   const ensureProtocol = (url) => {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== 'https:') {
      parsedUrl.protocol = 'https:';  // Set it to https if it is not
    }
    return parsedUrl.toString();
  };

  const handleFileUpload = async () => {
    if (!file || !currentItemId) {
      console.error("No file selected for upload or item ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
    formData.append("resource_type", "auto"); 

    try {
      // Uploading file to Cloudinary
      const cloudinaryRes = await axios.post(
        import.meta.env.VITE_CLOUD_URL,
        formData
      );

      const fileUrl = ensureProtocol(cloudinaryRes.data.secure_url); 

      // Sending the file URL to backend to save in MongoDB
      // https://cart-with-file-upload-int-server.vercel.app
      await axios.post(`https://cart-with-file-upload-int-server.vercel.app/upload/${currentItemId}`, {
        url: fileUrl,
        filename: file.name,
      });

      alert("File uploaded successfully!");
      refetch();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("File upload failed");
    }
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
                  handleFileLink(item._id);
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
      <FileUploadModal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        onFileChange={(e) => setFile(e.target.files[0])}
        onFileUpload={handleFileUpload}
        currentItemId={currentItemId}
      />
    </div>
  );
};

export default Carts;
