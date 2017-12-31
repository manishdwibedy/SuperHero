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
import VideoPlayer from 'react-native-video-controls';
import { width } from 'react-native-dimension';


export default class HomeScreen extends Component<{}> {

    constructor(props) {
        super(props);
        this.controls = VideoPlayer;
        this.navigate = this.props.navigation;

    }

    openContacts(){
        console.log('contacts');
        //this.props.navigation.navigate("Contacts")
        // this.props.navigate('Contacts');
        // navigate('Contacts')
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
                        source={require('../assets/videos/abc.mp4')}
                        navigator={ this.props.navigator }
                        onEnd={ this.onEnd }
                        disableBack={ true }
                        disableFullscreen={ true }
                        style={{height:'88%'}}
                        ref={ controls => this.controls = controls }
                    />
                </View>



                <Button info full rounded style={styles.info} onPress={ this.openContacts }>
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
