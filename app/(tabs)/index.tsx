import { Image, StyleSheet, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { gettingData } from '../data/Action';

export default function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    // let async temp = await JSON.parse(myGames)
    // setWord(temp)
    // dispatch(gettingData())
    },[])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Quick Tips</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Contacts</ThemedText>
        <ThemedText>
          Create people in Contacts. Skill level should be from 1 to 5 with 1 being a beginner and 5 being an expert.
          Players can also be edited and deleted from the Contacts Screen.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Make Teams</ThemedText>
        <ThemedText>
          In Team Setup, first select everyone who is playing that day. All those people will then be added to the unassigned team. Then create how many teams you want. From there you can assign members manually to teams or use the randomize to assign teams trying to make the scores even.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Starting Over</ThemedText>
        <ThemedText>
        If you change how many teams there are after players have been assigned they will remain on their same teams if possible. You can select <ThemedText type="defaultSemiBold">'Clear Teams'</ThemedText> to move all the players to the unassigned team or you start with no players selected by choosing <ThemedText type="defaultSemiBold">'Reset All'</ThemedText>.
        </ThemedText>
      </ThemedView>
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
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
