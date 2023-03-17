import React, {useState} from 'react';
import {ScrollView,Image, Text, View, TouchableOpacity, Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainAppScreen from './mainScreen';
import auth from '@react-native-firebase/auth';
import ScanScreen from './ScanScreen';
import ReportsScreen from './Reports';
import GenReportScreen from './GenerateReport';
import BudPlanScreen from './BudgetPlanner';
import BillRem from './BillRem';
import firestore from '@react-native-firebase/firestore'
import ReportNavigation from './Reports';
import BudgetRecomendation from './components/BudgetRecomendation';

function StartScreen({ navigation }) {

  return(

    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>        
      <View style={{marginTop:50}}>
        <View style={{backgroundColor:'mediumseagreen', width:300 ,height:300, borderRadius:140, position:'absolute', top:-100, left:-100}}>          
        </View>
        <Image style={{borderRadius:150, width:280, height:280}}source={require('./1.jpg')}/> 
      </View>
      <View style={{marginTop:100}}>
        <Text style={{color:'grey', fontSize:25, fontWeight:'bold'}}>Your Money matters!</Text>
      </View>        
      <View style={{marginTop:100}}>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>    
        <View style={{borderRadius:10 ,paddingLeft:100, paddingRight:100, paddingTop:10, paddingBottom:10, backgroundColor:'mediumseagreen'}}>
          <Text style={{fontSize:18, alignItems:'center',margin:5, color:'white'}}>Get Started
          </Text> 
        </View>  
      </TouchableOpacity>                                  
      </View>
      <View style={{marginTop:10}}>
        <Text style={{color:'grey', fontSize:18}} onPress={()=>{navigation.navigate('Login')}}>Skip</Text>       
      </View> 
    </View>
  );
}

function SignUpScreen({ navigation }) {
  const [showPassword , setShowPassword] = useState(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const signUp=()=>{
    if(name!='' && email!='' && pass!=''){    

      auth().createUserWithEmailAndPassword(email, pass)
      .then((userCred) => {
        userCred.user.updateProfile({
          displayName:name
        })
        firestore().collection('users').add({
          name:name,
          userId:auth().currentUser.uid,
          email:email,
          electricity:false,
          gas:false,
          internet:false
        }).then(()=>{

          navigation.navigate('Login');
        }).catch((err)=>{
          console.log(err)
        })
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {  
          Alert.alert('That email address is already in use!');              
        }
        else if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');                
        }  
        else if (error.code === 'auth/weak-password') {
          Alert.alert('Atleast 6-digit password should be typed');                
        } 
        else{
          Alert.alert('Connection Promblem!');                          
        }         

      });
    }else{
      Alert.alert('Empty Field');       
    }
  }

  return(
    <ScrollView>
      <View style={{marginTop:55, padding:24}}>
        <View style={{backgroundColor:'mediumseagreen', width:200 ,height:200, borderRadius:140, position:'absolute', top:-100, right:-120}}></View>                  
        <View style={{marginTop:20, marginLeft:13}}>
          <Text style={{fontSize:25, fontWeight:'bold', color:'black'}}>Join to start</Text>
        </View>  
        <View style={{marginTop:90}}>
          <TextInput onChangeText={setName}  selectionColor='mediumseagreen' theme={{ colors: { placeholder: 'black', text: 'black', primary: 'mediumseagreen', } }}  style={{height:50, margin:13}} label="Name" mode='outlined' />    
          <TextInput onChangeText={setEmail}  selectionColor='mediumseagreen' theme={{ colors: { placeholder: 'black', text: 'black', primary: 'mediumseagreen', } }}  style={{height:50, margin:13}} label="Email" mode='outlined' />
          <TextInput onChangeText={setPass}  selectionColor='mediumseagreen' theme={{ colors: { placeholder: 'black', text: 'black', primary: 'mediumseagreen', } }} right={<TextInput.Icon onPress={()=>setShowPassword(!showPassword)} name={showPassword === true ? 'eye-off' : 'eye'} color='grey' size={22} style={{marginTop:15  }}/>} secureTextEntry={showPassword === true ? false : true} style={{height:50, margin:13}} label="Password" mode='outlined' />
        </View>
        <View style={{marginTop:90,marginLeft:25, marginRight:25}}>
          <TouchableOpacity onPress={signUp}>    
            <View style={{borderRadius:10,alignItems:'center', paddingTop:10, paddingBottom:10, backgroundColor:'mediumseagreen'}}>
              <Text style={{fontSize:18, alignItems:'center',margin:5, color:'white'}}>Sign up
              </Text> 
            </View>  
          </TouchableOpacity>                          
        </View>      
        <View style={{marginTop:10, alignItems:'center'}}>
          <Text style={{color:'grey'}}>Already have an account?
            <Text onPress={()=>{navigation.navigate('Login')}} style={{color:'mediumseagreen' ,fontWeight:'bold', fontSize:20}}> Login </Text>
          </Text>           
        </View>       
      </View> 
    </ScrollView>                   
  );
}

function LoginScreen({ navigation}){
  const [showPassword , setShowPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState(''); 
  const Login=()=>{
    if(email!='' && pass!=''){    
      auth().signInWithEmailAndPassword(email, pass)
      .then(() => {
      
        console.log()
        navigation.navigate('mainScreen', {updated:true})
      })
      .catch(error => {        
        if (error.code === 'auth/wrong-password') {  
          Alert.alert('The passwored is invalid!');              
        }

        else if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');                
        }        
        else if (error.code === 'auth/user-not-found') {
          Alert.alert('There is no such user found!');                
        }else{
          Alert.alert('Connection Promblem!');                          
        }     

      });
    }else{
      Alert.alert('Empty Field');      
    }
  }   
  return(
    <ScrollView>
      <View style={{marginTop:55, padding:24}}>
        <View style={{backgroundColor:'mediumseagreen', width:200 ,height:200, borderRadius:140, position:'absolute', top:-100, right:-120}}></View>            
        <View style={{marginTop:20, marginLeft:13}}>
          <Text style={{fontSize:25, fontWeight:'bold', color:'black'}}>Welcome</Text>
        </View> 

        <View style={{marginTop:100}}>

          <TextInput  onChangeText={setEmail} selectionColor='mediumseagreen' theme={{colors: {placeholder: 'black', text: 'black', primary: 'mediumseagreen', } }} style={{height:50, margin:13}} label="Email" mode='outlined' />
          <TextInput  onChangeText={setPass} selectionColor='mediumseagreen' theme={{ colors: { placeholder: 'black', text: 'black', primary: 'mediumseagreen', } }}  right={<TextInput.Icon onPress={()=>setShowPassword(!showPassword)} name={showPassword === true ? 'eye-off' : 'eye'} color='grey' size={22} style={{marginTop:15  }}/>} secureTextEntry={showPassword === true ? false : true} style={{height:50, margin:13}} label="Password" mode='outlined' />
        </View>
        <View style={{marginTop:30,marginLeft:25, marginRight:25}}>
          <TouchableOpacity onPress={Login}>    
            <View style={{borderRadius:10,alignItems:'center', paddingTop:10, paddingBottom:10, backgroundColor:'mediumseagreen'}}>
              <Text style={{fontSize:18, alignItems:'center',margin:5, color:'white'}}>Login
              </Text> 
            </View>  
          </TouchableOpacity>                          
        </View>      
        <View style={{marginTop:140, alignItems:'center'}}>
          <Text style={{color:'grey'}}>Don't have an account?
            <Text onPress={()=>{navigation.navigate('SignUp')}} style={{color:'mediumseagreen' ,fontWeight:'bold', fontSize:20}}> SignUp </Text>
          </Text>              
        </View>       
      </View> 
    </ScrollView>         
  );
}


const Stack = createNativeStackNavigator();  

function App() {

  return (        
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Start'}>
        <Stack.Screen name='Start' component={auth().currentUser ? MainAppScreen : StartScreen} options={{headerShown: false}}/>                
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>        
        <Stack.Screen name='SignUp' component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name='mainScreen' component={MainAppScreen} options={{headerShown: false}}/>                     
        <Stack.Screen name="Scan" component={ScanScreen} options={{
                title: "              Receipts",
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
        <Stack.Screen name="ReportsScreen" component={ReportNavigation} options={{
                headerShown: false,
                title: '',
            }} /> 
        <Stack.Screen name="GenReport" component={GenReportScreen} options={{
                
                title: "",
                headerStyle: {
                    backgroundColor: 'white',
                    
                },
                headerTransparent:true,
                headerTintColor: 'black',
                headerTitleStyle: {
                    marginLeft: 60,
                    fontSize: 20,
                    fontWeight: 'bold',
                },
            }} />   
            
        <Stack.Screen name="PlanBudget" component={BudPlanScreen} options={{
                headerShown: false,
                title: '',
            }} />  
        <Stack.Screen name="BillRem" component={BillRem} options={{
                headerShown: true,
                title: '',
            }} />   
<Stack.Screen name="recommendationBudet" component={BudgetRecomendation} options={{
                headerShown: true,
                title: '',
            }} />  
                                                                         

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;



// import { View, Text } from 'react-native'
// import React, {useEffect, useState } from 'react'

// const App = () => {
//   const [loading, setloading] = useState(false)
//   useEffect(() => {
//     getDashboardData();
//   }, []);
//   const getDashboardData = async () => {
//     try {
//         setloading(true)
//         const response = await fetch("http://192.168.18.77:5000/add",
//         {
//           // method:'POST'
//         });
      
//         console.log(response);        
//         setloading(false);
      
//     } catch (err) {      
//       console.log(err);
//     }
//   };
//     return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text onPress={getDashboardData}>{loading ? 'loading' :'App'}</Text>
//     </View>
//   )
// }

// export default App
// import { View, Text } from 'react-native'
// import React, {useEffect, useState } from 'react'
// const App = () => {
//   const [loading, setloading] = useState(false)
//   const handleSubmit = async () => {
//     try{
//       setloading(true)
//       const response = await fetch('http://localhost:5000/add', {
  

//     });
//      setloading(false)

//     console.log(response)
//   }
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text onPress={handleSubmit}>{loading ? 'loading' :'App'}</Text>
//     </View>
//   )
// }

// export default App