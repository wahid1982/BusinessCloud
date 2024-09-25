import { useTheme } from "@ui-kitten/components";
import React, { memo } from "react";
import { TouchableOpacity, ViewProps } from "react-native";

export interface FlexProps extends ViewProps {
  padder?: boolean;
  mt?: number;
  mb?: number;
  mh?: number;
  mv?: number;
  ml?: number;
  mr?: number;
  ph?: number;
  pv?: number;
  pb?: number;
  border?: number;
  margin?: number;
  center?: boolean;
  itemsCenter?: boolean;
  wrap?: boolean;
  onPress?(): void;
  level?: "1" | "2" | "3" | "4" | "5" | "6";
  justify?:
    | "center"
    | "space-between"
    | "flex-start"
    | "flex-end"
    | "space-around"
    | "space-evenly"
    | undefined;
}

const Flex: React.FC<FlexProps> = memo(
  ({
    style,
    padder,
    children,
    mt,
    mb,
    mh,
    mv,
    ml,
    mr,
    ph,
    pv,
    pb,
    margin,
    itemsCenter,
    wrap,
    center,
    level,
    justify = "space-between",
    onPress,
    border,
    ...props
  }) => {
    const theme = useTheme();
    return (
      <>
        <TouchableOpacity
          disabled={!onPress}
          activeOpacity={!onPress ? 1 : 0.54}
          onPress={onPress}
          style={[
            {
              borderRadius: border,
              alignItems: itemsCenter ? "center" : undefined,
              paddingHorizontal: padder ? 24 : 0,
              paddingBottom: pb,
              flexDirection: "row",
              justifyContent: justify,
              marginTop: mt,
              marginBottom: mb,
              marginLeft: ml,
              marginRight: mr,
              marginHorizontal: mh,
              marginVertical: mv,
              alignSelf: center ? "center" : undefined,
              flexWrap: wrap ? "wrap" : undefined,
              margin: margin,
              paddingVertical: pv,
              backgroundColor: level
                ? theme[`background-basic-color-${level}`]
                : "transparent",
            },
            style,
          ]}
          {...props}
        >
          {children}
        </TouchableOpacity>
      </>
    );
  }
);

export default Flex;
