import React from 'react';

import whatsAppIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars1.githubusercontent.com/u/7114995?s=460&u=abc163254d341164a15b6f3f09ae8c03c16e16fc&v=4" alt="Teachers photo" />
        <div>
          <strong>Marcos Paulo</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        asdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihas
      <br /><br />
      asdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihasasdiho ad iosahd osah as ihas
    </p>

      <footer>
        <p>
          Preço/hora
        <strong>R$ 50,00</strong>
        </p>
        <button type="button">
          <img src={whatsAppIcon} alt="Whatsapp" />
        Entrar em contato
      </button>
      </footer>

    </article>
  );
}

export default TeacherItem;