import React from 'react';
import { Link, Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton.jsx';

import { images } from '../constants';

export default function App() {
    return (
        // <View className="flex-1 items-center justify-center bg-white">
        //     {/* style={styles.container} */}
        //     <Text className='text-3xl font-pblack'>Personal Expences Manger!</Text>
        //     <StatusBar style="auto" />
        //     <Link href='/home' style={{ color: 'blue' }}>Go to Home</Link>
        // </View>
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: '100%;' }}>
                <View className='w-full justify-center items-center min-h-[55vh] px-4'>
                    <Image source={images.logoP}
                        className="w-[130px] h-[84px]" resizeMode='contain' />

                    <Image source={images.cards}
                        className="max-w-[380px] w-full h-[300px]" resizeMode='contain' />

                </View>
                <View className='relative mt-5'>
                    <Text className='text-3xl text-white font-bold text-center'>Your Personal Expences Manager <Text className="text-secondary-200">Pexman</Text></Text>
                    <Image source={images.path} className='w-[136px] h-[15px] absolute -bottom-4 right-10' resizeMode='contain' />

                </View>
                <View className='px-5'>
                    <CustomButton title="Continue with Email" handlePress={() => { router.push('sign-in') }} containerStyles="w-full mt-7" />
                </View>

            </ScrollView>
            <StatusBar backgroundColor='#161622' style='light' />

        </SafeAreaView>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });
