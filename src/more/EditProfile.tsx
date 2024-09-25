import React, { memo, useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Avatar,
  Input,
  Icon,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { getUserEmail, getUserName, getUserAvatar,getUserAddress,getUserPhone } from "utils/session";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import useImagePicker from "hooks/useImagePicker";
import { Images } from "assets/images";
import { Controller, useForm } from "react-hook-form";
import { RuleEmail, RuleName, RulePassword } from "utils/rules";
import useToggle from "hooks/useToggle";
import {
  MainBottomTabStackParamList,
  RootStackParamList,
} from "navigation/types";

const EditProfile = memo(() => {
  const { goBack, navigate } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["profile", "common"]);


  const [takePhoto, choosePhoto] = useImagePicker();
  const [photo, setPhoto] = React.useState<string>();
  const [invisible, setInvisible] = useToggle(false);


  const [userName, setUserName] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const name = await getUserName();
        const avatar = await getUserAvatar();
        const phone = await getUserPhone();
        const address = await getUserAddress();
        const email = await getUserEmail();
        
        setUserName(name);
        setUserAvatar(avatar);
        setUserPhone(phone);
        setUserAddress(address);
        setUserEmail(email);
      
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "Edith Johnson",
      email: "lehieuds@gmail.com",
      password: "12345678aA",
      phoneNumber: "965-954-9111",
      homeAddress: "128 Lincoln St #105, Boston, NY",
    },
  });



  

  const _onSave = () => goBack();
  const _onMap = () => navigate("HomeAddress");
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("editProfile").toString()}
        accessoryLeft={<NavigationAction />}
        accessoryRight={
          <Text category="h7" status={"link"} onPress={_onSave}>
            {t("common:save")}
          </Text>
        }
      />
      <Content padder>
        {photo ? (
          <Avatar
            source={userAvatar ? { uri: userAvatar } : Images.avatar2}
            size="giant"
            shape="rounded"
            /* @ts-ignore */
            style={styles.avatar}
          />
        ) : (
          <Avatar
            shape="rounded"
            source={userAvatar ? { uri: userAvatar } : Images.avatar2}
            size="giant"
            /* @ts-ignore */
            style={styles.avatar}
          />
        )}
        <Text
          category="h8-s"
          status={"link"}
          center
          onPress={() => choosePhoto((i) => setPhoto(i?.uri), [1, 1])}
          mt={24}
          mb={48}
          children={t("editPhoto")}
        />
        <Controller
          control={control}
          name="fullName"
          rules={RuleName}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("fullName").toString()}
              status={errors.fullName ? "warning" : "basic"}
              style={styles.fullName}
              value={userName || ""}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.fullName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={RuleEmail}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("common:email").toString()}
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              value={userEmail || ""} 
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={RulePassword}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("common:password").toString()}
              status={errors.password ? "warning" : "basic"}
              style={styles.password}
              value={value}
              onChangeText={onChange}
              secureTextEntry={invisible}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.password?.message}
              accessoryRight={(props) => (
                <TouchableOpacity activeOpacity={0.7} onPress={setInvisible}>
                  <Icon
                    {...props}
                    pack="assets"
                    name={!invisible ? "eyeOn" : "eyeOff"}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("phoneNumber").toString()}
              status={errors.phoneNumber ? "warning" : "basic"}
              style={styles.phoneNumber}
              value={userPhone || ""}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="numeric"
              caption={errors.phoneNumber?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="homeAddress"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("homeAddress").toString()}
              status={errors.homeAddress ? "warning" : "basic"}
              style={styles.homeAddress}
              value={userAddress || ""}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="numeric"
              caption={errors.homeAddress?.message}
              accessoryRight={(props) => (
                <TouchableOpacity activeOpacity={0.7} onPress={_onMap}>
                  <Icon pack="assets" name={"map"} style={styles.map} />
                </TouchableOpacity>
              )}
            />
          )}
        />
      </Content>
    </Container>
  );
});

export default EditProfile;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  avatar: {
    alignSelf: "center",
  },
  fullName: {
    borderBottomWidth: 2,
  },
  email: {
    borderBottomWidth: 2,
    marginVertical: 24,
  },
  password: {
    borderBottomWidth: 2,
  },
  phoneNumber: {
    marginVertical: 24,
    borderBottomWidth: 2,
  },
  homeAddress: {
    borderBottomWidth: 2,
  },
  map: {
    tintColor: "button-basic-color",
  },
});
