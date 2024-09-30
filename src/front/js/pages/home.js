import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const [mensaje, setMensaje] = useState("")


	const login = () => {

		fetch(process.env.BACKEND_URL + "/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},

			body: JSON.stringify({
				"email": email,
				"password": password
			}),
		})

			.then(response => response.json())
			.then((result) => {
				if (result.token) {
					localStorage.setItem("Token", result.token)
					navigate("/demo")
				}
				else {
					setError(result.msg)
				}
			})
			.catch(error => console.log('error', error));

	}



	const enviarDatos = () => {

		fetch(process.env.BACKEND_URL + "/api/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer " + localStorage.getItem("Token"),
			},
			body: JSON.stringify({
				"email": email,
				"password": password
			}),
		})

			.then(response => response.json())
			.then((result) => {
				if (result) {
					setMensaje(result.msg)
				}
				else {
					setMensaje("Usuario ya existe")
				}
			})
			.catch(error => console.log('error', error));

	}



	return (
		<>
			<div><h1 className="text-center titulo">Bienvenidos al fanclub MotoGP!</h1></div>
			<div className="row align-items-center text-center mt-5">
				<div className="col-6 align-items-center">
					<h1>Registro</h1>
					<input type="email" className="mt-3" placeholder="email" onChange={(event) => setEmail(event.target.value)}></input>
					<input type="password" placeholder="password" className="ms-3" onChange={(event) => setPassword(event.target.value)}></input>
					<button className=" btn btn-success ms-3" type="submit" onClick={enviarDatos} >Enviar</button>
				</div>
				<div className="col-6">
					<img width={600} src="https://www.motociclismo.es/uploads/s1/13/11/10/97/todos-los-pilotos-de-motogp-2024.jpeg"></img>
				</div>

			</div>

			{mensaje &&
				<div className="text-center alert alert-danger" role="alert">
					{mensaje}
				</div>}


			<div className="row align-items-center text-center mt-5">
				<div className="col-6 align-items-center">
					<h1>Login</h1>
					<input type="email" className="mt-3" placeholder="email" onChange={(event) => setEmail(event.target.value)}></input>
					<input type="password" placeholder="password" className="ms-3" onChange={(event) => setPassword(event.target.value)}></input>
					<button className="btn btn-success ms-3" onClick={login}>Entrar</button>
				</div>
				<div className="col-6">
					<img width={700} src="https://resources.motogp.pulselive.com/photo-resources/2024/09/19/c8d424b9-69b1-43e6-8327-8f4faa4119de/Line_up-initial-2025-16_9-3_06.jpg?width=1440&height=810"></img>
				</div>
			</div>

			{error &&
				<div class="alert alert-danger" role="alert">
					{error}
				</div>}
		</>
	);
};
