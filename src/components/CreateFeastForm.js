import React, { useState } from 'react'
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from 'react-native'
import { useMutation, useAsyncMutation } from '@tanstack/react-query'
import { useAuthContext } from '../context/AuthProvider'
import axios from 'axios'

function CreateFeastForm({ onFeastCreated }) {
  const { user } = useAuthContext()
  const [isLoading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    image: 'https://images.pexels.com/photos/1563256/pexels-photo-1563256.jpeg',
    startDate: new Date(),
    endDate: '2023-01-22T17:59:27.697Z',
    location: { lat: 36.1626638, long: -86.7816016 },
    radius: 5,
  })

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleCreateFeast = async () => {
    try {
      const result = await createFeast.mutateAsync({ formData, user })
      console.warn('result:', result)
    } catch (err) {
      console.error(err)
    }
  }

  const createFeast = useMutation(({ formData, user }) => {
    setLoading(true)
    try {
      return axios('http:localhost:3000/api/feast', {
        method: 'POST',
        data: { ...formData },
        headers: {
          // prettier-ignore
          'authorization': `Bearer ${user?.token}`,
        },
      }).then((response) => {
        // console.warn('response:', { ...response })
        onFeastCreated(response.data)
        return response.data
      })
      // const json = response.json()
      // console.warn('response:', response.status, response.data)
      // onFeastCreated(response)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  })

  return (
    <View>
      {createFeast.isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TextInput
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          <TextInput
            placeholder="Image"
            value={formData.image}
            onChangeText={(text) => handleChange('image', text)}
          />
          <TextInput
            placeholder="Start Date"
            value={formData.startDate}
            onChangeText={(text) => handleChange('startDate', text)}
          />
          <TextInput
            placeholder="End Date"
            value={formData.endDate}
            onChangeText={(text) => handleChange('endDate', text)}
          />
          <TextInput
            placeholder="Location"
            value={formData.location}
            onChangeText={(value) => handleChange('location', value)}
          />
          <TextInput
            placeholder="Radius"
            value={formData.radius}
            onChangeText={(int) => handleChange('radius', int)}
          />
          <TouchableOpacity onPress={() => handleCreateFeast()}>
            <Text>Create Feast</Text>
          </TouchableOpacity>
          {createFeast.status === 'loading' && <Text>Loading...</Text>}
          {createFeast.status === 'error' && <Text>Error...</Text>}
        </>
      )}
    </View>
  )
}

export default CreateFeastForm
