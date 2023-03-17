import React, { useEffect, useState } from 'react'
import { TouchableOpacity, FlatList, Text, View, Alert } from 'react-native'
import auth from '@react-native-firebase/auth';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import firestore from '@react-native-firebase/firestore';
import Entypo from 'react-native-vector-icons/Entypo'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const ReportNavigation = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name='AllReport' component={AllReport} />
            <Stack.Screen name='ReportScreen' component={ReportsScreen} />
        </Stack.Navigator>
    )
}

const AllReport = ({navigation}) => {
    return (
        <TouchableOpacity onPress={()=>{navigation.navigate('ReportScreen')}}>
            <View style={{ flexDirection: "row", gap: 7, alignItems: 'center', padding: 20, backgroundColor: 'mediumseagreen', borderRadius: 10, justifyContent: 'space-around', elevation: 4, marginTop: 15 }}>
                <View style={{ padding: 10, borderRadius: 10 }}>
                    <Entypo name='text-document' size={23} color='black' />
                </View>
                <Text style={{ fontSize: 22, color: 'black', marginLeft: 12 }}>June</Text>
                

            </View>
        </TouchableOpacity>
    )
}

const ReportsScreen = ({ navigation }) => {


    const [data, setdata] = useState();
    const [updated, setUpdated] = useState(false);


    const delRecord = async () => {
        await firestore().collection('records').get()
            .then(dat => {
                dat.forEach((snapshot) => {
                    if (auth().currentUser.email == snapshot.data().email) {

                        console.log('hy')
                        console.log(snapshot.id)
                        console.log('setted')
                        firestore()
                            .collection('records')
                            .doc(snapshot.id)
                            .delete()
                            .then(() => {
                                Alert.alert('Report is deleted!');
                                console.log('Report deleted!');
                                setUpdated(!updated)

                            });
                    }
                })
            })

    }

    useEffect(() => {
        const getRecord = async () => {
            console.log(auth().currentUser.email);
            const newdata = [];
            await firestore()
                .collection('records')
                .get()
                .then(querySnapshot => {
                    console.log('Total users: ', querySnapshot.size);

                    querySnapshot.forEach(documentSnapshot => {
                        const { number, day, month, year, total, entertainment, grocery, shopping, userId } = documentSnapshot.data()
                        console.log('xxxxxxxxxxxxxxxxxxxxxxxx')
                        console.log(auth().currentUser.email)
                        if (auth().currentUser.email == documentSnapshot.data().email) {
                            console.log(auth().currentUser.email)
                            newdata.push({
                                number,
                                day,
                                month,
                                year,
                                total,
                                entertainment,
                                grocery,
                                shopping
                            })
                        }
                    });
                    setdata(newdata)
                });
        }

        getRecord()

    }, [updated])
    return (
        <View style={{ flex: 1, backgroundColor: 'mediumseagreen' }}>
            <View style={{ backgroundColor: 'white', marginTop: 20, padding: 10 }}>
                <Text style={{ color: 'mediumseagreen', fontWeight: 'bold', fontSize: 18 }}>     Yours previously generated report is:
                </Text>
            </View>
            <View style={{ marginTop: 80 }}>
                <View>
                    <View style={{ flexDirection: 'row', width: '90%', height: 400, backgroundColor: 'white', marginBottom: 20, marginLeft: 20, margin: 10, paddingLeft: 40, paddingRight: 5, borderRadius: 50 }}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) =>
                                <View style={{ marginTop: 70, marginRight: 15 }}>
                                    <Text style={{ fontSize: 20, color: 'mediumseagreen' }}>In your report no:<Text style={{ color: 'black' }}>{item.number}</Text> generated on <Text style={{ color: 'black' }}>{item.day}/{item.month}/{item.year}</Text>,    It is observed that your have spent Total: <Text style={{ color: 'black' }}>{item.total}</Text>       .......................................... ...........................................   On Entertainment:  <Text style={{ color: 'black' }}>{item.entertainment}</Text>                On Grocery:             <Text style={{ color: 'black' }}>{item.grocery} </Text>                    On Shopping:          <Text style={{ color: 'black' }}>{item.shopping}</Text>      ............................................   ...........................................</Text>
                                </View>

                            } />
                        <TouchableOpacity >
                            <View style={{ backgroundColor: 'mediumseagreen', borderRadius: 100, marginTop: 15, marginLeft: -50, marginRight: 30, paddingLeft: 6, paddingRight: 6 }}>
                                <Material onPress={delRecord} name='delete' color="white" size={23} />

                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>


    );


}

export default ReportNavigation