import React, { useEffect, useState } from "react";
import useTasks from "../../../hook/useTasks";

const FileUploadModal = ({
  isModalOpen,
  onClose,
  onFileChange,
  onFileUpload,
  currentItemId,
}) => {
  const [tasks, loading, refetch] = useTasks();
  const [files, setFiles] = useState([]);

  const file = tasks.find((task) => task._id === currentItemId);

  useEffect(() => {
    if (file?.stats?.file_count && file?.stats?.file_count?.length > 0) {
      setFiles(file.stats.file_count);
    } else {
      setFiles([]);
    }
  }, [file]);
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Upload your File</h2>
        <input type="file" onChange={onFileChange} />
        <div className="mt-4">
          <button
            onClick={onFileUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
          >
            Upload
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 ml-2"
          >
            Close
          </button>
          {/* Display files if any */}
          {loading ? (
            "loading.."
          ) : (
            <div className="mt-4">
              <h1 className="text-center font-semibold">All Uploaded Files</h1>
              {files.length > 0 ? (
                files.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center my-1"
                  >
                    <div className="flex gap-1">
                      <p>{index + 1}.</p>
                      <p>{file.filename}</p>
                    </div>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn px-2 py-2 bg-blue-500 rounded-lg text-white"
                    >
                      View File
                    </a>
                  </div>
                ))
              ) : (
                <p>No files uploaded yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
