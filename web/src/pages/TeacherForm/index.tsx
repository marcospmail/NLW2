import React, { useState, FormEvent, ChangeEvent, } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../services/api'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import Select from '../../components/Select'
import { ScheduleProps, TeacherProps } from '../../components/TeacherItem'

import subjects from '../../utils/subjects'
import weekDays from '../../utils/weekDays'

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'

const TeachersForm: React.FC = () => {
  const defaultSchedule: ScheduleProps = {
    week_day: 0,
    from: '',
    to: ''
  }

  const defaultData: TeacherProps = {
    name: '',
    avatar: '',
    whatsapp: '',
    bio: '',
    subject: '',
    schedule: [defaultSchedule]
  }

  const history = useHistory()
  const [data, setData] = useState<TeacherProps>(defaultData)

  function handleAddSchedule() {
    const newSchedule = [...data.schedule, defaultSchedule]
    setData({ ...data, schedule: newSchedule })
  }

  function handleScheduleChange(index: number, e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { id, value }: { id: string, value: string } = e.target

    const newSchedule = data.schedule.map((s, sIndex) => {
      if (sIndex === index) {
        return { ...s, [id]: value }
      }

      return s
    })

    setData({ ...data, schedule: newSchedule })
  }

  function removeSchedule(index: number) {
    const newSchedule = data.schedule.filter((s, sIndex) => sIndex !== index)

    setData({ ...data, schedule: newSchedule })

    //TODO remove from database
  }

  function handleDataChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { id, value }: { id: string, value: string } = e.target

    setData({ ...data, [id]: value })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    try {
      await api.post('classes', {
        ...data
      })

      alert('registered!')

      history.push('/')
    }
    catch (err) {
      alert('failed')
    }
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader title="Que incrível que você quer dar aulas."
        description="I dont remember what the text"
      />

      <form onSubmit={handleSubmit}>
        <main>

          <fieldset>
            <legend>Your data</legend>

            <Input id="name" label="Name" onChange={handleDataChange} />
            <Input id="avatar" label="Avatar" onChange={handleDataChange} />
            <Input id="whatsapp" label="WhatsApp" onChange={handleDataChange} />
            <TextArea id="bio" label="Biography" onChange={handleDataChange} />
          </fieldset>

          <fieldset>
            <legend>About the class</legend>

            <Select id="subject" label="Subject"
              onChange={handleDataChange}
              options={subjects} />

            <Input id="cost" label="Cost/hour" type="number"
              onChange={handleDataChange}
            />
          </fieldset>

          <fieldset>
            <legend>
              Schedule
            <button type="button" onClick={handleAddSchedule}>+ Add schedule</button>
            </legend>

            {data.schedule.map((s, index) => (

              <div key={index} className="schedule-item">

                <Select id="week_day" label="Week day"
                  onChange={(e) => handleScheduleChange(index, e)}
                  options={weekDays} />

                <Input id="from" label="From" type="time" onChange={(e) => handleScheduleChange(index, e)} />
                <Input id="to" label="To" type="time" onChange={(e) => handleScheduleChange(index, e)} />

                <button type="button" onClick={() => removeSchedule(index)}>X</button>

              </div>

            ))}

          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Important Information" />
            Important < br />
            Fill all the data
          </p>

            <button type="submit">Register</button>

          </footer>


        </main>
      </form>

    </div>
  )
}

export default TeachersForm;