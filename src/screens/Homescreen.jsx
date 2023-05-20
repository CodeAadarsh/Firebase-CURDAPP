import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, SIZES} from '../components/Components';
import database from '@react-native-firebase/database';
import {profileIMGX, resX, userX} from './authentication/Loginscreen';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const Homescreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  useEffect(() => {
    // Fetch data from Firebase Realtime Database
    const dataRef = database().ref(`/users/${resX}`);
    dataRef.on('value', snapshot => {
      const dataSnapshot = snapshot.val();
      const newData = dataSnapshot ? Object.values(dataSnapshot) : [];
      setData(newData);
    });

    return () => {
      // Unsubscribe from Firebase Realtime Database updates
      dataRef.off();
    };
  }, []);

  const googleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      console.log('signOut');
      navigation.replace('Loginscreen');
    } catch (error) {
      console.error(error);
    }
  };

  const writeDATA = () => {
    var createdBy = userX;
    const createdAt = new Date().toISOString();
    const UpdatedAt = new Date().toISOString();
    if (!title) {
      console.log('empty');
      return;
    }

    const id = Date.now().toString();
    const newData = {
      id,
      title,
      message,
      createdBy,
      createdAt,
      UpdatedAt,
      completed: false,
    };

    const existingItemIndex = data.findIndex(
      item => item.id === selectedItemId,
    );

    if (selectedItemId && existingItemIndex !== -1) {
      // Update existing item
      const updatedData = [...data];
      updatedData[existingItemIndex] = newData;

      database()
        .ref(`/users/${resX}/${selectedItemId}`)
        .set(newData)
        .then(() => {
          console.log('Data updated.');
          setData(updatedData);
          setTitle('');
          setMessage('');
          setSelectedItemId(null);
        })
        .catch(error => {
          console.log('Error updating data:', error);
        });
    } else {
      // Create new item
      database()
        .ref(`/users/${resX}/${id}`)
        .set(newData)
        .then(() => {
          console.log('Data set.');
          setData([...data, newData]);
          setTitle('');
          setMessage('');
        })
        .catch(error => {
          console.log('Error setting data:', error);
        });
    }
  };
  // selectedItemId changes update input
  useEffect(() => {
    if (selectedItemId) {
      const selectedItem = data.find(item => item.id === selectedItemId);
      setTitle(selectedItem.title);
      setMessage(selectedItem.message);
    } else {
      setTitle('');
      setMessage('');
    }
  }, [selectedItemId]);
  const toggleCompleted = (itemId, currentCompletedStatus) => {
    const dataRef = database().ref(`/users/${resX}/${itemId}`);

    // Update the `completed` field to its opposite value
    const updatedCompletedStatus = !currentCompletedStatus;

    dataRef
      .update({completed: updatedCompletedStatus})
      .then(() => {
        console.log('Completed status updated.');
        // Update the `completed` field in the local data state
        const updatedData = data.map(item =>
          item.id === itemId
            ? {...item, completed: updatedCompletedStatus}
            : item,
        );
        setData(updatedData);
      })
      .catch(error => {
        console.log('Error updating completed status:', error);
      });
  };

  const renderItem = ({item}) => (
    <View
      style={{
        padding: 10,
        borderWidth: 1,
        backgroundColor: COLORS.SECONDORY,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View>
        <Text style={{fontSize: 16}}>{item.title}</Text>
        <Text style={{fontSize: 14}}>{item.message}</Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => setSelectedItemId(item.id)}>
          <Text style={{color: 'blue'}}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteData(item.id)}>
          <Text style={{color: 'red'}}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleCompleted(item.id, item.completed)}>
          <Text style={{color: item.completed ? 'green' : 'orange'}}>
            {item.completed ? 'Completed' : 'Mark as Completed'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const deleteData = itemId => {
    const dataRef = database().ref(`/users/${resX}/${itemId}`);
    dataRef.remove().then(() => {
      console.log('Data deleted.');
      const updatedData = data.filter(item => item.id !== itemId);
      setData(updatedData);
    });
  };
  return (
    <View style={styles.BackgroundSplash}>
      <View style={styles.header}>
        <View>
          <Text
            style={{
              // flex: 1,
              fontSize: 40,
              color: COLORS.SECONDORY,
              fontWeight: 'bold',
              left: 10,
            }}>
            FirebaseApp
          </Text>
          <Text
            style={{
              // flex: 1,
              fontSize: 20,
              color: COLORS.SECONDORY,
              fontWeight: 'bold',
              left: 10,
            }}>
            Welcome {userX}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <Image
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#fff',
              borderRadius: 50 / 2,
              right: 10,
            }}
            source={{uri: `${profileIMGX}`}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0,
          width: '95%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            top: 20,
            flexDirection: 'row',
            width: SIZES.width,
            borderWidth: 0,
            justifyContent: 'space-between',
          }}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            style={styles.TextInput}
          />
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Description"
            multiline
            style={styles.TextInput}
          />
        </View>
        <TouchableOpacity
          onPress={writeDATA}
          style={{
            height: 50,
            borderWidth: 0,
            elevation: 5,
            padding: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 200,
            width: 380,
            backgroundColor: COLORS.SECONDORY,
            top: 30,
          }}>
          {/* <Image style={{width:50,}} source={require('../assets/images/gpic.png')}/> */}
          <Text
            style={{fontSize: 20, color: COLORS.PRIMARY, fontWeight: '700'}}>
            Add / Update
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{borderWidth: 0, top: 50, height: 500}}>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.SECONDORY,
            fontWeight: '500',
            left: 10,
          }}>
          Task:
        </Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.PRIMARY} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            width: SIZES.width * 0.85,
            height: SIZES.height * 0.05,
            backgroundColor: '#00FF99',
            alignSelf: 'center',
            top: 230,
            opacity: 0.9,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{fontWeight: '700', fontSize: 20, color: COLORS.SECONDORY}}>
            Are you sure ?
          </Text>
        </View>
        <View
          style={{
            width: SIZES.width * 0.85,
            height: SIZES.height * 0.2,
            elevation: 5,
            backgroundColor: '#ff0066',
            opacity: 0.9,
            alignSelf: 'center',
            top: 230,
            borderBottomEndRadius: 20,
            borderBottomLeftRadius: 20,
            justifyContent: 'space-evenly',
            alignItems: 'flex-end',
            flexDirection:'row'
          }}>
          <TouchableOpacity
          style={{ justifyContent: 'center',
          alignItems: 'center', width: '48%',
          height: 50,
          bottom:5,
          backgroundColor: COLORS.ACCENT,
          borderRadius: 10,}}
            onPress={googleSignOut}>
            <Text
              style={{
                fontWeight:'900',
                fontSize:20
               
              }}>LogOut</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{ justifyContent: 'center',
          backgroundColor: '#fff',

          alignItems: 'center', width: '48%',
          height: 50,
          bottom:5,
          
          borderRadius: 10,}}
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text
              style={{
                fontWeight:'900',
                fontSize:20
               
              }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  BackgroundSplash: {
    backgroundColor: COLORS.PRIMARY,
    height: SIZES.height,
    width: SIZES.width,
    // alignItems:'center',
    // justifyContent:'center'
  },
  header: {
    borderWidth: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextInput: {
    borderWidth: 2,
    width: SIZES.width * 0.48,
    borderRadius: 20,
    padding: 10,
    borderColor: COLORS.ACCENT,
    backgroundColor: COLORS.ACCENT,
    color: COLORS.SECONDORY,
  },
});
