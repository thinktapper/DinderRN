import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Form, Item, Input, Label, Text, Button, Modal } from 'native-base'

const EditFeastModal = ({ visible, selectedFeast, onSave, onClose }) => {
  const [freshFeast, setFreshFeast] = useState(selectedFeast)

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input
                value={freshFeast.name}
                onChangeText={(text) =>
                  setFreshFeast({ ...freshFeast, name: text })
                }
              />
            </Item>
            <Item stackedLabel>
              <Label>Image</Label>
              <Input
                value={freshFeast.image}
                onChangeText={(text) =>
                  setFreshFeast({ ...freshFeast, image: text })
                }
              />
            </Item>
          </Form>
          <Button
            primary
            style={styles.saveButton}
            onPress={() => {
              onSave(freshFeast)
              onClose()
            }}>
            <Text>Save Changes</Text>
          </Button>
          <Button danger style={styles.cancelButton} onPress={onClose}>
            <Text>Cancel</Text>
          </Button>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    padding: 16,
  },
  saveButton: {
    marginTop: 16,
  },
  cancelButton: {
    marginTop: 8,
  },
})

export default EditFeastModal
