import React, { useState, useEffect, use } from 'react'
import '../../styles/profile.css'
import { useParams } from 'react-router-dom'
import api from '../../services/api'

const Profile = () => {
    const { id } = useParams()
    const [ profile, setProfile ] = useState(null)
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        api.get(`/food-partner/${id}`)
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
            })
    }, [ id ])


    return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-meta">
                    {/* Using logo.png from assets folder */}
                    <img className="profile-avatar" src="../../src/assets/logo.png" alt="" /> 

                    <div className="profile-info">
                        <h1 className="profile-pill profile-business" title="Business name">
                            {profile?.name}
                        </h1>
                        <p className="profile-pill profile-address" title="Address">
                            {profile?.address}
                        </p>
                    </div>
                </div>

                <div className="profile-stats" role="list" aria-label="Stats">
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">E-mail</span>
                        <span className="profile-pill">{profile?.email}</span>
                    </div>
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">Phone</span>
                        <span className="profile-pill">{profile?.phone}</span>
                    </div>
                </div>
            </section>

            <hr className="profile-sep" />

            <section className="profile-grid" aria-label="Videos">
                {videos.map((v) => (
                    <div key={v.id} className="profile-grid-item">
                        {/* Placeholder tile; replace with <video> or <img> as needed */}


                        <video
                            className="profile-grid-video"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            src={v.video} muted ></video>


                    </div>
                ))}
            </section>
        </main>
    )
}

export default Profile