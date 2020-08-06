import React from 'react';
import api from '../../services/api';

import whatsAppIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

export interface ScheduleProps {
  week_day: number,
  from: string,
  to: string
}
export interface TeacherProps {
  id?: number,
  name: string,
  avatar: string,
  whatsapp: string,
  bio: string,
  subject: string,
  schedule: Array<ScheduleProps>
}

export interface ClassProps extends TeacherProps {
  cost: number
}

export interface TeacherItemProps {
  teacher: ClassProps
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

  async function createNewConnection() {
    try {
      await api.post('connections', {
        user_id: teacher.id
      })

      alert('Connected!')
    }
    catch (err) {
      alert(err.message)
    }
  }


  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt="Teacher" />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>
        {teacher.bio}
        <br /><br />
        {teacher.bio}
      </p>

      <footer>
        <p>
          Preço/hora
        <strong>R$ {teacher.cost}</strong>
        </p>
        <a onClick={createNewConnection} target="_blank" rel="noopener noreferrer" href={`https://wa.me/${teacher.whatsapp}`}>
          <img src={whatsAppIcon} alt="Whatsapp" />
        Entrar em contato
        </a>
      </footer>

    </article>
  );
}

export default TeacherItem;