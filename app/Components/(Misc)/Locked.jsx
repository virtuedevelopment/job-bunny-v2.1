import React from 'react'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Locked({message}) {
  return (
    <section className="lockedComponent">
        <p> <FontAwesomeIcon icon={faLock} className='icon'/>  {message}</p>
    </section>
  )
}
