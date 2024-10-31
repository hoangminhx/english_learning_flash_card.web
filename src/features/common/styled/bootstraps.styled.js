import { Container, Row } from 'reactstrap'
import styled from 'styled-components'

export const CustomContainer = styled(Container)`
  height: 80vh;
  min-height: 620px;
  overflow: auto;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 1px 1px rgba(3, 7, 18, 0.02),
              2px 4px 4px rgba(3, 7, 18, 0.03),
              4px 9px 9px rgba(3, 7, 18, 0.05),
              6px 15px 15px rgba(3, 7, 18, 0.06),
              10px 24px 24px rgba(3, 7, 18, 0.08);
  padding: 30px;
`

export const CustomRow = styled(Row)`
  height: 80px;
`