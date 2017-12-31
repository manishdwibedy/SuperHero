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

export default class DonationScreen extends Component<{}> {
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
                        <Title>Donate</Title>
                    </Body>
                    <Right>

                    </Right>


                </Header>


            </Container>
        );
    }
}

const styles = StyleSheet.create({

});