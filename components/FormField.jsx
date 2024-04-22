import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ({ formName, value,
  handleChangeText,
  otherStyles,
  placeholder = formName, ...props }) => {

  const [showPwd, setShowPwd] = useState(false)

  return (
    <View className={` ${otherStyles} space-y-2`}>
      <Text className='text-base text-gray-100 font-pmedium'>{formName}</Text>
      <View className='border-2 border-black-200 flex-row  w-full h-16 px-4 bg-black-100 rouded-2xl focus:border-secondary items-center'>
        <TextInput className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={formName === 'Password' && !showPwd} />
        {formName === 'Password' && (
          <TouchableOpacity  onPress={() => setShowPwd(!showPwd)}>
            <Image className='w-8 h-8' resizeMode='contain' source={!showPwd ? icons.eye : icons.eyeHide} />
          </TouchableOpacity>)}
      </View>


    </View>
  )
}

export default FormField