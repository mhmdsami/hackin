import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const challenges = [
  {
    id: 1,
    emoji: "🏰",
    title: "Snap the castle at sunset",
    description: "Capture the golden hour",
  },
  {
    id: 2,
    emoji: "🥨",
    title: "Pose with a pretzel",
    description: "Share your Disney snack moment",
  },
  {
    id: 3,
    emoji: "🎢",
    title: "Selfie on the favourite ride",
    description: "Let us see your wholesome reaction",
  },
  {
    id: 4,
    emoji: "👸",
    title: "Click with a character",
    description: "Share your Disney snack moment",
  },
];

export default function DisneylandChallengeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView>
        <ImageBackground
          source={{
            uri: "https://cdn-imgix.headout.com/media/images/cf0b021f5a9c9996576761ed1bdacc2b-6645-Paris-Disneyland-ParisMultidayTickets-2.jpg?w=613.2&h=384.3&crop=faces&auto=compress,format&fit=min",
          }}
          style={{
            height: 300,
            width: "100%",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              paddingHorizontal: 20,
              paddingBottom: 32,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <View
              style={{
                position: "absolute",
                top: 72,
                left: 20,
                right: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text
                style={{
                  flexGrow: 1,
                  color: "#fff",
                  textAlign: "center",
                  fontFamily: "Halyard-Medium",
                  fontSize: 20,
                  marginBottom: 4,
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
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 26,
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
                }}
              >
                <Ionicons name="trophy-outline" size={16} color="#5C4B0E" />
                <Text
                  style={{
                    fontWeight: "bold",
                    marginLeft: 6,
                    fontSize: 14,
                    color: "#5C4B0E",
                  }}
                >
                  100 credits
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: "#eee",
                fontSize: 14,
                marginBottom: 12,
              }}
            >
              Complete and earn credits
            </Text>

            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: 10,
                borderRadius: 12,
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
                    fontSize: 14,
                    marginBottom: 4,
                  }}
                >
                  0/4 completed
                </Text>
              </View>
              <View
                style={{
                  height: 6,
                  backgroundColor: "#ccc",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    width: "0%",
                    height: "100%",
                    backgroundColor: "#FFD700",
                  }}
                />
              </View>
            </View>
          </View>
        </ImageBackground>

        {challenges.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              borderBottomColor: "#eee",
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                marginRight: 12,
              }}
            >
              {item.emoji}
            </Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#666",
                }}
              >
                {item.description}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                marginLeft: 12,
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 6,
                borderRadius: 8,
              }}
            >
              <Ionicons name="camera-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
