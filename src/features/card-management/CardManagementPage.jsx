import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

import CardList from './components/CardList'
import CardForm from './components/CardForm'

const CardManagementPage = () => {

  const navigate = useNavigate()

  const [totalCards, setTotalCards] = useState(0)
  const [cards, setCards] = useState([
    { id: 1, word: 'a', meaning: 'aa' },
    { id: 2, word: 'b', meaning: 'bb' }
  ])

  const handleStudyModeClick = () => {
    navigate('/study')
  }

  const handleCardSubmit = (values) => {
    //request insert
    //if success, refresh the list
  }

  const handleRemoveCard = ({ id }) => {
    //request delete
    //if success, refresh the list
  }

  useEffect(() => {
    setTotalCards(cards.length)
  }, [cards])

  return (
    <Container>
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
    </Container>
  )
}

export default CardManagementPage