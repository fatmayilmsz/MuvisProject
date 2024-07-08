import { StyleSheet } from "react-native";
import { Color } from "../../utilities/Color";

export const styles = StyleSheet.create({
    slide: {
        backgroundColor: Color.BackgroundColor,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        height: 200,
        margin: 10,
        overflow: 'hidden',
      },
      image: {
        width: '100%',
        height: '70%',
        backgroundColor: 'grey',
      },
      textContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.BackgroundColor,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
      },
    
})