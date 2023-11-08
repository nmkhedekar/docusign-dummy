import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useState } from "react";
import { api } from "../../api/api";

const Popup = ({ importedData, setImportedData, modifiedFileData, setModifiedFileData, modifiedSignData, setModifiedSignData }) => {

    const [showPopup, setShowPopup] = React.useState(false)
    const [selectedFileName, setSelectedFileName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loader, setLoader] = useState(false);
    const [showSecondPopup, setShowSecondPopup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [signature, setSignature] = useState("");
    const [uploadSignaturePopup, setUploadSignaturePopup] = useState(false);
    const [signatureImg, setSignatureImg] = useState(null);

    const filenameHandler = (e) => {
        setSelectedFileName(e?.target?.files[0]?.name);
    }

    const popupHandler = () => {
        setSelectedFileName("");
        setSelectedFile(null);
        setImportedData(null);
        setModifiedFileData(null);
        setShowSecondPopup(false);
        setName("");
        setEmail("");
        setSignature("");
        setUploadSignaturePopup(false);
        setModifiedSignData(null);
        setSignatureImg(null);
        setShowPopup(!showPopup);
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
            documentId: importedData?.data?._id,
            name,
            email,
            signature
        });
        console.log("modified-pdfData", data);
        setModifiedFileData(data);
    }

    const uploadSignatureHandler = async () => {
        if (signatureImg) {
            const formData = new FormData();
            Object.values(signatureImg).forEach(file => {
                console.log("pdfFile", file);
                formData.append("multiFile", file);
                formData.append("name", name);
                formData.append("email", email);
                formData.append("documentId", importedData?.data?._id);
            });
            const { data } = await api.post(`/api/upload-signature`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("signData", data);
            setModifiedSignData(data);
        }
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
                            <Button onClick={() => {
                                setShowSecondPopup(true);
                                setShowPopup(false);
                            }}>
                                Custom Signature
                            </Button>
                            <Button onClick={() => {
                                setUploadSignaturePopup(true);
                                setShowPopup(false);
                            }}>
                                Upload Signature
                            </Button>
                        </>
                    ) : null
                }

            </Modal>

            <Modal show={showSecondPopup}>
                <Modal.Header closeButton onClick={() => setShowSecondPopup(false)}>
                    <Modal.Title>Custom Signature</Modal.Title>
                </Modal.Header>

                <label>Name
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                </label>
                <label>Email
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                </label>
                <label>Signature
                    <input value={signature} onChange={(e) => setSignature(e.target.value)} type="text" />
                </label>

                <Button onClick={modifyFileHandler}>
                    Sign PDF
                </Button>

                {
                    modifiedFileData ? (
                        <>
                            <a href={modifiedFileData?.data?.filePath[0]} download target="_blank" className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">
                                <span><i className="fa fa-download" />Download</span>
                            </a>
                        </>
                    ) : null
                }
            </Modal>

            <Modal show={uploadSignaturePopup}>
                <Modal.Header closeButton onClick={() => setUploadSignaturePopup(false)}>
                    <Modal.Title>Upload Signature</Modal.Title>
                </Modal.Header>

                <label>Name
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                </label>
                <label>Email
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                </label>

                <input type="file" name="myfile" style={{ cursor: "pointer" }} onChange={(e) => {
                    setSignatureImg(e.target.files);
                }} />

                <Button onClick={uploadSignatureHandler}>
                    Upload Signature
                </Button>

                <span>{modifiedSignData ? "Image uploaded successfully" : ""}</span>

                {
                    modifiedSignData ? (
                        <>
                            <a href={modifiedSignData?.data?.filePath[0]} download target="_blank" className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">
                                <span><i className="fa fa-download" />Download</span>
                            </a>
                        </>
                    ) : null
                }

            </Modal>

        </>
    )
}

export default Popup;