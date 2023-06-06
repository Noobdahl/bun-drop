import React, { useState } from 'react';
import Logo from '../images/logo black.png'
import { useSignIn } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const signIn = useSignIn();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newConfirmPassword, setConfirmNewPassword] = useState("");

    async function handleSubmit()
    {
        await fetch('http://localhost:7000/users')
        .then((res) => res.json())
        .then((data) => {
            let user = data.filter((u) => u.username === username && u.password === password)
            if (user.length > 0) {
                signIn({
                    token: data.token,
                    expiresIn: 10, //time until login cookie is gone
                    tokenType: "Bearer",
                    authState: { username: user[0].username}
                })
                sessionStorage.setItem("user_name", user[0].username)
                navigate("/landing");
            }
        })
    }

    function handleChangedInput(e) {
        if (e.target.id === "username") {
            setUsername(e.target.value)
        }
        else if (e.target.id === "password") {
            setPassword(e.target.value)
        }
        else if (e.target.id === "newusername") {
            setNewUsername(e.target.value)
        }
        else if (e.target.id === "newpassword") {
            setNewPassword(e.target.value)
        }
        else if (e.target.id === "newconfirmpassword") {
            setConfirmNewPassword(e.target.value)
        }
    }

    async function handleRegister() {
        if (newUsername.length < 3 || newPassword.length < 3) {
            alert("Username/password must be atleast 3 characters long!")
            return
        }
        if (newPassword !== newConfirmPassword) {
            alert("Passwords mismatch!")
            return
        }

        await fetch("http://localhost:7000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: newUsername, password: newPassword}),
        });

        alert("Account created for " + newUsername)
        const name_element = document.getElementById('newusername')
        const pass_element = document.getElementById('newpassword')
        const confirm_element = document.getElementById('newconfirmpassword')
        name_element.value = "";
        pass_element.value = "";
        confirm_element.value = "";
        closeRegModal();
    }

    function handleOpenRegister() {
        const modal = document.querySelector("[data-modal-reg]")
        modal.showModal()
    }
    function closeRegModal() {
        const modal = document.querySelector("[data-modal-reg]")
        modal.close()
    }

    return ( 
        <div>
            <dialog data-modal-reg className="register-modal-container">
                <div className="login-form">
                    <img src={Logo} alt=""/>
                    <label className="text-outline" htmlFor="username">Username</label>
                    <input id="newusername" type="text" onChange={handleChangedInput}/>
                    <label className="text-outline" htmlFor="password">Password</label>
                    <input id="newpassword" type="password" onChange={handleChangedInput}/>
                    <label className="text-outline" htmlFor="confirmpassword">Confirm Password</label>
                    <input id="newconfirmpassword" type="password" onChange={handleChangedInput}/>
                    <button className="product-card-order-btn glow-on-hover button-lightup" type="submit" onClick={handleRegister}>Register</button>
                    <button className="product-card-order-btn glow-on-hover button-lightup" data-close-modal onClick={closeRegModal}>Close</button>
                </div>
            </dialog>

            <div className="login-form">
                <img src={Logo} alt=""/>
                <label className="text-outline" htmlFor="username">Username</label>
                <input id="username" type="text" onChange={handleChangedInput}/>
                <label className="text-outline" htmlFor="password">Password</label>
                <input id="password" type="password" onChange={handleChangedInput}/>
                <button className="product-card-order-btn glow-on-hover button-lightup" type="submit" onClick={handleSubmit}>Login</button>
                <div className="login-bot" onClick={handleOpenRegister}>
                    <p>No account? <span>Register here!</span></p>
                </div>
            </div>
        </div>
     );
}

export default Login;