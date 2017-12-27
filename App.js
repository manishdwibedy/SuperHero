/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet
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


export default class App extends Component<{}> {
    constructor(props) {
        super(props);
    }



    render()
    {

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Super Hero!!!</Title>
                    </Body>
                </Header>

                <Button success full rounded style={styles.info}>
                    <Icon name="ios-information-circle-outline" />
                    <Text> View Details </Text>
                </Button>

                <Button success full rounded iconRight="10" style={styles.friends}>
                    <Icon name="ios-contacts" />
                    <Text> Add Friends </Text>
                </Button>
                <Button success full rounded style={styles.donate}>
                    <Icon name="ios-happy-outline" />
                    <Text> Donate </Text>
                </Button>

            </Container>
        );
    }

}

const styles = StyleSheet.create({
    info: {
        margin: 10,
        bottom: 130,
        left: 10,
        right: 10,
        position: 'absolute',

    },
    friends: {
        margin: 10,
        bottom: 70,
        left: 10,
        right: 10,
        position: 'absolute',

    },
    donate: {
        margin: 10,
        bottom: 10,
        left: 10,
        right: 10,
        position: 'absolute',

    },
});
