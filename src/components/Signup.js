import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const host = "http://localhost:4000"
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    const json = await response.json()
    console.log(json)
    if (json.success === true) {
      // Save auth token and redirect
      localStorage.setItem("token", json.authtoken)
      navigate("/")
      props.showAlert(" Account Created Successfully", "success")
    }
    else {
      props.showAlert(" Invalid Credentials", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <h2 className='mx-5 my-5'>Create an Account to continue to SyncNote</h2>

      <form className='mx-5 my-5' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputname" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} minLength={3} required aria-describedby="nameHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" autoComplete="current-email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" autoComplete="current-password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange} minLength={8} required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type={showConfirmPassword ? "text" : "password"} autoComplete="current-password" className="form-control" name="cpassword" id="cpassword" value={credentials.cpassword} onChange={onChange} required />
        </div>
        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="showCPassword" checked={showConfirmPassword} onChange={() => setShowConfirmPassword(!showConfirmPassword)} />
          <label className="form-check-label" htmlFor="showCPassword"> Show Confirm Password </label>
          </div>
          <button type="submit" className="btn btn-primary">SignUp</button>
      </form>
    </div>
  )
}

export default Signup
