import { List } from 'react-virtualized'
import { Button, Col, Row } from 'reactstrap'
import styled from 'styled-components'

const CustomList = styled(List)`
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 0px rgba(3, 7, 18, 0.02),
  0px 1px 1px rgba(3, 7, 18, 0.04),
  1px 1px 3px rgba(3, 7, 18, 0.06),
  2px 3px 5px rgba(3, 7, 18, 0.08),
  3px 4px 8px rgba(3, 7, 18, 0.10);
`

const CustomH6 = styled.h6`
  color: rgb(46, 39, 160);
`

const TextContainer = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const CustomCol = styled(Col).attrs({ className: 'd-flex justify-content-center' })`
  align-items: center;
`

const CardList = ({ cards = [], onRemoveCard, onRequestData }) => {

  const rowRenderer = ({ index, key, style }) => {
    const { id, word, meaning } = cards[index] || {}
    return (
      <Row key={key} style={style}>
        <Col xs={11}>
          <CustomH6>{word}</CustomH6>
          <TextContainer>{meaning}</TextContainer>
        </Col>
        <CustomCol xs={1}>
          <Button
            color='danger'
            outline
            onClick={() => onRemoveCard && onRemoveCard({ id })}
          >
            <i class='fa-regular fa-trash-can'></i>
          </Button>
        </CustomCol>
      </Row>
    )
  }

  const handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      onRequestData && onRequestData()
    }
  }

  return (
    <CustomList
      width={(window.innerWidth)}
      height={300}
      rowCount={cards.length}
      rowHeight={60}
      rowRenderer={rowRenderer}
      onScroll={handleScroll}
    />
  )
}

export default CardList