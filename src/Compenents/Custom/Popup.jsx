import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useState } from "react";
import { api } from "../../api/api";

const Popup = ({ importedData, setImportedData }) => {

    const [showPopup, setShowPopup] = React.useState(false)
    const [selectedFileName, setSelectedFileName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loader, setLoader] = useState(false);
    const [modifiedFileData, setModifiedFileData] = useState(null);

    const filenameHandler = (e) => {
        setSelectedFileName(e?.target?.files[0]?.name);
    }

    const popupHandler = () => {
        setShowPopup(!showPopup)
    }

    const handleSubmit = async () => {
        if (selectedFile) {
            setLoader(true);
            const formData = new FormData();
            Object.values(selectedFile).forEach(file => {
                console.log("pdfFile", file);
                formData.append("multiFile", file);
            });
            const { data } = await api.post(`/api/upload-document`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("pdfData", data);
            setImportedData(data);
            // setShowPopup(false);
            setLoader(false);
        }
    }

    const modifyFileHandler = async () => {
        const { data } = await api.patch(`/api/modify-document`, {
            documentId: importedData?.data?._id
        });
        console.log("modified-pdfData", data);
        setModifiedFileData(data);
    }

    return (
        <>

            <Button variant="success" onClick={popupHandler}>
                Upload document
            </Button>

            <Modal show={showPopup}>
                <Modal.Header closeButton onClick={popupHandler}>
                    <Modal.Title>Upload PDF</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Only PDF format accepted
                </Modal.Body>

                <input type="file" name="myfile" style={{ cursor: "pointer" }} onChange={(e) => {
                    filenameHandler(e);
                    setSelectedFile(e.target.files);
                }} />

                <Button onClick={handleSubmit}>
                    Upload
                </Button>

                <span>{importedData ? "File uploaded successfully" : ""}</span>

                {
                    importedData ? (
                        <>
                            <Button onClick={modifyFileHandler}>
                                Sign PDF
                            </Button>                           
                        </>
                    ) : null
                }

                {
                    modifiedFileData ? (
                        <>
                         <a href={modifiedFileData?.data?.filePath[0]} download target="_blank" className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">
                                <span><i className="fa fa-download" /> {modifiedFileData?.data?.fileName}</span>
                            </a>
                        </>  
                    ) : null
                }

            </Modal>

        </>
    )
}

export default Popup;