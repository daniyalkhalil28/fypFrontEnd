import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Materialcomm from 'react-native-vector-icons/MaterialCommunityIcons'
import Slider from '@react-native-community/slider';
const BudgetRecomendation = () => {
    const [value, setValue] = useState(0)
    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', }}>Select Goal</Text>

            <FlatList
                data={[{ icon: 'motorbike', name: 'Bike' }, { icon: 'car-side', name: 'Car' }, { icon: 'greenhouse', name: 'House' }, { icon: 'alpha-o-box-outline', name: 'others' }]}
                renderItem={({ item }) => (<View style={{ backgroundColor: 'white', margin: 10, paddingHorizontal: 10, display: 'flex', alignItems: 'center', borderRadius: 20 }}>
                    <Materialcomm name={item.icon} size={83} color='black' />
                    <Text style={{ fontSize: 17 }} >{item.name}</Text>
                </View>)}
                horizontal
            />
            <Slider
                style={{ width: Dimensions.get('screen').width - 40, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                onValueChange={(val)=>{setValue(val)}}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor='black'
            />
            <Text style={{color:'black'}}>{value < 0.2 ? 'Low Budget' : value > 0.8 ? 'High Budget' : 'Medium Budget'}</Text>
        </View>
    )
}

export default BudgetRecomendation