import { Form as FForm, Field } from 'react-final-form'
import { Button, Form, FormGroup } from 'reactstrap'

import FFCustomInputAdapter from '../../extensions/final-form/FFCustomInputAdapter'
import FFFormFeedback from '../../extensions/final-form/FFFormFeedback'

const CardForm = ({ onCardSubmit }) => {
  const required = value => (value ? undefined : 'Required')
  return (
    <FForm
      onSubmit={onCardSubmit}
      render={({ handleSubmit, submitting }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Field
                name='word'
                placeholder='Enter word or phrase'
                component={FFCustomInputAdapter}
                validate={required}
              />
              <FFFormFeedback name='word' />

            </FormGroup>
            <FormGroup>
              <Field
                name='meaning'
                placeholder='Enter meaning'
                component={FFCustomInputAdapter}
                validate={required}
              />
              <FFFormFeedback name='meaning' />
            </FormGroup>
            <Button color='primary' block type='submit' disabled={submitting}>
              {'Add Flash Card'}
            </Button>
          </Form>
        )
      }}
    />
  )
}

export default CardForm