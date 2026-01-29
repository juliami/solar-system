import { StyleSheet, Text, View } from 'react-native';

export default function Index() {


  return (
    <View style={styles.container}>
     <Text
     >
      Hello
     </Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: 'black',
  },

  text : {
    color: 'indianred',
    fontSize: 20,
    marginTop: 80,
  },

  buttonText: {
    color: 'white',
  },
});
