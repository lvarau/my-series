import React, {useState, useEffect} from 'react'

import axios from 'axios'
import { Redirect} from 'react-router-dom'

const EditGenre = ({ match }) => {
    const [name, setName] = useState('') 
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        axios
            .get('/api/genres/' + match.params.id)
            .then(response => {
                setName(response.data.name)
            })
    }, [match.params.id])

    const onChange = (event) => {
        setName(event.target.value)
    }

    const save = () => {
        axios
            .put('/api/genres/' + match.params.id, {
            //name: name
            name
        })
            .then(response => {
                setSuccess(true)
        })
    }

    if (success) {
        return <Redirect to='/genres' />
    }

    return (
        <div className="container">
            <h1>Editar gênero</h1>
            
            <form>
                <div className="form-group">
                    <label htmlfor="name">Nome</label>
                    <input type="text" value={name} onChange={onChange} className="form-control" id="name" placeholder="Nome do gênero" />
                </div>
                
                <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
            </form>

        </div>
    )
}

export default EditGenre