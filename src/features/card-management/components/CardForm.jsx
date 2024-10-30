import { Form as FForm, Field } from 'react-final-form'
import { Button, Form, FormGroup } from 'reactstrap'

import FFCustomInputAdapter from '../../extensions/final-form/FFCustomInputAdapter'

const CardForm = ({ onCardSubmit }) => {
  return (
    <FForm
      onSubmit={onCardSubmit}
      initialValues={{ word: 'a', meaning: 'b' }}
      render={({ handleSubmit, submitting, pristine }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Field
                name='word'
                placeholder='Enter word or phrase'
                component={FFCustomInputAdapter}
              />
            </FormGroup>
            <FormGroup>
              <Field
                name='meaning'
                placeholder='Enter meaning'
                component={FFCustomInputAdapter}
              />
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