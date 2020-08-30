import React, {useState, useEffect} from 'react'

import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
    const [form, setForm] = useState({
        name: ''
    }) 
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('Info')
    const [data, setData] = useState({})
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')
    
    useEffect(() => {
            axios
            .get('/api/series/' + match.params.id)
            .then(response => {
                setData(response.data)
                setForm(response.data)
            })
    }, [match.params.id])

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(response => {
                setGenres(response.data.data)
                const genres = response.data.data
                const encontrado = genres.find(value => data.genre === value.name)
                
                if(encontrado) {
                    setGenreId(encontrado.id)
                }
            })
    }, [data])
    
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage:`url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    } 

    const onChange = field => event => {
        setForm({
            ...form,
            [ field ]: event.target.value
        })
    }

    const onChangeGenre = event => {
        setGenreId(event.target.value)
    }

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })
    }

    const save = () => {
        axios
            .put('/api/series/' + match.params.id, {
                ...form, 
                genre_id: genreId    
            })
            .then(response => {
                setSuccess(true)
        })
    }

    if (success) {
        return <Redirect to='/series' />
    }

    return (
        <div>
            <header style={masterHeader}>
                <div className="h-100" style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <div className="h-100 container">
                        <div className="row h-100 align-items-center">
                            <div className="col-3">
                                <img alt={data.name} className="img-fluid img-thumbnail" src={data.poster} />
                            </div>
                            <div className="col-8">
                                <h1 className="font-weight-light text-white">{data.name}</h1>
                                <div className=" d-flex align-items-center lead text-white">
                                    { data.status === 'assistido' && <Badge className="mr-2" color="success">Assistido</Badge> }
                                    { data.status === 'para_assistir' && <Badge className="mr-3" color="warning">Para assistir</Badge> }
                                    <h3 className="font-weight-light text-white">Gênero: {data.genre}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <div className="container">
                <button className="btn btn-primary" onClick={() => {
                    setMode('Edit')
                }}>
                    Editar Série
                </button>
            </div>

            {
                mode === 'Edit' &&
             
                <div className="container">
                    
                    <h1>Nova Série</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input type="text" value={form.name} onChange={onChange('name')} className="form-control" id="name" placeholder="Nome da série" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Comentários</label>
                            <input type="text" value={form.comments} onChange={onChange('comments')} className="form-control" id="name" placeholder="Comentários da série" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Gênero</label>
                            <select className="form-control" onChange={onChangeGenre} value={genreId}>
                                { genres
                                    .map(genre => 
                                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                                )}
                            </select>
                        </div>
                        <div className=" d-flex justify-content-between">
                            <div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" checked={form.status === "assistido"} id="assistido" name="status" className="custom-control-input" value="assistido" onChange={seleciona('assistido')} />
                                    <label className="custom-control-label" htmlFor="assistido">Assistido</label>
                                </div>

                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" checked={form.status === "para_assistir"}  id="paraAssistir" name="status" className="custom-control-input" value="para_assistir" onChange={seleciona('para_assistir')} />
                                    <label className="custom-control-label" htmlFor="paraAssistir">Para assistir</label>
                                </div>
                            </div>
                            <div>
                                <button className="mr-2 btn btn-primary" onClick={() => {setMode('Info')}}>
                                    Cancelar Edição
                                </button>
                                <button  type="button" onClick={save} className="btn btn-primary">Salvar</button>
                            </div>
                        </div>
                    </form>

                </div>
            }
        </div>
    )
}

export default InfoSerie