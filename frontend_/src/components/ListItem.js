import React from 'react'
import { Link } from 'react-router-dom'

let getDate = (note) => {
  return new Date(note.updated).toLocaleDateString()
}


// This method rephrases the title
let getTitle = (note) => {
  const title = note.body.split('\n')[0]

  if(title.length > 32){
    return title.slice(0, 32)
  }

  return title
}

//The Body of the node
let getContent = (note) => {
  let title = getTitle(note)
  let content = note.body.replaceAll('\n', ' ')
  content = content.replaceAll(title, "")

  if(content.length > 32){
    return content.slice(0, 32)
  }
  else{
    return content
  }

}

const ListItem = ({note}) => {
  return (
    <Link to={'/note/' + note.id}>
      <div className='notes-list-item'>
        <h3>{getTitle(note)}</h3>
        <p>
          <span>{getDate(note)}</span>
          {getContent(note)}
        </p>
      </div>
      
    </Link>
  )
}

export default ListItem
