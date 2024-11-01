import { useEffect, useRef, useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

import CardList from './components/CardList'
import CardForm from './components/CardForm'
import { ensureArray } from '../../helpers/array.helper'
import { CustomContainer, CustomRow } from '../common/styled/bootstraps.styled'
import { environment } from '../../helpers/environment'


const CardManagementPage = () => {

  const navigate = useNavigate()
  const abortController = useRef(new AbortController())

  const [totalCards, setTotalCards] = useState(0)
  const [cards, setCards] = useState([])
  const [requestingData, setRequestingData] = useState(false)

  const handleStudyModeClick = () => {
    navigate('/study')
  }

  const handleCardSubmit = async (values, form) => {
    //request insert
    //if success, put it in front of the list
    try {
      const { signal } = abortController.current
      const res = await fetch(`${environment.apiUrl}/api/card`, {
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
        form.restart()
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
      const res = await fetch(`${environment.apiUrl}/api/card/${id}`, {
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
      const res = await fetch(`${environment.apiUrl}/api/card?offset=${cards.length}&pageSize${pageSize}`, {
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
      <CustomRow>
        <Col xs={6}>
          <Button color='primary' onClick={handleStudyModeClick}>
            <i class='fa-solid fa-book'></i>&nbsp;Study Mode
          </Button>
        </Col>
        <Col xs={6} className='d-flex justify-content-end'>Total Cards: {totalCards}</Col>
      </CustomRow>
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