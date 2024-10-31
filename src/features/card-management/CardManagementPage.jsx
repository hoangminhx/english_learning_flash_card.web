import { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import CardList from './components/CardList'
import CardForm from './components/CardForm'
import { ensureArray } from '../../helpers/array.helper'

const CustomContainer = styled(Container)`
  height: 80vh;
  overflow: auto;
`

const CardManagementPage = () => {

  const navigate = useNavigate()
  const abortController = useRef(new AbortController())

  const [totalCards, setTotalCards] = useState(0)
  const [cards, setCards] = useState([])

  const handleStudyModeClick = () => {
    navigate('/study')
  }

  const handleCardSubmit = async (values) => {
    //request insert
    //if success, refresh the list
    try {
      const { signal } = abortController.current
      const res = await fetch('https://localhost:5001/api/card', {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        signal
      })

      if (res.ok) {
        fetchAllCardsAsync()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveCard = async ({ id }) => {
    //request delete
    //if success, refresh the list
    try {
      const { signal } = abortController.current
      const res = await fetch(`https://localhost:5001/api/card/${id}`, {
        method: 'DELETE',
        signal
      })

      if (res.ok) {
        fetchAllCardsAsync()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAllCardsAsync = async () => {
    try {
      const { signal } = abortController.current
      const res = await fetch('https://localhost:5001/api/card', {
        method: 'GET',
        headers:
        {
          'Content-Type': 'application/json',
        },
        signal
      })
      const data = await res.json()
      setCards(ensureArray(data))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAllCardsAsync()

    return () => {
      abortController.current.abort()
    }
  }, [])

  useEffect(() => {
    setTotalCards(cards.length)
  }, [cards])

  return (
    <CustomContainer>
      <Row>
        <Col xs={6}><Button color='primary' onClick={handleStudyModeClick}>Study Mode</Button></Col>
        <Col xs={6} className='d-flex justify-content-end'>Total Cards: {totalCards}</Col>
      </Row>
      <Row>
        <Col>
          <CardForm onCardSubmit={handleCardSubmit} />
        </Col>
      </Row>
      <Row>
        <CardList cards={cards} onRemoveCard={handleRemoveCard} />
      </Row>
    </CustomContainer>
  )
}

export default CardManagementPage