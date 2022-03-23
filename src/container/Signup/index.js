import React, {useState} from 'react'
import Navbar from '../../component/Navbar'
import './index.css'
import * as yup from 'yup'
import Toast from '../../component/Toast'

let schema = yup.object().shape({
    email: yup.string().required().email(),
    companyName: yup.string().required(),
    password: yup.string().required().min(6),
    checbox: yup.bool().oneOf([true], "Accept The Terms and condition Field"),
  });

function Signup() {
    const [ email, setEmail ] = useState('');
    const [ companyName, setComapnyName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ checbox, setCheckbox ] = useState(false);
    const [ message, setMessage ] = useState('')


    console.log(email, companyName, password, checbox)
    const submitHandler = (e) => {
        
        schema.validate({email, companyName, password, checbox},{abortEarly:false})
        .then( async data => {
        setMessage('');
            // Backend api 
        })
        .catch( err => {
        const errorMessage = err.errors ? err.errors[0] : err.message
        setMessage(errorMessage);
        });
    }

    return (
        <>
        <div className="main-container">
        <Navbar />
        <Toast message={message} />
        <div className="container w-50 main" >
            <h1 className="text-center main-heading">Sign Up</h1>
            <p className="text-center sub-heading mt-3">No credit card required</p>
            <form>
                <div className="m-3">
                   <input type="email" className="form-control input-field" placeholder="Email address"  aria-describedby="emailHelp"
                   value={email}
                   onInput={e=>setEmail(e.target.value)}
                   />
                </div>
                <div className="m-3">
                   <input type="text" className="form-control input-field"  placeholder="Company name"
                   value={companyName}
                   onInput={e=>setComapnyName(e.target.value)}
                   />
                </div>
                <div className="m-3">
                   <input type="password" className="form-control input-field" placeholder="Password"
                   value={password}
                   onInput={e=>setPassword(e.target.value)}
                   />
                </div>
                <div className="m-3 form-check">
                    <input type="checkbox" className="form-check-input" 
                    value={checbox}
                    onInput={(e)=>setCheckbox(e.target.checked)}
                    />
                    <label className="form-check-label i-agree">I agree to the <span className="iagree-terms">Terms & Conditions</span></label>
                </div>
                <div className="text-center"><button type="button" className="submit-button"
                onClick={()=>submitHandler()}
                >Get Started</button></div>
            </form>
            <p className="text-center i-agree mt-3">Already have an account? <span className="iagree-terms">Sign in</span></p>
        </div>
        </div>
        </>
    )
}

export default Signup
