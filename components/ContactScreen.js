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
    Text
} from 'native-base';
import { NavigationActions } from 'react-navigation'
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


                <Button block light style={styles.contactAccess}>

                    <Text>Access to contacts</Text>
                    <Icon name='ios-checkmark' />
                </Button>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    contactAccess:{
        margin: 10
    }
});