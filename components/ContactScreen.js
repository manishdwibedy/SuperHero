import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    AsyncStorage,
    FlatList
} from 'react-native';
import { Container,
    Content,
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Footer,
    FooterTab,
    TouchableOpacity,
    Card,
    CardItem,
    Text,
    H2,
    SwipeRow,
    List,
    ListItem
} from 'native-base';
import { NavigationActions } from 'react-navigation';
var Contacts = require('react-native-contacts')

// import 'expo';

export default class ContactScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.fetchAllContacts = this.fetchAllContacts.bind(this);
        this.checkContactStatus = this.checkContactStatus.bind(this);

        this.aa = this;
        this.state = {
            contactAccess: 'pending',
            contacts: []
        };


        AsyncStorage.setItem('contactAccess', 'granted');
        AsyncStorage.getItem('contactAccess').then( status => {
            this.setState({
                contactAccess: status
            });

            if (status == 'granted'){
                AsyncStorage.getAllKeys().then( recordIDList => {
                    // console.log(recordIDList);

                    i = 0;
                    contactList = [];
                    recordIDList.forEach( key => {
                        if (key.slice(0,8) == "CONTACT:"){
                            recordID = key;


                            AsyncStorage.getItem(recordID)
                                .then( contact => {
                                    i += 1
                                    if (contactList.length < 50) {
                                        contact = JSON.parse(contact);
                                        contact['key'] = i;
                                        contactList.push(contact);
                                    }

                                });
                        }

                    });

                    this.setState({
                        contacts: contactList
                    });
                    console.log('should reload...')
                    console.log(contactList);
                });
            }
        });


        console.log(this.state.contactAccess);


    }

    // fetchAllContacts  = (event) =>{
    async fetchAllContacts(){
        console.log('bbbb');
        chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        other = chars;

        // results = {};
        denied = false;
        for (i = 0; i < 26; i++) {
            filter = chars[i];

            if (this.state.contactAccess == 'granted'){
                break;
            }
            console.log('getting contacts');
            Contacts.getContactsMatchingString(filter, (err, contacts) => {
                if(err === 'denied'){
                    denied = true;
                } else {
                    for(i=0; i<contacts.length;i++){
                        contact = contacts[i];

                        if (contact.phoneNumbers && contact.phoneNumbers.length > 0){
                            var person = {
                                firstName:contact.givenName,
                                lastName:contact.familyName,
                                hasThumbnail: contact.hasThumbnail,
                                company: contact.company,
                                phoneNumbers: contact.phoneNumbers,

                            };
                            // results[String(contact.recordID)] = person;
                            //console.log(person);
                            try {
                                AsyncStorage.setItem("CONTACT:"+contact.recordID, JSON.stringify(person));
                            } catch (error) {
                                // Error saving data
                            }
                        }
                    }

                }
            })
        }

        console.log('got the contacts...');

    };

    checkContactStatus(){
        Contacts.checkPermission( (err, permission) => {
            // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
            if(permission === 'undefined'){
                Contacts.requestPermission( (err, permission) => {
                    if (err){
                        // this.component.setState({
                        //     phoneAuth: 'Error occurred'
                        // });
                    }
                    else{
                        if(permission === 'authorized'){
                            this.fetchAllContacts();
                            console.log('105');
                            this.setState({
                                contactAccess: 'granted'
                            });
                            AsyncStorage.setItem('contactAccess', 'granted');
                        }
                        if(permission === 'denied'){
                            this.setState({
                                contactAccess: 'denied'
                            });
                        }
                    }
                })
            }
            if(permission === 'authorized'){
                console.log('119');
                this.fetchAllContacts();
                this.setState({
                    contactAccess: 'granted'
                });
                AsyncStorage.setItem('contactAccess', 'granted');
            }
            if(permission === 'denied'){
                this.setState({
                    contactAccess: 'denied'
                });
                AsyncStorage.setItem('contactAccess', 'denied');
            }
        })
    }

    render() {

        const { navigate } = this.props.navigation;
        const backAction = NavigationActions.back({
            key: 'HomeScreen'
        });

        return (
            <Container>

                <Header>
                    <Left>
                        <Button transparent onPress={ () => navigate('Home')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Add Friends</Title>
                    </Body>
                    <Right>

                    </Right>


                </Header>

                <Content>
                    <H2 style={styles.headers}>Phone Contacts</H2>

                    <Button block danger style={styles.contactAccess} onPress={this.checkContactStatus}>
                        <Text>
                            {this.state.phoneAuth}
                        </Text>
                        <Icon name='ios-checkmark' />
                    </Button>

                    <View style={ styles.hr}/>

                    <H2 style={styles.headers}>Google Contacts</H2>

                    <Button block danger style={styles.googleAccess}>

                        <Text>Access granted</Text>
                        <Icon name='ios-checkmark' />
                    </Button>

                    <View style={ styles.hr}/>

                    <H2 style={styles.headers}>Facebook Contacts</H2>

                    <Button block danger style={styles.facebookAccess}>

                        <Text>Access granted</Text>
                        <Icon name='ios-close' />
                    </Button>

                    <FlatList
                        data={
                            this.state.contacts
                        }
                        renderItem={({item}) => <Text>{item.firstName} {item.lastName}</Text>}
                    />
                </Content>


            </Container>
        );
    }
}

const styles = StyleSheet.create({
    approved:{
        backgroundColor: 'blue'
    },
    contactAccess:{
        margin: 10,
    },
    googleAccess:{
        margin: 10
    },
    facebookAccess:{
        margin: 10
    },
    headers:{
        margin: 10
    },
    hr:{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        margin: 20
    },
    contact:{
        margin: 5
    }
});