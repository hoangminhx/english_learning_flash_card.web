import { List } from 'react-virtualized'
import { Button, Col, Row } from 'reactstrap'

const CardList = ({ cards = [], onRemoveCard, onRequestData }) => {

  const rowRenderer = ({ index, key, style }) => {
    const { id, word, meaning } = cards[index] || {}
    return (
      <Row key={key} style={style}>
        <Col xs={10}>
          <div>{word}</div>
          <div>{meaning}</div>
        </Col>
        <Col xs={2}>
          <div><Button onClick={() => onRemoveCard && onRemoveCard({ id })}>{'del'}</Button></div>
        </Col>
      </Row>
    )
  }

  const handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      onRequestData && onRequestData()
    }
  }

  return (
    <List
      width={500}
      height={300}
      rowCount={cards.length}
      rowHeight={50}
      rowRenderer={rowRenderer}
      onScroll={handleScroll}
    />
  )
}

export default CardList