import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, FlatList, Button, Pressable, View, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';

export default function Tourny() {
   return (
      <ScrollView style={[styles.titleContainer,{backgroundColor:'black'}]}>
      <ThemedView style={styles.titleContainer}></ThemedView>
      </ScrollView>
   )
}
const styles = StyleSheet.create({
titleContainer: {
   flex: 1,
   paddingTop: 32,
   gap: 16,
   // overflow: 'hidden',
 },  
 reactLogo: {
   height: 178,
   width: 290,
   bottom: 0,
   left: 0,
   position: 'absolute',
 },
})