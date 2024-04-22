import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import { images } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { signIn } from '../../lib/appwrite';

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all the fields')
        }

        setIsSubmitting(true);

        try {
            const result = await signIn(form.email, form.password)
            setUser(res)
            setIsLogged(true)
            router.replace('/home')

        } catch (error) {
            throw new Error(error.message)
        } finally {
            setIsSubmitting(false)

        }
    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
                <ScrollView>

                    <View className="w-full justify-center h-full px-4 my-4 min-h-[80vh] ">
                        <Image source={images.logoP} resizeMode="contain" className="w-[115px] h-[35px]" />
                        <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log into PExMan</Text>
                        <FormField formName={"Email"} value={form.email} handleChangeText={(e) => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="email-address" />
                        <FormField formName={"Password"} value={form.password} handleChangeText={(e) => setForm({ ...form, password: e })} otherStyles="mt-7" keyboardType="password" />
                        <CustomButton isLoading={isSubmitting} title="Sign In" handlePress={submit} containerStyles={"mt-7"} />
                        <View className='justify-center pt-5 flex-row'>
                            <Text className='text-lg text-gray-100 font-pregular'>
                                Don't Have an Account ?
                            </Text>
                            <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sign up</Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignIn