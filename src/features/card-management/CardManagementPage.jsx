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
  const [requestingData, setRequestingData] = useState(false)

  const handleStudyModeClick = () => {
    navigate('/study')
  }

  const handleCardSubmit = async (values) => {
    //request insert
    //if success, put it in front of the list
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
        const { id } = await res.json()
        addLocalCard({ id, ...values })
        setTotalCards(prevTotal => prevTotal + 1)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveCard = async ({ id }) => {
    //request delete
    //if success, delete it locally
    try {
      const { signal } = abortController.current
      const res = await fetch(`https://localhost:5001/api/card/${id}`, {
        method: 'DELETE',
        signal
      })

      if (res.ok) {
        removeLocalCard({ id })
        setTotalCards(prevTotal => prevTotal - 1)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleRequestData = () => {
    if (requestingData || totalCards === cards.length) return

    fetchCardsAsync()
  }

  const removeLocalCard = ({ id }) => {
    setCards(prevCard => {
      const cardIndex = prevCard.findIndex(c => c.id === id)
      prevCard.splice(cardIndex, 1)
      return prevCard
    })
  }

  const addLocalCard = newCard => {
    if (newCard.id) {
      setCards(prevCards => [newCard].concat(prevCards))
    }
  }

  const fetchCardsAsync = async () => {
    setRequestingData(true)
    const pageSize = 10
    try {
      const { signal } = abortController.current
      const res = await fetch(`https://localhost:5001/api/card?offset=${cards.length}&pageSize${pageSize}`, {
        method: 'GET',
        headers:
        {
          'Content-Type': 'application/json',
        },
        signal
      })
      const data = await res.json()
      setCards(prevCards => prevCards.concat(ensureArray(data.items)))
      setTotalCards(data.total)
    } catch (error) {
      console.error(error)
    }

    setRequestingData(false)
  }

  useEffect(() => {
    fetchCardsAsync()

    return () => {
      abortController.current.abort()
    }
  }, [])

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
        <CardList cards={cards} onRemoveCard={handleRemoveCard} onRequestData={handleRequestData} />
      </Row>
    </CustomContainer>
  )
}

export default CardManagementPage