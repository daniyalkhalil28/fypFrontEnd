import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather'
import Ant from 'react-native-vector-icons/AntDesign'
import { Button } from 'react-native-paper';
const BillRem = () => {
    const [toggleCheckBox1, setToggleCheckBox1] = useState(false)
    const [toggleCheckBox2, setToggleCheckBox2] = useState(false)
    const [toggleCheckBox3, setToggleCheckBox3] = useState(false)

    return (
        <View style={{ padding: 30, backgroundColor:'white', height:Dimensions.get('screen').height }}>
            <View style={{ flexDirection: "row", gap: 7, alignItems: 'center', padding: 20, backgroundColor: 'mediumseagreen', borderRadius: 10, justifyContent:'space-around', elevation:4, marginTop:15 }}>
                <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 10 }}>
                    <Entypo name='flash' size={23} color='black' />
                </View>
                <Text style={{ fontSize: 22, color: 'black', marginLeft: 12 }}>Electrucity</Text>
                <CheckBox onCheckColor='gray'
                
                    disabled={false}
                    value={toggleCheckBox1}
                    onValueChange={(newValue) => setToggleCheckBox1(newValue)}
                />

            </View>

            <View style={{ flexDirection: "row", gap: 7, alignItems: 'center', padding: 20, backgroundColor: 'mediumseagreen', borderRadius: 10, justifyContent:'space-around', elevation:4, marginTop:15 }}>
                <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 10 }}>
                    <Material name='gas-cylinder' size={23} color='black' />
                </View>
                <Text style={{ fontSize: 22, color: 'black', marginLeft: 12 }}>Electrucity</Text>
                <CheckBox
                tintColors={{ true: 'white', false: 'white' }}
                    disabled={false}
                    value={toggleCheckBox2}
                    onValueChange={(newValue) => setToggleCheckBox2(newValue)}
                />

            </View>

            <View style={{ flexDirection: "row", gap: 7, alignItems: 'center', padding: 20, backgroundColor: 'mediumseagreen', borderRadius: 10, justifyContent:'space-around', elevation:4, marginTop:15 }}>
                <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 10 }}>
                    <Feather name='globe' size={23} color='black' />
                </View>
                <Text style={{ fontSize: 22, color: 'black', marginLeft: 12 }}>Electrucity</Text>
                <CheckBox
                
                    disabled={false}
                    value={toggleCheckBox3}
                    onValueChange={(newValue) => setToggleCheckBox3(newValue)}
                />

            </View>
            
            <View style={{alignItems:'center', marginTop:40, }}>
            <Ant name='pluscircleo' size={40} color='black'  />
            </View>
        </View>
    )
}


export default BillRem