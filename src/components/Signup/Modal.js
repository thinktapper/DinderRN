import React from 'react'
import { View, Text } from 'react-native'
import Form from './Form'

const Modal = ({ open, handleClose }) => {
  return (
    <View open={open} onClose={handleClose}>
      <Form handleClose={handleClose} />
    </View>
  )
}
export default Modal
