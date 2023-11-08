import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useState } from "react";
import { api } from "../../api/api";

const SignPopup = ({ documentId, modifiedFileData, setModifiedFileData, modifiedSignData, setModifiedSignData }) => {
    const [showPopup, setShowPopup] = React.useState(false);
    const [showSecondPopup, setShowSecondPopup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [signature, setSignature] = useState("");
    const [uploadSignaturePopup, setUploadSignaturePopup] = useState(false);
    const [signatureImg, setSignatureImg] = useState(null);

    const popupHandler = () => {
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

    const modifyFileHandler = async () => {
        const { data } = await api.patch(`/api/modify-document`, {
            documentId,
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
                formData.append("documentId", documentId);
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
                Sign
            </Button>

            <Modal show={showPopup}>
                <Modal.Header closeButton onClick={popupHandler}>
                    <Modal.Title>Upload PDF</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Only PDF format accepted
                </Modal.Body>

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

export default SignPopup;