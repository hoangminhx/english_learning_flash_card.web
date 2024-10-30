import { CustomInput } from '../../common/styled/bootstraps.styled'

const FFCustomInputAdapter = ({ input, meta, ...rest }) => {
  return <CustomInput {...input} invalid={meta.error && meta.touched} {...rest} />
}

export default FFCustomInputAdapter