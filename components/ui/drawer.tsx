import { Challenge } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import * as Sharing from "expo-sharing";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  PanResponder,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { captureRef } from "react-native-view-shot";

import Icons from "../icons";

const { height } = Dimensions.get("window");

type InstagramStoryDrawerProps = {
  isVisible: boolean;
  onClose: () => void;
  challenge: Challenge | null;
  image: string | null;
  markChallengeAsCompleted: () => void;
};

const InstagramStoryDrawer = ({
  isVisible,
  onClose,
  challenge,
  image,
  markChallengeAsCompleted,
}: InstagramStoryDrawerProps) => {
  const ref = useRef<View>(null);

  const [caption, setCaption] = useState(
    "This pretzel deserves all the heart-eye emojis 🥨"
  );
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 150) {
          Animated.timing(translateY, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            onClose();
          });
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const captureAndShareInstagramStory = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      const imageUri = await captureRef(ref, {
        format: "png",
        quality: 1,
      });
      await Sharing.shareAsync(imageUri);
    } catch (error) {
      console.error(error);
    }
  };

  if (!challenge || !image) {
    return null;
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={{ flex: 1 }} />
      </TouchableOpacity>
      <Animated.View
        style={[
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingBottom: 40,
            maxHeight: height * 0.9,
          },
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <View
          style={{
            alignItems: "center",
          }}
          {...panResponder.panHandlers}
        >
          <View
            style={{
              width: 40,
              height: 4,
              backgroundColor: "#E0E0E0",
              borderRadius: 2,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: "#F0F0F0",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Halyard-Medium",
              color: "#000",
            }}
          >
            {challenge.title}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Icons.Close />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 15,
            gap: 8,
            paddingHorizontal: 20,
          }}
        >
          <Icons.CheckCircle />
          <Text
            style={{
              color: "#088229",
              fontSize: 16,
              flex: 1,
              fontFamily: "Halyard-Regular",
            }}
          >
            Uploaded successfully
          </Text>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#666",
            }}
          >
            <Text
              style={{
                color: "#666",
                fontSize: 16,
                fontFamily: "Halyard-Regular",
              }}
            >
              Change photo
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 18,
            color: "#444",
            paddingHorizontal: 20,
            fontFamily: "Halyard-Medium",
          }}
        >
          Let us help you with your instagram story
        </Text>
        <View
          style={{
            paddingHorizontal: 20,
            gap: 12,
            paddingVertical: 12,
          }}
        >
          <TextInput
            style={{
              fontSize: 16,
              color: "#333",
              minHeight: 50,
              borderWidth: 1,
              borderColor: "#E0E0E0",
              borderRadius: 12,
              paddingHorizontal: 10,
            }}
            value={caption}
            onChangeText={setCaption}
            multiline
            placeholder="Add a caption..."
          />
          <View
            style={{
              backgroundColor: "#F1F2F8",
              borderRadius: 12,
              padding: 12,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#666",
                textAlign: "center",
                marginBottom: 15,
                fontFamily: "Halyard-Regular",
              }}
            >
              Insta story preview
            </Text>
            <View
              ref={ref}
              collapsable={false}
              style={{
                backgroundColor: "#fff",
                width: "75%",
                alignSelf: "center",
                alignItems: "center",
                padding: 20,
                gap: 12,
              }}
            >
              <Image
                source={{
                  uri: image,
                }}
                style={{
                  width: "100%",
                  height: 245,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: "#444444",
                  fontFamily: "Halyard-Regular",
                }}
              >
                {caption}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            gap: 12,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={captureAndShareInstagramStory}>
            <LinearGradient
              colors={["#DD04E2", "#FC01B8", "#FD0191", "#FE700E"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                alignItems: "center",
                paddingVertical: 16,
                paddingHorizontal: 12,
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontFamily: "Halyard-Medium",
                }}
              >
                Share as Instagram story
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={markChallengeAsCompleted}
            style={{
              backgroundColor: "#8000FF",
              alignItems: "center",
              paddingVertical: 16,
              paddingHorizontal: 12,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontFamily: "Halyard-Medium",
              }}
            >
              Complete challenge
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default InstagramStoryDrawer;
