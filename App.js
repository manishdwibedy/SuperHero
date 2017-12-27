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
import Video from 'react-native-video';
import { width, height, totalSize } from 'react-native-dimension';


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

                <Video source={require('./abc.mp4')}   // Can be a URL or a local file.
                       ref={(ref) => {
                           this.player = ref
                       }}                                      // Store reference
                       rate={1.0}                              // 0 is paused, 1 is normal.
                       volume={1.0}                            // 0 is muted, 1 is normal.
                       muted={false}                           // Mutes the audio entirely.
                       paused={false}                          // Pauses playback entirely.
                       resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                       repeat={true}                           // Repeat forever.
                       playInBackground={false}                // Audio continues to play when app entering background.
                       playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                       ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                       progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                       style={styles.backgroundVideo} />

                <Button info full rounded style={styles.info}>
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
    backgroundVideo: {
        margin: 20,
        width: width(90),
        height: width(90)
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
