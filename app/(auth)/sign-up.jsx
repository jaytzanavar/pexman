import React, { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import { images } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true);

    try {
      const res = await createUser(form.email, form.password, form.username);
      setUser(res)
      setIsLogged(true)
      // set it to global state using context
      router.replace('/home')

    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
      setForm({
        username: '',
        email: '',
        password: ''
      })
    }

  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={10} >
        <ScrollView>

          <View className="w-full justify-center h-full px-4 my-4 min-h-[80vh] ">
            <Image source={images.logoP} resizeMode="contain" className="w-[115px] h-[35px]" />
            <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign up to PExMan</Text>
            <FormField formName={"Username"} value={form.username} handleChangeText={(e) => setForm({ ...form, username: e })} otherStyles="mt-10" />
            <FormField formName={"Email"} value={form.email} handleChangeText={(e) => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="email-address" />
            <FormField formName={"Password"} value={form.password} handleChangeText={(e) => setForm({ ...form, password: e })} otherStyles="mt-7" keyboardType="password" />
            <CustomButton isLoading={isSubmitting} title="Sign Up" handlePress={submit} containerStyles={"mt-7"} />
            <View className='justify-center pt-5 flex-row'>
              <Text className='text-lg text-gray-100 font-pregular'>
                Have an accound already ?
              </Text>
              <Link href="/sign-in" className='text-lg font-psemibold text-secondary ml-2'>Sign In</Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUp