import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api'

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css'

const Landing: React.FC = () => {
  const [connections, setConnections] = useState<number>(0)

  async function fetchConnections() {
    const response = await api.get('connections')
    setConnections(response.data.total)
  }

  useEffect(() => {
    fetchConnections()
  }, [])

  return (
    <div id="page-landing">

      <div id="page-landing-content" className="container">

        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Your study place.</h2>
        </div>

        <img src={landingImg} alt="Study platform" className="hero-image" />

        <div className="buttons-container">

          <Link to="/study" className="study">
            <img src={studyIcon} alt="Study" />
            Study
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Teach" />
            Teach
          </Link>

        </div>

        <span className="total-connection">
          {connections > 0 ? `${connections} connections already made` : 'no connection made yet'} <img src={purpleHeartIcon} alt="Coração roxo" />
        </span>

      </div>
    </div>
  )
}

export default Landing;