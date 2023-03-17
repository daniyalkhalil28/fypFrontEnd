import React, {useState } from 'react'
import { Text, View, ScrollView, Alert } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import PieChart from './PieChart';





const GenReportScreen = ({ navigation }) => {        
    const [no, setNo] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [total, setTotal] = useState('');
    const [entertainment, setEntertainment] = useState('');
    const [grocery, setGrocery] = useState('');
    const [shopping, setShopping] = useState('');    
    
    
        return (            
            <PieChart/>
            
        );
    }
    
export default GenReportScreen

    
