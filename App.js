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
                <Button success full rounded style={styles.donate}>
                    <Icon name="ios-happy-outline" />
                    <Text> Donate </Text>
                </Button>

            </Container>
        );
    }

}

const styles = StyleSheet.create({
    donate: {
        margin: 10,
        bottom: 10,
        left: 10,
        right: 10,
        position: 'absolute',

    },
});
