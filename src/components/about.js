import React from 'react'
// import { useContext } from 'react'
// import noteContext from '../context/notes/noteContext'

const About = () => {

  return (
    <div class="container mx-5 my-5">
      <h2 class="mb-4 mx-2 my-5">About SyncNote</h2>
      <ul>
        <li>
          <p>SyncNote lets you securely store and manage your personal notes in one place, making them easy to access anytime.</p>
        </li>
        <li>
          <p>You can create, edit, and delete notes instantly with a simple and clean user interface designed for efficiency.</p>
        </li>
        <li>
          <p>All notes are tagged for better organization, helping you quickly find the information you need.</p>
        </li>
        <li>
          <p>User authentication ensures that your notes are safe and accessible only to you through secure login and logout features.</p>
        </li>
        <li>
          <p>Export your notes as a PDF document whenever you want to back them up or share them easily with others.</p>
        </li>
      </ul>

    </div>

  )
}

export default About
