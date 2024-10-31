import { CardBody, CardText, CardTitle, Card as RSCard } from 'reactstrap'

const Card = ({ card: { word, meaning } = {}, meaningVisible }) => {
  return (
    <RSCard>
      <CardBody>
        <CardTitle tag={'h5'}>{word}</CardTitle>
        <CardText>
          {meaningVisible ? <div>{meaning}</div> : null}
        </CardText>
      </CardBody>
    </RSCard>
  )
}

export default Card