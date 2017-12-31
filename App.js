/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import { width, height, totalSize } from 'react-native-dimension';
import Modal from 'react-native-modal'

// import 'expo'

export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.controls = VideoPlayer;

    }

    onEnd() {

        //console.log(this.refs.player);
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

                <View style={styles.VideoWrapper}>
                    <VideoPlayer
                        source={require('./assets/videos/abc.mp4')}
                        navigator={ this.props.navigator }
                        onEnd={ this.onEnd }
                        disableBack={ true }
                        disableFullscreen={ true }
                        style={{height:'88%'}}
                        ref={ controls => this.controls = controls }
                    />
                </View>



                <Button info full rounded style={styles.info} onPress={() => this.props.navigation.navigate("Chat")}>
                    <Icon name="ios-information-circle-outline" />
                    <Text> View Details </Text>
                </Button>

                <Button light full rounded iconRight="10" style={styles.friends}>
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
    video:{
        height: 200
    },
    VideoWrapper: {
        margin: 20,
        width: width(90),
        height: width(90),
    },
    info: {
        margin: 10,
        bottom: 180,
        left: 10,
        right: 10,
        height: 60,
        position: 'absolute',

    },
    friends: {
        margin: 10,
        bottom: 100,
        left: 10,
        right: 10,
        height: 60,
        position: 'absolute',

    },
    donate: {
        margin: 10,
        bottom: 20,
        left: 10,
        right: 10,
        height: 60,
        position: 'absolute',

    },
});
