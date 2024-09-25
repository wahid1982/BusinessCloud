import React, { memo } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { Button, StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { useTranslation } from "react-i18next";
import { Images } from "assets/images";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Dots from "./Dots";
import Flex from "components/Flex";
import { RootStackParamList } from "navigation/types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useAuth from "hooks/useAuth";
import { globalStyle } from "styles/globalStyle";

const Onboarding = memo(() => {
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["intro", "common"]);
  const { navigate, goBack } =
    useNavigation<NavigationProp<RootStackParamList>>();

  const translationX = useSharedValue(0);
  const scrollRef = useAnimatedRef<ScrollView>();
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });
  const DATA = [
    { id: 0, title:"Empowering Your Business Journey", img: Images.art1 },
    { id: 1, title:"Connecting Professionals with Opportunities", img: Images.art2 },
    { id: 2, title:"Innovative Solutions for Your Business Needs", img: Images.art3 },
  ];

  const onLogin = React.useCallback(
    () => navigate("AuthStack", { screen: "Login" }),
    []
  );
  const onSignup = React.useCallback(
    () => navigate("AuthStack", { screen: "Signup" }),
    []
  );
  const onGetHere = React.useCallback(() => {}, []);
  const { isSignedIn } = useAuth();
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <Animated.ScrollView
          ref={scrollRef as any}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          horizontal
          snapToInterval={width}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
          onScroll={scrollHandler}
          style={{ width: width }}
          contentContainerStyle={{
            width: width * DATA.length,
            justifyContent: "center",
          }}
        >
          {DATA.map((i, index) => {
            let id = i.id;
            const input = [(id - 1) * width, id * width, (id + 1) * width];
            const style = useAnimatedStyle(() => {
              const translateX = interpolate(
                translationX.value,
                input,
                [-width / 3, 0, width / 3],
                Extrapolate.CLAMP
              );
              const scale = interpolate(
                translationX.value,
                input,
                [0.61, 1, 0.61],
                Extrapolate.CLAMP
              );
              const opacity = interpolate(
                translationX.value,
                input,
                [-0.6, 1, -0.6]
              );

              return {
                opacity: opacity,
                transform: [{ translateX: translateX }, { scale: scale }],
                width: width,
              };
            });
            return (
              <Animated.View key={index} style={style}>
                <Text category="h2" mh={24}>
                  {i.title}
                </Text>
                <Image
                  source={i.img}
                  /* @ts-ignore */
                  style={styles.image}
                />
              </Animated.View>
            );
          })}
        </Animated.ScrollView>
        <Dots translationValue={translationX} data={DATA} />
        <Flex padder pv={48}>
          <Button style={styles.login} status="outline" onPress={onLogin}>
            {t("common:login").toString()}
          </Button>
          <Button
            style={[styles.signup, globalStyle.shadowBtn]}
            status="basic"
            onPress={onSignup}
          >
            {t("common:signup").toString()}
          </Button>
        </Flex>
      </Content>
      <Flex center mb={16}>
        <Text>Find Business Cloud.</Text>
        <TouchableOpacity onPress={onGetHere} activeOpacity={0.54}>
          <Text status={"link"}>{t("getHere")}</Text>
        </TouchableOpacity>
      </Flex>
    </Container>
  );
});

export default Onboarding;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 56,
    alignItems: "center",
  },
  image: {
    marginVertical: 32,
  },
  login: {
    flex: 1,
    marginRight: 16,
  },
  signup: {
    flex: 1,
  },
});
