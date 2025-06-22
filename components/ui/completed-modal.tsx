import React from "react";
import {
  Dimensions,
  Modal,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Confetti from "../confetti";
import Icons from "../icons";

const { width } = Dimensions.get("window");

type CompletedModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function CompletedModal({ isVisible, onClose }: CompletedModalProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <StatusBar barStyle="light-content" />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 20,
              width: width * 0.9,
              maxWidth: 400,
              alignItems: "center",
              padding: 24,
            }}
          >
            <View
              style={{
                gap: 20,
                width: "100%",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Confetti />
              </View>
              <Text
                style={{
                  fontSize: 28,
                  color: "#222",
                  textAlign: "center",
                  fontFamily: "Halyard-Medium",
                }}
              >
                Congratulations!!
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#666",
                  textAlign: "center",
                  fontFamily: "Halyard-Regular",
                }}
              >
                You've completed all challenges and earned
              </Text>
              <View
                style={{
                  backgroundColor: "#FFF4F5",
                  padding: 16,
                  borderRadius: 12,
                  gap: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    color: "#E91E63",
                    textAlign: "center",
                    fontFamily: "Halyard-Medium",
                  }}
                >
                  $10 worth Headout credits
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    borderTopColor: "#F1D6E3",
                    borderTopWidth: 1,
                    paddingTop: 12,
                    borderStyle: "dashed",
                  }}
                >
                  <Icons.Info />
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#B7017D",
                      fontFamily: "Halyard-Regular",
                    }}
                  >
                    Use it on your next booking — hope it was fun!
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#8000FF",
                  paddingVertical: 16,
                  borderRadius: 12,
                  alignItems: "center",
                }}
                onPress={onClose}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "600",
                    fontFamily: "Halyard-Medium",
                  }}
                >
                  Awesome!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
