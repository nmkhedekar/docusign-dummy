import { useContext, useState } from "react";
import AuthContext from "../../../contexts/authContext";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSignup = async () => {
        // if(password || confirmPassword) {
        //     setErrorMsg("Password should match confirm password");
        //     return;
        // }
        authCtx.register(companyName, companyEmail, phone, password);

        // if(error) {
        //     console.log("registerError", error.message);
        //     setErrorMsg(error);
        //     return;
        // }                     
    }

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
                                                                                <h4 class="mt-1 mb-5 pb-1 signin">Sign Up</h4>
                                                                            </div>

                                                                            <div class="mt-5 mb-5 login-input" >

                                                                                <div class="form-outline mb-4 form-group">
                                                                                    <label class="form-label" for="form2Example11">User Name</label>
                                                                                    <input type="text" id="form2Example11" class="form-control"
                                                                                        placeholder="User Name"
                                                                                        value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                                                                                    />

                                                                                </div>

                                                                                <div class="form-outline mb-4 form-group">
                                                                                    <label class="form-label" for="form2Example11">Email Address</label>
                                                                                    <input type="email" id="form2Example11" class="form-control"
                                                                                        placeholder="Email address"
                                                                                        value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)}
                                                                                    />

                                                                                </div>

                                                                                <div class="form-outline mb-4 form-group">
                                                                                    <label class="form-label" for="form2Example11">Phone</label>
                                                                                    <input type="text" id="form2Example11" class="form-control"
                                                                                        placeholder="Contact No"
                                                                                        value={phone} onChange={(e) => setPhone(e.target.value)}
                                                                                    />

                                                                                </div>

                                                                                <div class="form-outline mb-4 form-group">
                                                                                    <label class="form-label" for="form2Example22">Password</label>
                                                                                    <input type="password" id="form2Example22" class="form-control"
                                                                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                                                                    />

                                                                                </div>

                                                                                <div class="form-outline mb-4 form-group">
                                                                                    <label class="form-label" for="form2Example22">Password</label>
                                                                                    <input type="password" id="form2Example22" class="form-control"
                                                                                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                                                                    />

                                                                                </div>

                                                                                <div class="text-center pt-1 mb-5 pb-1">
                                                                                    <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                                                        onClick={handleSignup}
                                                                                        type="button">Sign
                                                                                        up</button>
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

export default SignUp