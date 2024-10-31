import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Container, Row } from 'reactstrap'

import Card from './components/Card'
import { ensureArray } from '../../helpers/array.helper'

const StudyPage = () => {

  const pageSize = 10
  const abortController = useRef(new AbortController())
  const navigate = useNavigate()

  const [index, setIndex] = useState(0)
  const [total, setTotal] = useState(0)
  const [cards, setCards] = useState([])
  const [currentCard, setCurrentCard] = useState()
  const [meaningVisible, setMeaningVisible] = useState(false)
  const [page, setPage] = useState(0)

  const handleManageCardsClick = () => {
    navigate('/card-management')
  }

  const handlePrevious = () => {
    setIndex(prevIndex => (prevIndex === 0 ? prevIndex : prevIndex - 1))
  }

  const handleNext = () => {
    setIndex(prevIndex => (prevIndex === (total - 1) ? prevIndex : prevIndex + 1))
  }

  const handleShowMeaning = () => {
    setMeaningVisible(prevState => !prevState)
  }

  const fetchCardsAsync = async () => {
    try {
      const { signal } = abortController.current
      const res = await fetch(`https://localhost:5001/api/study/cards?page=${page}&pageSize=${pageSize}`, {
        method: 'GET',
        headers:
        {
          'Content-Type': 'application/json',
        },
        signal
      })
      const data = await res.json()

      if (data) {
        setCards(ensureArray(data.cards))
        setTotal(data.total)

        let indexInCurrentPage = index - page * pageSize
        setCurrentCard(data.cards[indexInCurrentPage])
      }

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCardsAsync()

    return () => {
      abortController.current.abort()
    }
  }, [])

  useEffect(() => {
    if (index >= ((page + 1) * pageSize)) { //out of the current page
      setPage(prevPage => prevPage + 1)
    } else if (index < (page * pageSize)) {
      setPage(prevPage => prevPage - 1)
    } else {
      let indexInCurrentPage = index - page * pageSize
      setCurrentCard(cards[indexInCurrentPage])
    }
  }, [index])

  useEffect(() => {
    fetchCardsAsync()
  }, [page])

  return (
    <Container>
      <Row>
        <Col><Button color='primary' onClick={handleManageCardsClick}>Manage Cards</Button></Col>
      </Row>
      <Row>
        <Col>
          <Card card={currentCard} meaningVisible={meaningVisible} />
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <Button onClick={handlePrevious} disabled={!index}>{'<'}</Button>
        </Col>
        <Col xs={4}>
          <Button onClick={handleShowMeaning} disabled={!currentCard}>
            {meaningVisible ? 'Hide Meaning' : 'Show Meaning'}
          </Button>
        </Col>
        <Col xs={4}>
          <Button onClick={handleNext} disabled={!total || (index === (total - 1))}>{'>'}</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {`Card ${total ? index + 1 : 0} of ${total}`}
        </Col>
      </Row>

    </Container>
  )
}

export default StudyPage