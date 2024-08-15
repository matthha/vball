import { Image, StyleSheet, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText as TT } from '@/components/ThemedText';
import { ThemedView as V} from '@/components/ThemedView';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { gettingData } from '../data/Action';

export default function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {

    },[])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/vball2.png')}
          style={styles.reactLogo}
        />
      }>
      <V style={styles.titleContainer}>
        <TT type="title">Quick Tips</TT>
        {/* <HelloWave /> */}
      </V>
      <V style={styles.stepContainer}>
        <TT type="subtitle">Step 1: Contacts</TT>
        <TT>
          Create people in Contacts. Skill level should be from 1 to 5 with 1 being a beginner and 5 being an expert.
          Players can also be edited and deleted from the Contacts Screen.
        </TT>
      </V>
      <V style={styles.stepContainer}>
        <TT type="subtitle">Step 2: Make Teams</TT>
        <TT>
          In Team Setup, first select everyone who is playing that day. All those people will then be added to the unassigned team. Then create how many teams you want. From there you can assign members manually to teams or use the randomize to assign teams trying to make the scores even.
        </TT>
      </V>
      <V style={styles.stepContainer}>
        <TT type="subtitle">Step 3: Starting Over</TT>
        <TT>
        If you change how many teams there are after players have been assigned they will remain on their same teams if possible. You can select <TT type="defaultSemiBold">'Clear Teams'</TT> to move all the players to the unassigned team or you start with no players selected by choosing <TT type="defaultSemiBold">'Reset All'</TT>.
        </TT>
      </V>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 500,
    width:500,
    top: -50,
    right: 0,
    position: 'absolute',
    resizeMode:'repeat'
  },
});
