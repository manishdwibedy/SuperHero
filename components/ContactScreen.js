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
    checkContactStatus(){

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

                    <Button block light style={styles.contactAccess}>

                        <Text>Access granted</Text>
                        <Icon name='ios-checkmark' />
                    </Button>

                    <View style={ styles.hr}/>

                    <H2 style={styles.headers}>Google Contacts</H2>

                    <Button block light style={styles.contactAccess}>

                        <Text>Access granted</Text>
                        <Icon name='ios-checkmark' />
                    </Button>

                    <View style={ styles.hr}/>

                    <H2 style={styles.headers}>Facebook Contacts</H2>

                    <Button block light style={styles.contactAccess}>

                        <Text>Access granted</Text>
                        <Icon name='ios-close' />
                    </Button>
                </Content>


            </Container>
        );
    }
}

const styles = StyleSheet.create({
    contactAccess:{
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