import {createRef, useState} from "react";
import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from '../contexts/ContextProvider'

export default function Login() {
  const emailRef = createRef()
  const passwordRef = createRef()
  const {setUser, setToken} = useStateContext();
  const [errors, setErrors] = useState(null)

  
  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    setErrors(null);
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response;
        if(response && response.status == 422)
        {
          if(response.data.error)
          {
            setErrors(response.data.errors)
          } else {
            setErrors({
              email: [response.data.message]
            })
          }
        }
      })
  }

  return (
      <form onSubmit={onSubmit}>
        <h1 className="title">Login into your account</h1>
        {/* {message &&
          <div className="alert">
            <p>{message}</p>
          </div>
        } */}
      {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        <input ref={emailRef} type="email" placeholder="Email"/>
        <input ref={passwordRef} type="password" placeholder="Password"/>
        <button className="btn btn-block">Login</button>
        <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
      </form>
  )
}
