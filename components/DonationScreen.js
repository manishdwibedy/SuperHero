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
    Form,
    Item,
    Text,
    Input,
    Label,
    H2
} from 'native-base';
import { NavigationActions } from 'react-navigation';

export default class DonationScreen extends Component<{}> {
    checkContactStatus(){

    }

    do(){
        console.log('doing...');
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

                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input />
                        </Item>
                    </Form>

                    <Button block success onPress={ this.do } style={styles.button}>
                        <Text>Submit</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        margin: 15
    }
});