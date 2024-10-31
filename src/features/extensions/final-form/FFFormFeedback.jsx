import { FormFeedback } from 'reactstrap'
import { Field } from 'react-final-form'
import styled, { css } from 'styled-components'

const Feedback = styled(FormFeedback)`
  display: block;
  ${p => p.tooltip && css`
    opacity: 1;
    left: 0;
    transition: opacity ease 200ms;
    &:hover{ opacity: 0; }
  `}
`

const subscription = { touched: true, error: true, submitError: true }
const FFFormFeedback = ({ name }) => {
  return (
    <Field
      name={name}
      subscription={subscription}
      render={({ meta: { touched, error, submitError } }) =>
        touched && (error || submitError) ?
          <Feedback children={error || submitError} /> : null
      }
    />
  )
}
export default FFFormFeedback