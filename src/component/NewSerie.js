import React, {useState} from 'react'

import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NewSerie = () => {
    const [name, setName] = useState('') 
    const [success, setSuccess] = useState(false)

    const onChange = (event) => {
        setName(event.target.value)
    }

    const save = () => {
        axios
            .post('/api/series', {
            //name: name
            name
        })
            .then(response => {
                setSuccess(true)
        })
    }

    if (success) {
        return <Redirect to='/series' />
    }

    return (
        <div className="container">
            <h1>Nova Série</h1>
            
            <form>
                <div className="form-group">
                    <label htmlfor="name">Nome</label>
                    <input type="text" value={name} onChange={onChange} className="form-control" id="name" placeholder="Nome da série" />
                </div>
                
                <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
            </form>

        </div>
    )
}

export default NewSerie