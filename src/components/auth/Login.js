import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clientesAxios from '../../config/axios.js';

// context
import { CRMContext } from '../../context/CRMContext.js';

function Login() {

    // auth y token
    const [auth, guardarAuth] = useContext(CRMContext);

    const navigate = useNavigate();

    // state con los datos del formulario
    const [credenciales, guardarCredenciales] = useState({})

    // inicia sesion en el servidor
    const iniciarSesion = async (e) => {
        e.preventDefault();

        // autenticar al usario
        try {
            const respuesta = await clientesAxios.post('/usuarios/iniciar-sesion', credenciales);

            // extraer token y guardarlo en local storage
            const { token } = respuesta.data;
            localStorage.setItem('token', token);

            // colocar en el state
            guardarAuth({
                token,
                auth: true
            })

            // alerta
            Swal.fire(
                'Bienvenido',
                'Has iniciado sesion correctamente',
                'success'
            )

            navigate('/')

        } catch (error) {

            if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data.mensaje
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error'
                })

            }
        }
    }

    // almacenar los datos en el state
    const leerDatos = (e) => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Fragment>
            <div className='login'>
                <h2>Iniciar Sesión</h2>

                <div className='.contenedor-formulario'>
                    <form
                        onSubmit={iniciarSesion}
                    >
                        <div className='campo'>
                            <label>Email</label>
                            <input
                                type='text'
                                name='email'
                                placeholder='Tu email'
                                required
                                onChange={leerDatos}
                            />
                        </div>

                        <div className='campo'>
                            <label>Tu Contraseña</label>
                            <input
                                type='password'
                                name='password'
                                placeholder='Tu Contraseña'
                                required
                                onChange={leerDatos}
                            />
                        </div>
                        <input type='submit' value='Iniciar Sesión' className='btn btn-verde btn-block' />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;