import React, {useState, useEffect} from 'react'

import axios from 'axios'
import { Link } from 'react-router-dom'

const Genres = () => {
    const [data, setData] = useState([])
    
    useEffect(() => {
        axios
         .get('/api/genres')
         .then((response) => {
             setData(response.data.data)
         })
    }, [])

    const deleteGenre = (id) => {
        axios
        .delete('/api/genres/' + id)
        .then(response => {
            const filtered = data.filter(item => item.id !== id)
            setData(filtered)
        })
    }

    const lineRender = (record) => {
        return (
            <tr key={record.id} >
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <Link className="btn btn-warning mr-3" to={'/genres/' + record.id}>Editar</Link>
                    <button className="btn btn-danger" onClick={() => deleteGenre(record.id)}>Remover</button>
                </td>
            </tr>
        )    
    }

    if(data.length === 0) {
        return (
            <div className="container">
                <h1>Gêneros</h1>
                <Link to='/genres/new'>Novo Gênero</Link>
                <div className="alert alert-warning" role="alert">
                    Você não possui gêneros criados
                </div>
            </div>
            
        )
    }
    
    return (
        <div className='container'>
            <h1>Novo Gênero</h1>
            <Link className="btn btn-primary" to='/genres/new'>Novo Gênero</Link>
            <table className="table table-dark">
                <thead>
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(lineRender)}
                </tbody>
            </table>

        </div>
    ) 
}

export default Genres


