import { CardBody, CardText, CardTitle, Card as RSCard } from 'reactstrap'
import styled from 'styled-components'

const CustomRSCard = styled(RSCard)`
  margin: 0px 50px 20px 50px;
  box-shadow: 0px 0px 0px rgba(3, 7, 18, 0.10),
  0px 1px 1px rgba(3, 7, 18, 0.08),
  1px 1px 1px rgba(3, 7, 18, 0.06),
  1px 3px 3px rgba(3, 7, 18, 0.04),
  2px 4px 4px rgba(3, 7, 18, 0.02);
  min-height: 300px;
`

const Card = ({ card: { word, meaning } = {}, meaningVisible }) => {
  return (
    <CustomRSCard
      color='primary'
      inverse
    >
      <CardBody>
        <CardTitle tag={'h4'} className='text-center'>{word}</CardTitle>
        <CardText>
          {meaningVisible ? <div>{meaning}</div> : null}
        </CardText>
      </CardBody>
    </CustomRSCard>
  )
}

export default Card