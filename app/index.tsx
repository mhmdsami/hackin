import Icons from "@/components/icons";
import CompletedModal from "@/components/ui/completed-modal";
import InstagramStoryDrawer from "@/components/ui/drawer";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Challenge, ChallengeAPIResponse } from "../types";

export default function DisneylandChallengeScreen() {
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      emoji: "🏰",
      title: "Snap the castle at sunset",
      description: "Capture the golden hour",
      isCompleted: false,
    },
    {
      id: 2,
      emoji: "🥨",
      title: "Pose with a pretzel",
      description: "Share your Disney snack moment",
      isCompleted: false,
    },
    {
      id: 3,
      emoji: "🎢",
      title: "Selfie on the favourite ride",
      description: "Let us see your wholesome reaction",
      isCompleted: false,
    },
    {
      id: 4,
      emoji: "👸",
      title: "Click with a character",
      description: "Share your Disney snack moment",
      isCompleted: false,
    },
  ]);

  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>();

  const completedChallenges = challenges.filter(
    (challenge) => challenge.isCompleted
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );

  const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);

  const handleChallenge = async (challenge: Challenge) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: false,
      allowsEditing: true,
      quality: 1,
      aspect: [16, 19],
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return;
    }

    const selectedImage = result.assets[0];

    setIsLoading(true);
    setSelectedChallenge(challenge);
    setImage(selectedImage.uri);

    const formData = new FormData();

    formData.append("prompt", challenge.title);
    formData.append("image", {
      uri: selectedImage.uri,
      name: selectedImage.fileName || "image.jpg",
      type: selectedImage.type || "image/jpeg",
    } as any);

    const rawResponse = await fetch(
      new URL(
        `/api/upload-and-verify`,
        process.env.EXPO_PUBLIC_API_BASE_URL
      ).toString(),
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!rawResponse.ok) {
      console.error("Failed to upload image");
      setIsLoading(false);
      setError("Failed to upload image. Please try again.");
      return;
    }

    const response: ChallengeAPIResponse = await rawResponse.json();

    console.log("API Response:", response);

    if (response.status === "REJECTED") {
      setIsLoading(false);
      setError("Your submission was rejected. Please try again.");
      return;
    }

    setIsLoading(false);
    setCaption(response.caption);
    setIsDrawerVisible(true);
  };

  const handleMarkChallengeAsCompleted = () => {
    if (selectedChallenge) {
      setChallenges((prevChallenges) =>
        prevChallenges.map((challenge) =>
          challenge.id === selectedChallenge.id
            ? { ...challenge, isCompleted: true }
            : challenge
        )
      );
      setImage(null);
      setSelectedChallenge(null);
      setIsDrawerVisible(false);
    }

    if (completedChallenges.length === challenges.length) {
      setIsCompletedModalVisible(true);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
    setImage(null);
    setSelectedChallenge(null);
    setCaption(undefined);
    setError(null);
    setIsLoading(false);
    setIsCompletedModalVisible(false);
  };

  return (
    <View>
      <InstagramStoryDrawer
        isLoading={isLoading}
        isVisible={isLoading || !!error || isDrawerVisible}
        error={error}
        onClose={handleCloseDrawer}
        image={image}
        challenge={selectedChallenge}
        generatedCaption={caption}
        markChallengeAsCompleted={handleMarkChallengeAsCompleted}
      />
      <CompletedModal
        isVisible={isCompletedModalVisible}
        onClose={() => setIsCompletedModalVisible(false)}
      />
      <ScrollView>
        <ImageBackground
          source={{
            uri: "https://cdn-imgix.headout.com/media/images/cf0b021f5a9c9996576761ed1bdacc2b-6645-Paris-Disneyland-ParisMultidayTickets-2.jpg?w=613.2&h=384.3&crop=faces&auto=compress,format&fit=min",
          }}
          style={{
            height: "auto",
            width: "100%",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              paddingTop: 64,
              paddingBottom: 32,
              paddingHorizontal: 20,
              backgroundColor: "rgba(0,0,0,0.65)",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                position: "relative",
              }}
            >
              <TouchableOpacity>
                <Icons.BackArrow />
              </TouchableOpacity>
              <Text
                style={{
                  flexGrow: 1,
                  color: "#fff",
                  textAlign: "center",
                  fontFamily: "Halyard-Medium",
                  fontSize: 16,
                  marginBottom: 4,
                  position: "absolute",
                  left: 0,
                  right: 0,
                }}
              >
                Headout Challenges
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 32,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 24,
                  fontFamily: "Halyard-Medium",
                }}
              >
                Disneyland challenges
              </Text>
              <View
                style={{
                  backgroundColor: "#FFF7DB",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 20,
                  borderColor: "#E0D3A680",
                  borderWidth: 1,
                }}
              >
                <Icons.Trophy />
                <Text
                  style={{
                    marginLeft: 6,
                    fontSize: 12,
                    color: "#5C4B0E",
                    fontFamily: "Halyard-Regular",
                  }}
                >
                  100 credits
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                marginBottom: 12,
                opacity: 0.8,
                fontFamily: "Halyard-Regular",
              }}
            >
              Complete and earn credits
            </Text>
            <View
              style={{
                borderRadius: 12,
                overflow: "hidden",
                borderColor: "rgba(255,255,255,0.5)",
                borderWidth: 2,
              }}
            >
              <BlurView
                intensity={40}
                tint="systemUltraThinMaterialLight"
                style={{
                  padding: 12,
                  borderColor: "rgba(255,255,255,0.5)",
                  gap: 12,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      marginBottom: 4,
                      fontFamily: "Halyard-Medium",
                    }}
                  >
                    Progress
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color:
                          completedChallenges.length > 0 ? "#1CDD7D" : "#fff",
                        fontSize: 12,
                        fontFamily: "Halyard-Regular",
                      }}
                    >
                      {completedChallenges.length}
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        fontFamily: "Halyard-Regular",
                      }}
                    >
                      /{challenges.length} completed
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: 8,
                    backgroundColor: "rgba(255,255,255,0.27)",
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      height: "100%",
                      width: `${
                        (completedChallenges.length / challenges.length) * 100
                      }%`,
                      backgroundColor: "#15D676",
                      borderRadius: 10,
                    }}
                  />
                </View>
              </BlurView>
            </View>
          </View>
        </ImageBackground>

        <View style={{ flex: 1, backgroundColor: "#F8F8F8", gap: 8 }}>
          {challenges.map((item) => (
            <View
              key={item.id}
              style={{
                backgroundColor: item.isCompleted ? "#EBFFEE" : "#fff",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 24,
                paddingVertical: 32,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  marginRight: 12,
                }}
              >
                {item.emoji}
              </Text>
              <View style={{ flex: 1, gap: 2 }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#222222",
                    fontFamily: "Halyard-Medium",
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#444444",
                    fontFamily: "Halyard-Regular",
                  }}
                >
                  {item.description}
                </Text>
              </View>
              {item.isCompleted ? (
                <Icons.Checkmark />
              ) : (
                <TouchableOpacity
                  style={{
                    marginLeft: 12,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 6,
                    borderRadius: 8,
                  }}
                  onPress={() => handleChallenge(item)}
                >
                  <Icons.Upload />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
