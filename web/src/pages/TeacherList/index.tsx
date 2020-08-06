import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import api from '../../services/api'

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TeacherItem, { ClassProps } from '../../components/TeacherItem';
import Select from '../../components/Select';

import subjects from '../../utils/subjects'
import weekDays from '../../utils/weekDays'

import './styles.css'

export interface ScheduleFilterProps {
  week_day: number,
  subject: string,
  time: string
}

const TeachersList: React.FC = () => {
  const defaultScheduleFilter: ScheduleFilterProps = {
    week_day: 0,
    subject: subjects[0].value,
    time: ''
  }

  const [scheduleFilter, setScheduleFilter] = useState<ScheduleFilterProps>(defaultScheduleFilter)
  const [classes, setClasses] = useState<Array<ClassProps>>([])

  function handleFilterChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value }: { id: string, value: string } = e.target
    setScheduleFilter({ ...scheduleFilter, [id]: value })
  }

  const fetchClassesCallback = useCallback(async function fetchClasses() {
    try {
      const response = await api.get('classes', {
        params: {
          ...scheduleFilter
        }
      })

      setClasses(response.data)
    }
    catch (err) {
    }

  }, [scheduleFilter])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    fetchClassesCallback()
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis." >

        <form id="search-teachers" onSubmit={handleSubmit}>

          <Select id="subject" label="Subject"
            onChange={handleFilterChange}
            options={subjects} />

          <Select id="week_day" label="Week Day"
            onChange={handleFilterChange}
            options={weekDays} />

          <Input id="time" label="Hora" type="time"
            onChange={handleFilterChange}
          />

          <button type="submit">Buscar</button>

        </form>

      </PageHeader>

      <main>

        {classes.map(c => (<TeacherItem key={c.id} teacher={c} />))}

      </main>

    </div>
  )
}

export default TeachersList;