import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { SwipeListView } from "react-native-swipe-list-view";

const screenWidth = Dimensions.get("window").width;

const DATA = [
  {
    label: "laptops",
    key: 0,
  },
  {
    label: "Funiture",
    key: 1,
  },
  {
    label: "Luxturies",
    key: 2,
  },
  {
    label: "Clothing",
    key: 3,
  },
  {
    label: "Phones",
    key: 4,
  },
  {
    label: "Funiture",
    key: 5,
  },
  {
    label: "Luxturies",
    key: 6,
  },
  {
    label: "Clothing",
    key: 7,
  },
  {
    label: "Phones",
    key: 8,
  },
  {
    label: "Funiture",
    key: 9,
  },
  {
    label: "Luxturies",
    key: 10,
  },
  {
    label: "Clothing",
    key: 11,
  },
  {
    label: "Phones",
    key: 12,
  },
  {
    label: "Funiture",
    key: 13,
  },
  {
    label: "Luxturies",
    key: 14,
  },
  {
    label: "Clothing",
    key: 15,
  },
  {
    label: "Phones",
    key: 16,
  },
  {
    label: "Funiture",
    key: 17,
  },
  {
    label: "Luxturies",
    key: 18,
  },
  {
    label: "Clothing",
    key: 19,
  },
  {
    label: "Phones",
    key: 20,
  },
];

const rowAnimatedValues = {};
Array(21)
  .fill(" ")
  .forEach((_, i) => {
    rowAnimatedValues[`${i}`] = {
      rowHeight: new Animated.Value(80),
      deleteButtonWidth: new Animated.Value(100),
      rowBackWidth: new Animated.Value(0),
    };
  });

function VisibleItem({ data, rowKey }) {
  return (
    <Animated.View
      style={[styles.rowFront, { height: rowAnimatedValues[rowKey].rowHeight }]}
    >
      <Text style={styles.text}>{data.label}</Text>
    </Animated.View>
  );
}

function HiddenItemWithActions({
  data,
  rightActionActivated,
  swipeAnimatedValue,
  rowKey,
}) {

  if (rightActionActivated) {
    Animated.timing(rowAnimatedValues[rowKey].deleteButtonWidth, {
      toValue: Math.abs(swipeAnimatedValue.__getValue()),
      duration: 250,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.timing(rowAnimatedValues[rowKey].deleteButtonWidth, {
      toValue: 100,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }
  return (
    <Animated.View style={styles.rowBack}>
      <Animated.View
        style={[
          styles.arrowBtn,
          {
            width: 100,
            transform: [
              {
                translateX: swipeAnimatedValue.interpolate({
                  inputRange: [-200, -120, 0],
                  outputRange: [-100, -40, 100],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={40}
          color="white"
        ></MaterialCommunityIcons>
        <Text style={{ color: "white", fontSize: 16, fontWeight: 500 }}>
          Right
        </Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.deleteBtn,
          {
            width: rowAnimatedValues[rowKey].deleteButtonWidth,
            transform: [
              {
                translateX: swipeAnimatedValue.interpolate({
                  inputRange: [-200, -120, 0],
                  outputRange: [0, 50, 100],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={40}
          color="white"
        ></MaterialCommunityIcons>
        <Text style={{ color: "white", fontSize: 16, fontWeight: 500 }}>
          Delete
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

export default function SwipeToDelete() {
  const [list, setList] = useState(DATA);
  const renderItem = ({ item, rowMap }) => {
    return (
      <VisibleItem data={item} rowMap={rowMap} rowKey={item.key}></VisibleItem>
    );
  };

  const renderHiddenItem = ({ item, rowMap }) => {
    return (
      <HiddenItemWithActions
        data={item}
        rowMap={rowMap}
        rowKey={item.key}
      ></HiddenItemWithActions>
    );
  };

  const deleteItem = (rowKey) => {
    const newList = list.filter((item) => item.key !== rowKey);
    setList(newList);
  }

  const onRightActionStatusChange = () => {
    console.log();
  };

  const swipeGestureEnded = (rowKey, data) => {
    console.log(rowKey);

    Animated.timing(rowAnimatedValues[rowKey].rowHeight, {
      toValue: 0,
      delay: 2000,
      duration: 200,
      useNativeDriver: false,
    }).start(() => deleteItem(rowKey));
  };

  return (
    <SwipeListView
      style={styles.swipeList}
      data={list}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={-120}
      disableRightSwipe
      rightOpenValue={-180}
      stopRightSwipe={-201}
      rightActivationValue={-200}
      rightActionValue={-screenWidth}
      onRightActionStatusChange={onRightActionStatusChange}
      swipeGestureEnded={swipeGestureEnded}
      swipeToOpenPercent={10}
      swipeToClosePercent={10}
      ItemSeparatorComponent={() => (
        <View style={{ backgroundColor: "black", height: 1 }}></View>
      )}
      useNativeDriver={false}
    ></SwipeListView>
  );
}

const styles = StyleSheet.create({
  swipeList: {
    width: "100%",
  },
  deleteBtn: {
    backgroundColor: "tomato",
    justifyContent: "center",
    paddingLeft: 10,
  },
  arrowBtn: {
    position: "absolute",
    backgroundColor: "purple",
    justifyContent: "center",
    paddingLeft: 10,
    height: "100%",
  },
  rowBack: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: "100%",
    width: "100%",
  },
  rowFront: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
  text: {
    color: "white",
    fontSize: 24,
  },
});
