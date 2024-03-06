"use client"
import React, {useState, useEffect} from 'react'
import styles from './contact.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function ContactForm() {
  return (
    <form>
        <div className="inputbox">
            <span>
                <small>Fullname:</small>
                <input type="text" required placeholder='John Doe' />
            </span>
            <FontAwesomeIcon icon={faUser} />
        </div>

        <div className="inputbox">
            <span>
                <small>Email Address:</small>
                <input type="email" required placeholder='Johndoe@gmail.com' />
            </span>
            <FontAwesomeIcon icon={faEnvelope} />
        </div>

        <div style={{ gridColumn: "1/-1" }} className="inputbox">
            <span>
                <small>Message</small>
                <textarea placeholder='Your message' ></textarea>
            </span>
        </div>

        <button style={{ gridColumn: "1/-1" }} className="primary-button" type='submit'>Submit Message</button>
    </form>
  )
}
