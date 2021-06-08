import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, LayoutAnimation} from 'react-native';
import {MAIN_COLOUR} from '../../../../system/constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BalooRegular} from '../../../../../assets/styles';

export const MeetupType = (props) => {

    const [expanded, setExpanded] = React.useState(false);

    const changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
      }

    const renderCategories = () => {
        return props.categories.map((item) => {
            return (
                <TouchableOpacity
                    key={item.code}
                    onPress={() => {
                        props.selectCategory(item.id)
                    }}
                >
                    <View style={styles.categoryDefault}>
                        <View style={{flex: 1}}>
                            <Text style={styles.categoryText}>{item.type}</Text>
                        </View>
                        {props.category == item.id ? <Icon name='check' style={styles.selectedIcon} /> : <></>}
                    </View>
                </TouchableOpacity>
            )
        })
    }

    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    changeLayout()
                }}
            >
                <View style={styles.container}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.text}>
                            Type of meetup
                        </Text>
                    </View>
                    <Icon name={expanded ? "arrow-alt-circle-up" : "arrow-alt-circle-down"} style={styles.icon}/>
                </View>
            </TouchableOpacity>
            <View style={{ height: expanded ? null : 0, overflow: 'hidden' }}>
                {renderCategories()}
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: MAIN_COLOUR, alignItems: 'center', justifyContent: 'center',
        padding: 8,
        borderRadius: 8,
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        fontFamily: BalooRegular,
        fontSize: 18
    },
    icon: {
        color: 'white',
        fontSize: 18
    },
    categoryDefault: {
        paddingVertical: 4, paddingHorizontal: 8, borderWidth: 1, borderRadius: 8, borderColor: MAIN_COLOUR, marginTop: 4, flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    categorySelected: {
        padding: 8, borderWidth: 1, borderRadius: 8, borderColor: MAIN_COLOUR, backgroundColor: MAIN_COLOUR, marginTop: 4,
    },
    categoryText: {
        fontFamily: BalooRegular,
        fontSize: 16,
        color: MAIN_COLOUR
    },
    selectedIcon: {
        fontSize: 16,
        color: MAIN_COLOUR
    }
});
