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
    List
} from 'native-base';
import { NavigationActions } from 'react-navigation';
var Contacts = require('react-native-contacts')
import { LargeList } from "react-native-largelist";
//import Perf from 'react-addons-perf'; // ES6
import {OptimizedFlatList} from 'react-native-optimized-flatlist'

// import 'expo';

const listItemHeight = 48;

const listData =  [
    {"id":"210fa414-ed54-4836-98ac-b136828f1be2","firstName":"Alicea","lastName":"Skea", "firstName":"Alicea","lastName":"Skea"},
    {"id":"5ccf0ca3-720b-4a18-8eac-43cb2543565a","firstName":"Rubin","lastName":"Dulson","firstName":"Alicea","lastName":"Skea"},
    {"id":"e7f20eb2-4c30-4266-afba-7287fd2240e9","firstName":"Delaney","lastName":"Fishbie","firstName":"Alicea","lastName":"Skea"},
    {"id":"a9154238-5fc3-4982-a2cc-8208ed76e337","firstName":"Crichton","lastName":"Piggott","firstName":"Alicea","lastName":"Skea"},
    {"id":"19f60df5-b821-4f14-a951-aef3a9d2ee33","firstName":"Tibold","lastName":"Zannuto"},
    {"id":"f4181354-516f-4219-9bae-38245a1376f4","firstName":"Darleen","lastName":"Innott"},
    {"id":"d8a62f7d-5c8e-4c62-994e-cca2392426b6","firstName":"Eleonora","lastName":"Hancill"},
    {"id":"e0ea432b-ef54-4f7e-b8f7-3517d261ccaa","firstName":"Clarissa","lastName":"Trimble"},
    {"id":"132fdd4e-0e6c-4709-adf5-3f80f7ebc83a","firstName":"Daphne","lastName":"Biggans"},
    ];

class ListItem extends React.PureComponent {
    render() {
        return (

                <Text style={{ flex: 1 }}>
                    {this.props.firstName} {this.props.lastName}
                </Text>

        );
    }
}


export default class ContactScreen extends Component<{}> {
    color;
    minCellHeight = 24;
    maxCellHeight = 48;
    minSectionHeight = 48;
    maxSectionHeight = 96;
    refreshing = false;
    largeList: LargeList;

    handleItemPress = (id) => {
        this.setState({
            checkedLookup: {
                ...this.state.checkedLookup,
                [id]: !this.state.checkedLookup[id],
            },
        });
    }

    constructor(props) {
        super(props);
        this.fetchAllContacts = this.fetchAllContacts.bind(this);
        this.checkContactStatus = this.checkContactStatus.bind(this);
        this.renderItem = this.renderItem.bind(this);

        console.log(listData);
        this.aa = this;
        this.state = {
            d: listData,
            checkedLookup: {},
            contactAccess: 'pending',
            contacts: [],
            refreshing: false
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
                                    if (contactList.length < 20) {
                                        contact = JSON.parse(contact);
                                        contact['id'] = String(i);
                                        contactList.push(contact);
                                    }

                                });
                        }

                    });

                    this.setState({
                        contacts: contactList
                    });
                    console.log('should reload...');
                    console.log(this.state.contacts);
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

                    <OptimizedFlatList
                        data={this.state.d}
                        extraData={this.state.checkedLookup}
                        getItemLayout={this.getItemLayout}
                        renderItem={this.renderItem1}
                        keyExtractor={x => x.id}
                    />

                    <FlatList
                        data={this.state.contacts}
                        getItemLayout={this.getItemLayout}
                        renderItem={this.renderItem1}
                        keyExtractor={x => x.id}
                    />

                    <LargeList
                        style={{ flex: 1 }}
                        numberOfSections ={() => 1}
                        numberOfRowsInSection={() => this.state.contacts.length}
                        heightForCell={() => 88}
                        onRefresh={()=>{
                            this.setState({refreshing:true});
                            setTimeout(()=>this.setState({refreshing:false}),2000);
                        }}
                        refreshing={this.state.refreshing}
                        renderCell={this.renderItem.bind(this)}
                    />
                </Content>


            </Container>
        );
    }

    getItemLayout = (data, index) => {
        return {
            length: listItemHeight,
            offset: index*listItemHeight,
            index,
        };
    }

    renderItem1 = (rowData) => {
        return (
            <ListItem
                id={rowData.item.id}
                firstName={rowData.item.firstName}
                lastName={rowData.item.lastName}
                onTouch={this.handleItemPress}
            />
        );
    }

    renderItem(section: number, row: number) {
        console.log('render row...');
        let contact = this.state.contacts[row];
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                    <Icon name='home' />

                    <View style={{marginLeft:4}}>
                        <Text style={{ fontSize: 18 }}>
                            {contact.firstName}
                        </Text>
                        <contact style={{ fontSize: 14, marginTop: 8 }}>
                            {contact.lastName}
                        </contact>
                    </View>
                </View>
                {row < contact.length - 1 &&
                <View style={{ backgroundColor: "#EEE", height: 1, marginLeft:16 }} />}
            </View>
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