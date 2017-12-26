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
    TouchableOpacity
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
                    <Title>Super Hero</Title>
                    </Body>
                </Header>
            </Container>
        );
    }

}

const styles = StyleSheet.create({

});
