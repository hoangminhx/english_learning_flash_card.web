import { Input } from 'reactstrap'

const FFCustomInputAdapter = ({ input, meta, ...rest }) => {
  return <Input {...input} invalid={meta.error && meta.touched} {...rest} />
}

export default FFCustomInputAdapter