import React from 'react'

import './styles.css'

export default async function HomePage() {
  return (
    <div className="home">
      <div className="content">
        <a className="admin" href={'/admin'} rel="noopener noreferrer" target="_blank">
          Go to admin panel
        </a>
      </div>
    </div>
  )
}
