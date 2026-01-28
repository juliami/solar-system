import { Planet } from '@/components/planet';
import { StyleSheet, View } from 'react-native';


export default function Solar() {
  return (
    <View style={styles.container}>
        <Planet symbol="☉" color="yellow" distance={0} size={1}/>

        <Planet symbol="☿" color="#8c8a89" distance={0.38} size={0.38} orbitSpeed={1.6} />
        <Planet symbol="♀" color="#dab292" distance={0.72} size={0.9} orbitSpeed={1.175} />
        <Planet symbol="⨁" color="#6287a7" distance={1} size={1} orbitSpeed={1} />
        <Planet symbol="♂" color="#f17b5f" distance={1.52} size={0.5} orbitSpeed={0.8} />
        <Planet symbol="♃" color="#8c8a89" distance={5.2} size={11} orbitSpeed={1} />
        <Planet symbol="♄" color="#8c8a89" distance={9.53} size={9.45} orbitSpeed={1} />
        {/* <Planet symbol="⛢" color="#8c8a89" distance={19} size={4} orbitSpeed={1} />
        <Planet symbol="♆" color="#8c8a89" distance={30} size={3.8} orbitSpeed={1} /> */}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    // transform: [{ scale: 0.4 }],
  },
});
