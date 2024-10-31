import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Row } from 'reactstrap'

import Card from './components/Card'
import { ensureArray } from '../../helpers/array.helper'
import { CustomContainer, CustomRow } from '../common/styled/bootstraps.styled'
import { environment } from '../../helpers/environment'

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
      const res = await fetch(`${environment.apiUrl}/api/study/cards?page=${page}&pageSize=${pageSize}`, {
        method: 'GET',
        headers:
        {
          'Content-Type': 'application/json',
        },
        signal
      })
      const data = await res.json()

      if (data) {
        setCards(ensureArray(data.items))
        setTotal(data.total)

        let indexInCurrentPage = index - page * pageSize
        setCurrentCard(data.items[indexInCurrentPage])
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
    <CustomContainer>
      <CustomRow>
        <Col>
          <Button color='primary' onClick={handleManageCardsClick}>
            <i class='fa-solid fa-book'></i>&nbsp;Manage Cards
          </Button>
        </Col>
      </CustomRow>
      <Row>
        <Col>
          <Card card={currentCard} meaningVisible={meaningVisible} />
        </Col>
      </Row>
      <Row>
        <Col xs={4} className='text-end'>
          <Button
            onClick={handlePrevious}
            disabled={!index}
            outline
            color='dark'
          >
            <i class='fa-solid fa-angle-left'></i>
          </Button>
        </Col>
        <Col xs={4} className='text-center'>
          <Button
            color='primary'
            onClick={handleShowMeaning}
            disabled={!currentCard}
          >
            <i class='fa-solid fa-arrows-rotate'></i>&nbsp;
            {meaningVisible ? 'Hide Meaning' : 'Show Meaning'}
          </Button>
        </Col>
        <Col xs={4}>
          <Button
            outline
            color='dark'
            onClick={handleNext}
            disabled={!total || (index === (total - 1))}
          >
            <i class='fa-solid fa-angle-right'></i>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className='text-center'>
          {`Card ${total ? index + 1 : 0} of ${total}`}
        </Col>
      </Row>

    </CustomContainer>
  )
}

export default StudyPage