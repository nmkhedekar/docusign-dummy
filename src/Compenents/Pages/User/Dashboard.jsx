import { useContext, useEffect, useState } from "react"
import AuthContext from "../../../contexts/authContext"
import { useNavigate, Link } from "react-router-dom";
import Popup from "../../Custom/Popup";
import { api } from "../../../api/api";
import moment from 'moment/moment';
import SignPopup from "../../Custom/SignPopup";

const Dashboard = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [importedData, setImportedData] = useState(null);
    const [documentList, setDocumentList] = useState(null);
    const [modifiedFileData, setModifiedFileData] = useState(null);
    const [modifiedSignData, setModifiedSignData] = useState(null);

    const handleLogout = () => {
        authCtx.logout();
    }

    const getDocumentList = async () => {
        const { data } = await api.get("/api/get-document-list");
        console.log("documentList", data);
        setDocumentList(data);
    }

    useEffect(() => {
        getDocumentList();
    }, [modifiedFileData, importedData, modifiedSignData]);

    return (
        <div>
            <main id="main">
                <section id="about" class="about1">
                    <div class="login-form-bg h-100">
                        <div class="container h-100">
                            <div class="row justify-content-center h-100">
                                <div class="col-xl-12">
                                    <div class="form-input-content">
                                        <div class=" login-form mb-0">
                                            <section class="h-100 gradient-form" style={{ background: "#eee;" }}>
                                                <div class="container h-100">
                                                    <div class="row d-flex justify-content-center align-items-center h-100">
                                                        <div class="">
                                                            <div class="card rounded-3 text-black">
                                                                <div class="row g-0">
                                                                    <div class="col-lg-6">
                                                                        <div class="card-body p-md-5 mx-md-4">

                                                                            <div class="text-center">
                                                                                <h4 class="mt-1 mb-5 pb-1 signin">Dashboard</h4>
                                                                            </div>

                                                                            <div class="mt-5 mb-5 login-input" >

                                                                                <div class="text-center pt-1 mb-5 pb-1">
                                                                                    <button
                                                                                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                                                        onClick={handleLogout} > Logout </button>
                                                                                    {/* <button
                                                                                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                                                        onClick={() => { }} > Upload document for e-sign </button> */}
                                                                                    <div className="col-lg-2 addbtn">
                                                                                        <Popup
                                                                                            importedData={importedData}
                                                                                            setImportedData={setImportedData}
                                                                                            modifiedFileData={modifiedFileData}
                                                                                            setModifiedFileData={setModifiedFileData}
                                                                                            modifiedSignData={modifiedSignData}
                                                                                            setModifiedSignData={setModifiedSignData} />
                                                                                    </div>
                                                                                </div>

                                                                                <div class="text-center pt-1 mb-5 pb-1">
                                                                                    {
                                                                                        documentList?.data?.map((data, i) => {
                                                                                            return (
                                                                                                <li key={i} >
                                                                                                    <span>{data.fileName}</span><br />
                                                                                                    <span>To: {data.userName}</span><br />
                                                                                                    <span>Last Change: {moment(data.updatedAt).format("LL")}</span><br />
                                                                                                    <span>Status: {data.status}</span><br />
                                                                                                    {
                                                                                                        data.status == "Completed" ? (
                                                                                                            <>
                                                                                                                <a href={data.filePath[0]} download target="_blank" className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" >
                                                                                                                    <span>Download</span>
                                                                                                                </a><br /><br /><br />
                                                                                                            </>
                                                                                                        ) : null
                                                                                                    }
                                                                                                    {
                                                                                                        data.status == "Incomplete" ? (
                                                                                                            <><SignPopup
                                                                                                                documentId={data._id}
                                                                                                                modifiedFileData={modifiedFileData}
                                                                                                                setModifiedFileData={setModifiedFileData}
                                                                                                                modifiedSignData={modifiedSignData}
                                                                                                                setModifiedSignData={setModifiedSignData}
                                                                                                            /><br /><br /><br /></>
                                                                                                        ) : null
                                                                                                    }
                                                                                                </li>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                                                                        <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                                                            <h4 class="mb-4">We are more than just a company</h4>
                                                                            <p class="small mb-0">Our mission is to empower organizations to make confident,
                                                                                customer-centric decisions by automating the analysis of text-based feedback. We believe
                                                                                that understanding your customers and employees is key to building great products, experiences
                                                                                and brands.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Dashboard;