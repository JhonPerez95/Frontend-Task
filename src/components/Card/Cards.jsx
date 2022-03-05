import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Button } from 'react-bootstrap'

export const Cards = ({ setForm, setIsUpdate , tasks , getData }) => {

  const handlerEditar = (e, item) => {
    e.preventDefault()
    setForm({ ...item })
    setIsUpdate(true)
  }
  const handlerEliminar = async (e, item) => {
    e.preventDefault()
    await axios({
      method: 'DELETE',
      url: `http://localhost:4040/api/task/${item.id}`,
    })
    getData()
  }
  return (
    <div className="row">
      {tasks.map((item) => (
        <div className="col-sm-3 mt-2" key={item.id}>
          <Card border="info">
            <Card.Header>{item.title}</Card.Header>
            <Card.Body>
              <Card.Title>{item.state}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Button
                className="btn-card"
                onClick={(e) => handlerEditar(e, item)}
                variant="primary"
              >
                Editar
              </Button>
              <Button
                className=""
                onClick={(e) => handlerEliminar(e, item)}
                variant="danger"
              >
                Eliminar
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  )
}
