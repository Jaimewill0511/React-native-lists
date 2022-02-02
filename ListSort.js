import { Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import styles from "./styles";

const arrows = new Map([
  [true, "▼"],
  [false, "▲"],
]);

export default function ListSort({ onSort, asc }) {
  return (
    <Text style={styles.textSort} onPress={onSort}>
      {arrows.get(asc)}
    </Text>
  );
}

ListSort.propTypes = {
  onSort: PropTypes.func.isRequired,
  asc: PropTypes.bool.isRequired,
};
