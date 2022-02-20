import React from 'react';
import {Button,Image,View,Platform} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default class PickImage extends React.Component {
    state = {
        image: null,
        
    }

    render() {
        var image = this.state.image;
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center', 
                alignItems: 'center',
            }}>
                <Button title="Pick an image from camera roll" onPress={this._pickImage} />
            </View>
            )
    }
    componentDidMount() {
        this.getPermissionsAsync();

    }
    getPermissionsAsync = async () => {
        if (Platform.OS === 'ios') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert("Sorry, we need camera roll permissions to make this work!");
            }
            
        }
    }

    uploadImage = async(uri) => {
        const data = new FormData();
        let filename = uri.split("/")[uri.split("/").length - 1];
        let type = `imsge/${uri.split(".")[uri.split(".").length - 1]}`;
        const fileToUpload = {
            uri : uri,
            name : filename,
            type : type
        }
        data.append('digit',fileToUpload);
        fetch("https://69a2-2405-201-5007-508b-6dab-4-3c49-986e.ngrok.io/predict-digit",{
            method: "POST",
            body: data,
            headers : {"contnet-type" : "multipart/form-data"}
        })
        .then(response => response.json())
        .then(result =>{
            console.log(result);
        }
        )
        .catch(error => {
            console.log(error);
        })
    }

    _pickImage = async () => {
        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality : 1
            })

            if(!result.cancelled){
                this.setState({image: result.data});
                this.uploadImage(result.uri);
            }
            }
            catch(e){
                console.log(e);
            }
        }
    }
