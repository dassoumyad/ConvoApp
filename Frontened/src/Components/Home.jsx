import React, { useState } from 'react';
import { FaFileWord } from "react-icons/fa";
import axios from 'axios';

function Home() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [convertMessage, setConvertMessage] = useState(null);
    const [downloadError, setDownloadError] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setConvertMessage("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("https://convoapp-cp0f.onrender.com/convertFile", formData, {
                responseType: "blob", // binary type
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            const fileName = selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf";
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            setSelectedFile(null);
            setConvertMessage("File converted successfully");
            setDownloadError(null);
        } catch (error) {
            console.error("There was an error converting the file!", error);
            setDownloadError("Error occured",error.response.data.message);
            setConvertMessage(null);
        }
    };

    return (
        <>
            <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
                <div className="flex h-screen items-center justify-center">
                    <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg">
                        <h1 className="text-3xl font-bold text-center mb-4">Convert Word to PDF Online</h1>
                        <p className="text-sm text-center mb-4">Drag and drop a Microsoft Word document (DOCX or DOC) to convert to PDF.</p>
                        <div className="flex flex-col items-center space-y-4">
                            <input
                                type="file"
                                accept=".doc,.docx"
                                onChange={handleFileChange}
                                className="hidden"
                                id="FileInput"
                            />
                            <label htmlFor="FileInput" className="w-full flex items-center justify-center px-4 py-6 bg-green-200 text-gray-800 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300 hover:text-white">
                                <FaFileWord className="text-3xl mr-3" />
                                <span className="text-2xl mr-2">{selectedFile ? selectedFile.name : "Choose File"}</span>
                            </label>
                            <button
                                onClick={handleSubmit}
                                disabled={!selectedFile}
                                className="text-white bg-yellow-500 hover:bg-yellow-700 duration-300 font-bold px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:pointer-events-none">
                                Convert File
                            </button>
                            {convertMessage && <p className="text-green-500 mt-2">{convertMessage}</p>}
                            {downloadError && <p className="text-red-500 mt-2">{downloadError}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
