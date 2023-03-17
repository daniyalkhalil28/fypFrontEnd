import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Image, FlatList, Text, View, Alert, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ActionButton from 'react-native-action-button';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage'



const ScanScreen = ({ navigation }) => {


    const [updated, setUpdated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([])

    useEffect(() => {
        var numbercount = 1;
        const fetchImages = async () => {
            setLoading(true)
            const imgList = [];
            try {

                await firestore()
                    .collection('Images')
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            const { userId, month, image } = doc.data();
                            if (auth().currentUser.uid == userId) {
                                imgList.push({
                                    userId: userId,
                                    imgID: doc.id,
                                    month: month,
                                    image: image,
                                    count: numbercount
                                })
                                setList(imgList)
                                numbercount++
                            }

                        })

                        numbercount = 0;
                        setLoading(false)
                    })
            } catch (error) {
                console.log(error)
            }
        }


        fetchImages();



    }, [updated])


    const pickFromCamera = async () => {
        await ImagePicker.openCamera({
            width: 1250,
            height: 2200,
            cropping: true
        }).then((image) => {
            const imgUri = Platform.OS === 'ios' ? image.source : image.path
            uploadImage(imgUri)
        })
    }

    const pickFromGallery = async () => {
        await ImagePicker.openPicker({
            multiple: true,
            width: 1200,
            height: 1200,

        }).then((image) => {
            image.map((img) => {
                const imgUri = Platform.OS === 'ios' ? img.source : img.path
                console.log(imgUri)
                uploadImage(imgUri)
            })

        })
    }
    const uploadImage = async (imaeUri) => {


        let filename = imaeUri.substring(imaeUri.lastIndexOf('/') + 1)

        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.')

        filename = name + Date.now() + '.' + extension

        const StorageRef = storage().ref(`pictures/${filename}`)

        const task = StorageRef.putFile(imaeUri)

        try {
            await task

            const url = await StorageRef.getDownloadURL()

            storeData(url)

        } catch (error) {


            return null
        }

    }
    const storeData = (url) => {

        firestore()
            .collection('Images')
            .add({
                userId: auth().currentUser.uid,
                month: 'Dec',
                image: url
            })
            .then(() => {
                console.log('added to favourites')
                Alert.alert('Recored Added')
                setUpdated(!updated)
            })
    }

    const deleteData = (doc_id, Img) => {
        const storageRef = storage().refFromURL(Img)
        const imgRef = storage().ref(storageRef.fullPath)

        imgRef.delete().then(() => {

            firestore()
                .collection('Images')
                .doc(doc_id)
                .delete()
                .then(() => {
                    Alert.alert('Image is deleted!');
                    setUpdated(!updated)
                }).catch((err) => {
                    console.log(err)
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }






    return (

        <View style={{ backgroundColor: "lightgray", flex: 1 }}>
            {/* <Text style={{alignItems:'center'}}>Total No of Images {}</Text> */}
            <View>
                {loading ? <ActivityIndicator /> : <FlatList

                    data={list}
                    renderItem={({ item }) => {
                        return (


                            <View style={{ marginTop: 30 }}>
                                <View style={{ position: "relative", top: 30, left: 280, zIndex: 10000 }}>
                                    <View style={{ backgroundColor: 'mediumseagreen', borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 4, marginLeft: -225, marginRight: 335, paddingTop: 6.5, paddingLeft: 225, paddingRight: -90 }}>
                                        <TouchableOpacity >

                                            <Material onPress={() => { deleteData(item.imgID, item.image) }} name='delete' color="white" size={23} />


                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Image style={{ borderRadius: 20, width: 250, height: 380 }} source={{ uri: item.image }} />
                                    <Text style={{ color: 'mediumseagreen', fontSize: 20 }}> 0{item.count} </Text>
                                </View>
                            </View>



                        );
                    }}

                />}
            </View>
            <ActionButton size={70} spacing={20} offsetY={2} buttonColor="mediumseagreen">
                <ActionButton.Item buttonColor='white' title="Take Image" onPress={pickFromCamera}>
                    <IonIcon name="camera-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='white' title="Choose Image" onPress={pickFromGallery}>
                    <IonIcon name="md-images-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );
}

export default ScanScreen


const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'black',
    },
});

