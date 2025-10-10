import { ScrollView, StyleSheet } from "react-native";

export function ColumnScrollView({ style, children, ...rest }) {
  return (
    <ScrollView
      style={style}
      contentContainerStyle={StyleSheet.create({
        alignItems: "ceter",
      })}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}

export function RowScrollView({ style, children, ...rest }) {
  return (
    <ScrollView
      style={style}
      contentContainerStyle={StyleSheet.create({
        flexDirection: "row",
        alignItems: "center",
      })}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}
