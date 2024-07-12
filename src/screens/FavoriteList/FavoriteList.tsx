import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './favoriteList.style';
import {RootState, useAppDispatch} from '../../redux/store';
import {useSelector} from 'react-redux';
import {MovieType} from '../../types';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Color } from '../../utilities/Color';
import { removeFromFavorites } from '../../redux/actions/favoriteActions';
import { getThemeColor } from '../../color';

const FavoriteList = () => {
  const navigation = useNavigation<any>();
  const {favorites} = useSelector((state: RootState) => state.favori);
  const dispatch = useAppDispatch();
  const theme = useSelector((state:RootState) => state.theme.theme);
  const themeColors = getThemeColor(theme);

  const handlePress = (item: MovieType) => {
    navigation.navigate('MovieDetail', {movie: item});
  };
  const handleIconPress = (item:MovieType) => {
    dispatch(removeFromFavorites(item.id));

  };

  const renderItem = ({item}: {item: MovieType}) => (
    <View style={styles.movieContainer}>
      <TouchableOpacity onPress={() => handlePress(item)}>
        <Ionicons onPress={() => handleIconPress(item)} style={styles.closeIcon} name="close" size={24} color={themeColors.danger} />
        <Image source={{uri: item.src}} style={styles.movieImage} />
        <Text style={[styles.movieTitle,{color: themeColors.titleColor}]}>{item.name}</Text>

      </TouchableOpacity>
    </View>
  );
  const FavoriEmptyComponent = () => {
    return (
      <SafeAreaView>
        <Text style={[styles.emptyCompText, {color: themeColors.titleColor}]}>
          Favori filminiz bulunmamaktadır.
        </Text>
      </SafeAreaView>
    );
  };
  return (
    <SafeAreaView style={[styles.mainContainer, {backgroundColor: themeColors.background}]}>
      <Text style={[styles.categoryTitle, {color: themeColors.titleColor}]}>Favorilerim</Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={favorites}
        renderItem={renderItem}
        numColumns={2}
        ListEmptyComponent={FavoriEmptyComponent}
      />
      <TouchableOpacity>
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default FavoriteList;
