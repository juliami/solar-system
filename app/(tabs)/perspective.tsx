import { Planet, StaticPlanet } from '@/components/planet-perspective';

import { StyleSheet, View } from 'react-native';


export default function Solar() {
  return (
    <View style={styles.container}>
        <StaticPlanet symbol="☉" color="#FDB813" distance={0} size={1} />

        <Planet symbol="☿" color="#8c8a89" distance={0.38} size={0.38} orbitSpeed={1.6} spinSpeed={0.5} />
        <Planet symbol="♀" color="#dab292" distance={0.72} size={0.7} orbitSpeed={1.175} spinSpeed={1.6} />
        <Planet symbol="⨁" color="#6287a7" distance={1} size={1} orbitSpeed={1} spinSpeed={1} />
        <Planet symbol="♂" color="#f17b5f" distance={1.52} size={0.5} orbitSpeed={0.8} spinSpeed={1.8} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
  },
});
