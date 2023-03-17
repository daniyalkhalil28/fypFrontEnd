import React, {useEffect, useState } from 'react'
import { StyleSheet, Modal, TouchableOpacity, Image, Text, View, Alert} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'


function HomeScreen({ navigation, route }) {

    const [remainderData, setRemainderData] = useState({electricity:'', gas:'', internet:''})
    useEffect(()=>{
        firestore().collection('users').get().then((snapshot)=>{
            let abc = false
            const date = new Date()
            snapshot.forEach((doc)=>{
                const {electricity, gas, internet, userId} = doc.data();
                if(userId === auth().currentUser.uid){
                    if(electricity === false && date.getDate() > 15){
                        setRemainderData({electricity:true});
                        
                    }
                    if(gas === false && date.getDate() > 15){
                        setRemainderData({gas:true})
                    }
                    if(internet === false && date.getDate() > 15){
                        setRemainderData({internet:true})
                    }
                }
            })
        }).catch((err)=>{
            console.log(err);
        })
    }, [])

    return (
        <View style={{ backgroundColor: 'mediumseagreen', flex: 1 }}>
            <View>
                <View style={{ backgroundColor: 'white', width: 200, height: 200, borderRadius: 140, position: 'absolute', top: -80, right: -100 }}></View>
            </View>
            <View style={{ marginLeft: 15, marginTop: 100 }}>
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Hi {auth().currentUser.displayName},</Text>
            </View>
            <View style={{ marginLeft: 40, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Scan')} style={{ marginTop: 30 }}>
                    <View style={{ borderRadius: 30, width: 125, height: 130, backgroundColor: 'white', alignItems: 'center', justifyContent: "center" }}>
                        <Image style={{ width: 60, height: 60 }} source={require('./2.png')} />
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: 'mediumseagreen', fontWeight: 'bold', fontSize: 15 }}>Scan Receipts</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ marginLeft: 30 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('GenReport')} style={{ marginTop: 32 }}>
                        <View style={{ borderRadius: 30, width: 125, height: 130, backgroundColor: 'white', alignItems: 'center', justifyContent: "center" }}>
                            <Image style={{ marginTop: 18, marginLeft: 10, width: 88, height: 79 }} source={require('./44.png')} />
                            <View style={{ marginTop: 10, marginBottom: 30 }}>
                                <Text style={{ color: 'mediumseagreen', fontWeight: 'bold', fontSize: 15 }}>Calculate Trend</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={{ marginLeft: 40, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('PlanBudget')} style={{ marginTop: 30 }}>
                    <View style={{ borderRadius: 30, width: 125, height: 130, backgroundColor: 'white', alignItems: 'center', justifyContent: "center" }}>
                        <Image style={{ marginTop: 10, width: 100, height: 90 }} source={require('./6.jpg')} />
                        <View style={{ marginTop: 5, marginBottom: 15 }}>
                            <Text style={{ color: 'mediumseagreen', fontWeight: 'bold', fontSize: 15 }}>Budget Planner</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ marginLeft: 30 }}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('recommendationBudet')}} style={{ marginTop: 32 }}>
                        <View style={{ borderRadius: 30, width: 125, height: 130, backgroundColor: 'white', alignItems: 'center', justifyContent: "center" }}>
                            <Image style={{ marginTop: 18, width: 80, height: 90 }} source={require('./5.png')} />
                            <View style={{ marginTop: 2, marginBottom: 24 }}>
                                <Text style={{ color: 'mediumseagreen', fontWeight: 'bold', fontSize: 12 }}>Budget Recommendation</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{  marginLeft: 40, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('BillRem')} style={{ marginTop: 30 }}>
                <View style={{ borderRadius: 30, width: 125, height: 130, backgroundColor: 'white', alignItems: 'center', justifyContent: "center" }}>
                            <Image style={{marginLeft:1, width: 100, height: 85 }} source={require('./remin0.jpg')} />
                            <View style={{ marginTop: 10, marginBottom: 2 }}>
                                <Text style={{ color: 'mediumseagreen', fontWeight: 'bold', fontSize: 15 }}>Bill Reminders</Text>
                            </View>
                        </View>
                </TouchableOpacity>
                <View style={{ marginLeft: 30 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ReportsScreen')} style={{ marginTop: 32 }}>
                    <View style={{ borderRadius: 30, width: 125, height: 130, backgroundColor: 'white', alignItems: 'center', justifyContent: "center" }}>
                        <Image style={{ marginTop: 20, width: 80, height: 90 }} source={require('./4.png')} />
                        <View style={{ marginTop: 10, marginBottom: 28 }}>
                            <Text style={{ color: 'mediumseagreen', fontWeight: 'bold', fontSize: 15 }}>Previous Record</Text>
                        </View>
                    </View>                        

                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

function AboutScreen({ navigation }) {
    return (
        <View style={{ backgroundColor: 'mediumseagreen', flex: 1 }}>
            <View style={{ borderRadius: 15,backgroundColor: 'white', padding: 10, marginTop: 10, marginLeft: 10, marginRight: 15, alignItems: 'center', justifyContent: 'center' }}>
                <View>
                    <Text style={{ color: 'mediumseagreen' }}>
                    In a struggling economy, yet with a plenty of spending temptations, personal financial management is considerably a much-needed technique everyone needs. Yet, organizing finances can be complex at times given when keeping the record of (bills, invoices, and receipts). The movement of money becomes important only when it is going in but tends to be forgotten when it is going out as people underestimate the amount of cash that they spend on purchasing unplanned and off-budget items despite the presence of a mental budget. In a series of field experiments administered at convenience stores, the result highlighted the impact of discount stores on consumer behavior when every merchandise appears to be a good deal that makes consumers purchase more items. Most consumers fall prey to this marketing ploy despite the absence of a long-term benefit of frugality, as the spending temptation and the satisfaction it delivers are hard to resist. A potential solution to overcome this kind of financial dilemma is by providing feedback on spending behavior with info on cumulative spending like in a budgeting application.
                    </Text>
                </View>
            </View>
            <View>
                <View style={{ marginTop: 150, backgroundColor: 'white', width: 200, height: 200, borderRadius: 140, position: 'absolute', top: -80, right: -100 }}></View>
            </View>
        </View>
    );
}



function ContactUsScreen({ navigation }) {
    return (
        <View style={{ backgroundColor: 'mediumseagreen', flex: 1 }}>
            <View style={{ backgroundColor: 'white', marginTop: 50, margin: 9, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'mediumseagreen', fontWeight: 'bold', fontSize: 30 }}>  Feel free to contact at:
                </Text>
            </View>
            <View style={{ marginTop: 70, marginLeft: 50, flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                    Address:
                </Text>
                <Text style={{marginTop: 5, marginLeft: 10, color: 'white', fontSize: 15 }}>
                    054 Main Street, Islamabad
                </Text>
            </View>
            <View style={{ marginTop: 30, marginLeft: 50, flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                    Email:
                </Text>
                <Text style={{ marginTop: 5, marginLeft: 49, color: 'white', fontSize: 15 }}>
                    money@gmail.com
                </Text>
            </View>
            <View style={{ marginTop: 30, marginLeft: 50, flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                    Mobile:
                </Text>
                <Text style={{ marginTop: 5, marginLeft: 55, color: 'white', fontSize: 15 }}>
                    03217054632
                </Text>
            </View>
            <View style={{ marginTop: 30, marginLeft: 50, flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                    Phone:
                </Text>
                <Text style={{ marginTop: 5, marginLeft: 65, color: 'white', fontSize: 15 }}>
                    054-720704
                </Text>
            </View>
            <View>
                <View style={{ marginTop: 208, backgroundColor: 'white', width: 200, height: 200, borderRadius: 140, position: 'absolute', top: -80, right: -100 }}></View>
            </View>
        </View>
    );
}
function ProfileScreen({ navigation }) {
    const [showPassword, setShowPassword] = useState(false)
    const [newPass, setNewPass] = useState('')
    const [modalVisible, setModalVisible] = useState(false);




    const handleSignOut = () => {
        auth().signOut().then(() => {

            navigation.navigate("Login");
        });

    }
    const handleChangePass = () => {
        setModalVisible(!modalVisible);
        auth().currentUser.updatePassword(newPass).then(() => {
            Alert.alert('Password Changed!');
        }).catch(error => {  
            if (error.code === 'auth/weak-password') {
                Alert.alert('Atleast 6-digit password should be typed');
            }
            console.log(error);
        })
    }
    return (
        <View style={{ backgroundColor: 'mediumseagreen', flex: 1 }}>
            <View style={{ borderRadius: 20,backgroundColor: 'white', padding: 10, paddingBottom: 50, marginTop: 100, marginLeft: 15, marginRight: 15 }}>
                <View style={{ marginTop: 40, marginLeft: 30, flexDirection: 'row' }}>
                    <Text style={{ color: 'lightgrey', fontWeight: 'bold', fontSize: 20 }}>
                        Name:
                    </Text>
                    <Text style={{ marginTop: 5, marginLeft: 80, color: 'mediumseagreen', fontSize: 15 }}>
                        {auth().currentUser.displayName}
                    </Text>
                </View>
                <View style={{ marginTop: 30, marginLeft: 30, flexDirection: 'row' }}>
                    <Text style={{ color: 'lightgrey', fontWeight: 'bold', fontSize: 20 }}>
                        Email:
                    </Text>
                    <Text style={{ marginTop: 5, marginLeft: 45, color: 'mediumseagreen', fontSize: 15 }}>
                        {auth().currentUser.email}
                    </Text>
                </View>


                <View>
                    <View style={{ marginTop: 320, backgroundColor: 'white', width: 200, height: 200, borderRadius: 140, position: 'absolute', top: -70, right: -120 }}>
                    </View>
                </View>
            </View>
            <View style={styles.centeredView}>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View>
                                <TextInput onChangeText={setNewPass} selectionColor='mediumseagreen' theme={{ colors: { placeholder: 'black', text: 'black', primary: 'mediumseagreen', } }} right={<TextInput.Icon onPress={() => setShowPassword(!showPassword)} name={showPassword === true ? 'eye-off' : 'eye'} color='grey' size={22} style={{ marginTop: 15 }} />} secureTextEntry={showPassword === true ? false : true} style={{ height: 50, margin: 13 }} label="Password" mode='outlined' />
                            </View>
                            <Button onPress={handleChangePass} style={{ margin: 13, padding: 5, backgroundColor: 'mediumseagreen' }} mode="contained" >
                                <Text style={{ color: "white" }}>Set New Password</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
                
                <View style={{ marginLeft: 72, marginRight: 72, marginTop: 20 }}>
                    <Button onPress={() => setModalVisible(true)} style={{ margin: 13, padding: 5, backgroundColor: 'white' }} mode="contained" >
                        <Text style={{ color: "mediumseagreen" }}>Change Password</Text>
                    </Button>
                </View>
            </View>
            <Button onPress={handleSignOut} icon="logout" color='pink' style={{ marginTop: -50, marginLeft: 85, marginRight: 85, margin: 13, padding: 5, backgroundColor: 'white' }} mode="contained" >
                <Text style={{ color: "mediumseagreen" }}>Logout</Text>
            </Button>

        </View>
    );
}






const Drawer = createDrawerNavigator();

const MainAppScreen = () => {
    
    return (
        <Drawer.Navigator screenOptions={{ drawerStyle: { width: 200 }, drawerActiveTintColor: "mediumseagreen" }}>
            <Drawer.Screen name='Money' component={HomeScreen} options={{
                title: "     Money",
                headerStyle: {
                    backgroundColor: 'mediumseagreen',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    marginLeft: 60,
                    fontSize: 20,                    
                    fontWeight: 'bold',
                },
            }} />
            <Drawer.Screen name="My Profile" component={ProfileScreen} options={{
                title: 'My Profile',
                headerStyle: {
                    backgroundColor: 'mediumseagreen',
                },
                headerTintColor: 'white',
            }} />
            <Drawer.Screen name="About" component={AboutScreen} options={{
                title: 'About',
                headerStyle: {
                    backgroundColor: 'mediumseagreen',
                },
                headerTintColor: 'white',
            }} />
            <Drawer.Screen name="Contact Us" component={ContactUsScreen} options={{
                title: 'Contact Us',
                headerStyle: {
                    backgroundColor: 'mediumseagreen',
                },
                headerTintColor: 'white',
            }} />

        </Drawer.Navigator>
    );
}
const styles = StyleSheet.create({
    centeredView: {


        marginBottom: 80
    },
    modalView: {
        margin: 20,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 148,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        paddingTop: 60,
        paddingBottom: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        color: 'green',
        marginBottom: 15,
        textAlign: "center"
    }
});

export default MainAppScreen