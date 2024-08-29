import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom'
import clientesAxios from '../../config/axios.js';


function NuevoCliente({history}) {
 
    // ROUTE
    const navigate = useNavigate()

    // cliente = state, guardarCliente = funcion para guardar el state
    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    })

    // Funciones de sanitización
    const sanitizeText = (text) => {
        return text.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    };

    const sanitizeEmail = (email) => {
        return email.toLowerCase().trim();
    };

    const sanitizePhone = (phone) => {
        return phone.replace(/[^0-9+]/g, '');
    };

    // leer datos del fomulario
    const actualizarState = (e) => {
        
        const {name, value} = e.target
        let sanitizedValue = value;
        
        // Aplicar la sanitizacion segun el campo
        switch (name){
            case 'nombre':
            case 'apellido':
            case 'empresa':
                sanitizedValue = sanitizeText(value);
                break;
            
            case 'email':
                sanitizedValue = sanitizeEmail(value);
                break;

            case 'telefono':
                sanitizedValue = sanitizePhone(value);
                break;
                default:
                    break;   
        }


        // Almacenar los datos sanitizados en el state
        guardarCliente({
            // obtener copia del state acutal
            ...cliente,
            [name]: sanitizedValue
        })

        console.log(cliente)
    }

    // añade en la restapi el cliente
    const agregarCliente = async (e) => {
        e.preventDefault();

        try {
            const res = await clientesAxios.post('/clientes', cliente);
            Swal.fire({
                title: "Se agregó el Cliente!",
                text: res.data.mensaje,
                icon: "success"
            });
            
            // Redireccionar
            navigate('/')
        
        } catch (error) {
            if (error.response && error.response.data.errors) {
                const errorMessages = error.response.data.errors.map(err => err.msg).join('\n');
                Swal.fire({
                    title: "Error!",
                    text: errorMessages,
                    icon: "error"
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Hubo un problema al agregar el cliente",
                    icon: "error"
                });
            }
        }
    };

    // validar formulario
    const validarCliente = () => {
        const { nombre, apellido, email, empresa, telefono } = cliente;

        // revisar que las propiedades del state tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

        // return true o false
        return valido;
    }

    return (
        <Fragment>
            <h2>Nuevo Cliente</h2>

            <form
                onSubmit={agregarCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        onChange={actualizarState} />

                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                        placeholder="Apellido Cliente"
                        name="apellido"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text"
                        placeholder="Empresa Cliente"
                        name="empresa"
                        onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                        placeholder="Email Cliente"
                        name="email"
                        onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel"
                        placeholder="Teléfono Cliente"
                        name="telefono"
                        onChange={actualizarState} />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Cliente"
                        disabled={validarCliente()}
                    />
                </div>

            </form>
        </Fragment>
    )
}


// HOC, funcion que toma un componente y retorna un nuevo componente
export default  NuevoCliente