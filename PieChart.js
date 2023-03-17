import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native';
import PieCharthow from 'react-native-pie-chart';
import Entypo from 'react-native-vector-icons/Entypo'
export default class PieChart extends Component {
    render() {
        const widthAndHeight = 250
        const arr = [1, 2, 4, 5]
        const series = arr
        const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800']

        return (

            <View style={styles.container}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }} >

                    <PieCharthow
                        widthAndHeight={widthAndHeight}
                        series={series}
                        sliceColor={sliceColor}
                        doughnut={true}
                        coverRadius={0.45}
                        coverFill={'#FFF'}
                    />
                    <View style={{ display: "flex", paddingVertical: 65, paddingHorizontal: 15 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: "center" }}>
                            <Entypo name='dot-single' size={23} color='#00008B' />
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#00008B' }}>{'24%'}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: "center" }}>
                            <Entypo name='dot-single' size={23} color='#FF0000' />
                            <Text style={{ fontSize: 17, color: '#FF0000', fontWeight: 'bold' }}>{'30%'}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: "center" }}>
                            <Entypo name='dot-single' size={23} color='#228b22' />
                            <Text style={{ fontSize: 17, color: "#228b22", fontWeight: 'bold' }}>{'55%'}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: "center" }}>
                            <Entypo name='dot-single' size={23} color='#228b22' />
                            <Text style={{ fontSize: 17, color: "#228b22", fontWeight: 'bold' }}>{'70%'}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: "center" }}>
                            <Entypo name='dot-single' size={23} color='#228b22' />
                            <Text style={{ fontSize: 17, color: "#228b22", fontWeight: 'bold' }}>{'70%'}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: "center" }}>
                            <Entypo name='dot-single' size={23} color='#228b22' />
                            <Text style={{ fontSize: 17, color: "#228b22", fontWeight: 'bold' }}>{'37%'}</Text>
                        </View>

                    </View>
                </View>

                <View style={{ display: "flex", paddingVertical: 65, paddingHorizontal: 15 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: "center" }}>
                            <Entypo name='dot-single' size={23} color='#00008B' />
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#00008B' }}>{'24%'}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: "center" }}>
                            <Entypo name='dot-single' size={23} color='#FF0000' />
                            <Text style={{ fontSize: 17, color: '#FF0000', fontWeight: 'bold' }}>{'30%'}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: "center" }}>
                            <Entypo name='dot-single' size={23} color='#228b22' />
                            <Text style={{ fontSize: 17, color: "#228b22", fontWeight: 'bold' }}>{'55%'}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: "center" }}>
                            <Entypo name='dot-single' size={23} color='#228b22' />
                            <Text style={{ fontSize: 17, color: "#228b22", fontWeight: 'bold' }}>{'70%'}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, aalignItems: "center" }}>
                            <Entypo name='dot-single' size={23} color='#228b22' />
                            <Text style={{ fontSize: 17, color: "#228b22", fontWeight: 'bold' }}>{'70%'}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: "center" }}>
                            
                            <Text style={{ fontSize: 17, color: "#228b22", fontWeight: 'bold' }}>{'37%'}</Text>
                            <Text style={{ fontSize: 17, color: "#228b22", fontWeight: 'bold' }}>{'37%'}</Text>
                        </View>

                    </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('screen').height,
        // alignItems: 'center',
        paddingTop: 100,
        backgroundColor: 'white',

        paddingHorizontal: 10

    },
    title: {
        fontSize: 24,
        margin: 10
    }
});