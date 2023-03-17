import React, {useState } from 'react'
import { Text, View, ScrollView, Alert } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';





const BudPlanScreen = ({ navigation }) => {        
    const [no, setNo] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [total, setTotal] = useState('');
    const [entertainment, setEntertainment] = useState('');
    const [grocery, setGrocery] = useState('');
    const [shopping, setShopping] = useState('');    
    
    

    
        const addData = async () => {
            if (no != '' && day != '' && month != '' && year != '' && total != '' && entertainment != '' && grocery != ''&& shopping != '') {
       
                //deleting
                Alert.alert('It takes a while!');  
                await firestore().collection('records').get()
                    .then(dat => {
                        dat.forEach((snapshot) => {
                            if (auth().currentUser.email == snapshot.data().email) {                                     
                                firestore()
                                    .collection('records')
                                    .doc(snapshot.id)
                                    .delete()
                                    .then(() => {
                                                                            
                                    });
                            }
                        })
                    })
                //adding    
                firestore()
                    .collection('records')
                    .add({
                        email: auth().currentUser.email,
                        number: no,
                        day: day,
                        month: month,
                        year: year,
                        total: total,
                        entertainment, entertainment,
                        grocery: grocery,
                        shopping, shopping
                    })
                    .then(() => {
                        Alert.alert('Report generated!');
                        console.log('Record Added');    
                    })
                    .catch((err) => {
                        console.log(err)
                    })

                    
                        navigation.navigate('mainScreen');
                    
            }
    
            else {
                Alert.alert('Empty Field');
            }
        }
        return (

            <ScrollView>
            <View style={{ backgroundColor: 'mediumseagreen', marginTop: 20, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}>  Fill following credentials of form:
                </Text>
            </View>
            <View style={{ marginTop: 70 }}>
                <View style={{ marginLeft: 23, flexDirection: 'row' }}>
                    <TextInput onChangeText={setDay} selectionColor='mediumseagreen' theme={{ colors: { placeholder: 'black', text: 'black', primary: 'mediumseagreen', } }} style={{ width: 100, height: 50, margin: 1 }} label="Day" mode='outlined' />
                    <View style={{ marginLeft: 4 }}>
                        <TextInput onChangeText={setMonth} selectionColor='mediumseagreen' theme={{ colors: { placeholder: 'black', text: 'black', primary: 'mediumseagreen', } }} style={{ width: 100, height: 50, margin: 1 }} label="Month" mode='outlined' />
                    </View>
                    <View style={{ marginLeft: 4 }}>
                        <TextInput onChangeText={setYear} selectionColor='mediumseagreen' theme={{ colors: { placeholder: 'black', text: 'black', primary: 'mediumseagreen', } }} style={{ width: 100, height: 50, margin: 1 }} label="Year" mode='outlined' />
                    </View>
                </View>
            
                <View style={{ marginTop: 35 }}>
                    <View style={{ marginLeft: 23, flexDirection: 'row' }}>
                        <TextInput onChangeText={setNo} selectionColor='mediumseagreen' theme={{ colors: { placeholder: 'black', text: 'black', primary: 'mediumseagreen', } }} style={{ width: 153, height: 50, margin: 1 }} label="Report No" mode='outlined' />
                        <View style={{ marginLeft: 4 }}>
                            <TextInput onChangeText={setTotal} selectionColor='mediumseagreen' theme={{ colors: { placeholder: 'black', text: 'black', primary: 'mediumseagreen', } }} style={{ width: 153, height: 50, margin: 1 }} label="Total Spent" mode='outlined' />
                        </View>
                    </View>
                </View>
                <View style={{ margin: 11, marginBottom: 10, marginTop: 25 }}>
                    <TextInput onChangeText={setEntertainment} selectionColor='mediumseagreen' theme={{ colors: { placeholder: 'black', text: 'black', primary: 'mediumseagreen', } }} style={{ height: 50, margin: 13 }} label="Money Spent on Entertainment" mode='outlined' />
                </View>
            
                <View style={{ margin: 11, marginTop: -30 }}>
                    <TextInput onChangeText={setGrocery} selectionColor='mediumseagreen' theme={{ colors: { placeholder: 'black', text: 'black', primary: 'mediumseagreen', } }} style={{ height: 50, margin: 13 }} label="Money Spent on Grocery" mode='outlined' />
                </View>

                <View style={{ margin: 11, marginTop: -30 }}>
                    <TextInput onChangeText={setShopping} selectionColor='mediumseagreen' theme={{ colors: { placeholder: 'black', text: 'black', primary: 'mediumseagreen', } }} style={{ height: 50, margin: 13 }} label="Money Spent on Shopping" mode='outlined' />
                </View>
            
                <View style={{ marginLeft: 50, marginRight: 50, marginTop: 60 }}>
                    <Button onPress={addData} style={{ margin: 13, padding: 5, backgroundColor: 'mediumseagreen' }} mode="contained" >
                        Generate Report
                    </Button>
                </View>
            </View>
            </ScrollView>
        );
    }
    
export default BudPlanScreen

    
