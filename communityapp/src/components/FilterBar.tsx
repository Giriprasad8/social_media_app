// src/components/FilterBar.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

type Props = {
  filterType: "offering" | "request" | null;
  setFilterType: (v: "offering" | "request" | null) => void;
  radiusMiles: number;
  setRadiusMiles: (v: number) => void;
};

export default function FilterBar({ filterType, setFilterType, radiusMiles, setRadiusMiles }: Props) {
  return (
    <View style={styles.row}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => setFilterType(filterType === "offering" ? null : "offering")} style={[styles.btn, filterType === "offering" ? styles.btnActive : null]}>
          <Text style={styles.btnText}>Offering</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterType(filterType === "request" ? null : "request")} style={[styles.btn, filterType === "request" ? styles.btnActive : null]}>
          <Text style={styles.btnText}>Request</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Radius:</Text>
        <TextInput
          value={String(radiusMiles)}
          onChangeText={(t) => {
            const n = parseInt(t || "0", 10);
            setRadiusMiles(Number.isNaN(n) ? 0 : n);
          }}
          style={styles.radiusInput}
          keyboardType="numeric"
        />
        <Text>mi</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  btn: { padding: 8, marginRight: 8, borderRadius: 6, borderWidth: 1, borderColor: "#ddd" },
  btnActive: { backgroundColor: "#1976D2" },
  btnText: { color: "#000" },
  radiusInput: { borderWidth: 1, width: 50, marginHorizontal: 6, padding: 4, textAlign: "center" }
});



