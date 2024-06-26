// customAvatar.styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  avatar: {
    borderColor: 'red',
    borderWidth: 2,
    backgroundColor: 'red',
    // Shadow properties for iOS
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    // Elevation for Android
    elevation: 10,
  }
});
