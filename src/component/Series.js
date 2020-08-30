import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'

const Series = () => {
    const [data, setData] = useState([])
    
    useEffect(() => {
        axios
         .get('/api/series')
         .then((response) => {
             setData(response.data.data)
         })
    }, [])

    const deleteSerie = (id) => {
        axios
        .delete('/api/series/' + id)
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
                    <Link className="btn btn-warning mr-3" to={'/series/' + record.id}>Infomação</Link>
                    <button className="btn btn-danger" onClick={() => deleteSerie(record.id)}>Remover</button>
                </td>
            </tr>
        )    
    }

    if(data.length === 0) {
        return (
            <div className="container">
                <h1>Séries</h1>
                <Link className="btn btn-primary" to='/series/new'>Nova Série</Link>
                <div className="alert alert-warning" role="alert">
                    Você não possui séries criadas
                </div>
            </div>
            
        )
    }

    return (
        <div className='container'>
            <h1>Séries</h1>
            <Link className="btn btn-primary" to='/series/new'>Nova Série</Link>
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

export default Series