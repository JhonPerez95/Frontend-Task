import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { Cards } from '../Card/Cards'
import './style.css'
export const FormTask = () => {
  const [isUpdate, setIsUpdate] = useState(false)
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({
    id: '',
    title: '',
    state: '',
    description: '',
  })

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const { data } = await axios({
      method: 'GET',
      url: 'http://localhost:4040/api/task',
    })
    setTasks(data.tasks)
  }
  const handlerSend = async (e) => {
    e.preventDefault()

    if (isUpdate) {
      await axios({
        method: 'PUT',
        url: `http://localhost:4040/api/task/${form.id}`,
        data: form,
      })
      setIsUpdate(false)
    } else {
       await axios({
        method: 'POST',
        url: 'http://localhost:4040/api/task',
        data: form,
      })
    }
    getData()
    setForm({
      id: '',
      title: '',
      state: '',
      description: '',
    })
  }

  const handlerChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value })
  }

  return (
    <div>
      <Form>
        <h3 className="title-Form">Crear o Editar una tarea</h3>
        <Form.Group className="mb-3" name="title" controlId="formTitle">
          <Form.Control
            name="title"
            value={form.title}
            type="text"
            placeholder="Titulo Tarea"
            onChange={handlerChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formState">
          <Form.Control
            type="text"
            onChange={handlerChange}
            value={form.state}
            name="state"
            placeholder="Estado de la  Tarea"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Control
            value={form.description}
            type="text"
            onChange={handlerChange}
            name="description"
            placeholder="Descripcion de la Tarea"
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handlerSend}>
          Enviar
        </Button>
      </Form>
      <hr className="hr" />

      <Cards
        setForm={setForm}
        setIsUpdate={setIsUpdate}
        tasks={tasks}
        getData={getData}
      />
    </div>
  )
}
