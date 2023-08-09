import React, {useEffect, useState} from 'react' 
import notes from '../assets/data'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

 const NotePage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  console.log("id:", id)
  const note1 = notes.find(note => note.id===Number(id))


  let [note, setNote] = useState([])

  useEffect(() => {
     getNote()
  }, [id])

  let getNote = async () => {
    if(id === 'new'){
      return
    }
    let url = '/api/notes/' + id
    let response = await fetch(url)
    let data = await response.json()
    setNote(data)
  }

  let createNote = async () => {
    console.log('Create Note')
    let url = '/api/notes/create/'
    await fetch(url, {
      method: 'POST',
      headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
  }


  let updataNote = async () => {
    let url = '/api/notes/' + id + '/update/'
    await fetch(url, {
      method: 'PUT',
      headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
  }

  let deleteNote = async () => {
    let url = '/api/notes/' + id + '/delete/'
    await fetch(url, {
      method: 'DELETE',
      headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()})
    })
    navigate('/')
  }


  
  let handleSubmit = () => {

    if(id !== 'new' && !note.body){
      deleteNote()
    }
    else if(id !== 'new'){
      updataNote()
    }
    else if(id === 'new' && note !== null){
      createNote()
    }

    navigate('/')
  }

  
  return (
    <div className='note'>
      {/* <h1>{id}</h1> */}
      <div className='notes-header'>
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit}/>
          </Link>
        </h3>

        {id !== 'new' ? ( 
           <button onClick={deleteNote} className='notes-header'> Delete </button>
        ): (
          <button onClick={handleSubmit} className='notes-header'> Done </button>
        )}

      </div>
      {/* <button onClick={handleSubmit} className='notes-header'> Done </button> */}

      <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body}>

      </textarea>

    </div>
  )
}


export default NotePage