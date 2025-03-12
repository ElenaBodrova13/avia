import React from 'react'
import { Flex, Progress } from 'antd'

function Progres({ persent }) {
  return (
    <Flex gap="small" vertical>
      <Progress percent={persent} showInfo={false} />
    </Flex>
  )
}
export default Progres
