import React, { Component } from 'react';
import {
    StyleSheet,
    View
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
    H2
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
            phoneAuth: 'Access pending'
        };
    }

    // fetchAllContacts  = (event) =>{
    async fetchAllContacts(){
        console.log('bbbb');
        chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        other = chars;

        // results = {};
        denied = false;
        for (i = 0; i < 26; i++) {
            filter = chars[i]
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
                                AsyncStorage.setItem(contact.recordID, person);
                            } catch (error) {
                                // Error saving data
                            }
                        }
                    }

                }
            })
        }
        // console.log('iterative...11');
        // for (recordID in results) {
        //     // check if the property/key is defined in the object itself, not in parent
        //     if (results.hasOwnProperty(recordID)) {
        //         console.log(recordID, results[recordID]);
        //     }
        // }

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
                            this.setState({
                                phoneAuth: 'Access granted'
                            });
                        }
                        if(permission === 'denied'){
                            this.setState({
                                phoneAuth: 'Access denied'
                            });
                        }
                    }
                })
            }
            if(permission === 'authorized'){
                this.fetchAllContacts();
                this.setState({
                    phoneAuth: 'Access granted'
                });
            }
            if(permission === 'denied'){
                this.setState({
                    phoneAuth: 'Access denied'
                });
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
    }
});