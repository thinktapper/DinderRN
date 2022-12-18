import React from 'react'
import { VStack, Box, Divider } from 'native-base'

export default function ({ feastName, createdAt, cardContents }) {
  return (
    <Box border="1" borderRadius="md">
      <VStack space="4" divider={<Divider />}>
        <Box px="4" pt="4">
          {feastName}
        </Box>
        <Box px="4">{createdAt.toLocaleString()}</Box>
        <Box px="4" pb="4">
          {cardContents}
        </Box>
      </VStack>
    </Box>
  )
}
