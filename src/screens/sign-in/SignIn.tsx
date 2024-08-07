import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './SignIn.style';
import CustomButton from '@components/button/Button';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import CustomTextInput from '@components/text-input/TextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAvatar from '@components/avatar/Avatar';
import {Button} from 'react-native-paper';
import {useUser} from '@hooks/UseUser';
import {LoginFormInput} from '@utilities/Types';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/Store';
import {getThemeColor} from '@utilities/Color';

const Login = ({route}: any) => {
  const navigation = useNavigation<any>();
  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);
  const avatar = route?.params?.selectedAvatar;
  const {data: users = [], refetch} = useUser();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const themeColors = getThemeColor(theme);

  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      userName: '',
      password: '',
    },
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onPressSignUp = () => navigation.navigate('SignUp');

  const toggleSwitch = async (value: boolean) => {
    setIsEnabled(value);
  };

  const onSubmit: SubmitHandler<LoginFormInput> = async data => {
    refetch();
    const currentUser = users.find(user => data.userName == user.userName);
    if (currentUser) {
      await AsyncStorage.setItem('currentUserId', currentUser.id);
      navigation.navigate('Home', currentUser);
      if (isEnabled) {
        reset({
          userName: currentUser.userName,
          password: currentUser.password,
        });
        const userCredentials = data;
        await AsyncStorage.setItem(
          'userCredentials',
          JSON.stringify(userCredentials),
        );
      } else {
        reset({
          userName: '',
          password: '',
        });
        await AsyncStorage.removeItem('userCredentials');
      }
    } else {
      console.error('Kullanıcı bulunamadı.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView
        style={[styles.container, {backgroundColor: themeColors.background}]}>
        <View
          style={[
            styles.avatarContainer,
            keyboardOpen && styles.avatarContainerKeyboardOpen,
          ]}>
          {avatar ? (
            <CustomAvatar size={80} source={avatar} />
          ) : (
            <CustomAvatar
              size={80}
              source={require('../../../assets/images/anonim-avatar.png')}
            />
          )}
        </View>
        <View
          style={[
            styles.center,
            styles.inputContainer,
            {borderColor: themeColors.titleColor},
          ]}>
          <View style={[styles.center]}>
            <Controller
              control={control}
              rules={{
                required: 'Bu alan boş bırakılamaz',
                minLength: {
                  value: 2,
                  message: 'Geçerli bir kullanıcı adı girin',
                },
              }}
              render={({field: {onBlur, onChange, value}}) => (
                <CustomTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Kullanıcı Adı"
                  placeholderTextColor={themeColors.commentDateColor}
                />
              )}
              name="userName"
            />
            {errors.userName && (
              <Text style={{color: themeColors.danger}}>
                {errors.userName.message}
              </Text>
            )}
            <Controller
              control={control}
              rules={{
                required: 'Bu alan boş bırakılamaz',
                minLength: {
                  value: 5,
                  message: 'Geçerli bir şifre girin',
                },
              }}
              render={({field: {onBlur, onChange, value}}) => (
                <CustomTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Şifre"
                  placeholderTextColor={themeColors.commentDateColor}
                  secureTextEntry
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text style={{color: themeColors.danger}}>
                {errors.password.message}
              </Text>
            )}
          </View>
          <View style={styles.rowStyle}>
            <Text style={[styles.rememberMe, {color: themeColors.titleColor}]}>
              Beni hatırla
            </Text>
            <Switch
              trackColor={{false: 'pink', true: 'blue'}}
              thumbColor={isEnabled ? 'yellow' : 'green'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.submit}>
            <CustomButton title="Giriş Yap" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>

        <Text style={{color: themeColors.titleColor}}>Parolamı unuttum</Text>
        <View style={styles.rowStyle}>
          <Text style={[styles.customText, {color: themeColors.titleColor}]}>
            Hesabınız yok mu?
          </Text>
          <Button
            mode="text"
            onPress={onPressSignUp}
            textColor={themeColors.titleColor}>
            Şimdi kaydolun.
          </Button>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;
