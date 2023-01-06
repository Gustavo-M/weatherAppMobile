import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard } from "react-native";
import api from "./src/services/api";

function App(){

  const [cidade, setCidade] = useState("");
  const [cidadeData, setCidadeData] = useState("");
  const inputRef = useRef(null);

  async function searchCity(){
    if(cidade == ""){
      alert("Digite uma cidade");
      setCidade("");
      return;
    }

    try{
      const response = await api.get(`/v1/current.json?key=yourKey&q=${cidade}&lang=pt`);
      setCidadeData(response.data);
      Keyboard.dismiss();
    }catch(error){
      console.log("ERROR: " + error);
    }
  }

  function clearText(){
    setCidade("");
    setCidadeData(null);
    inputRef.current.focus();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: "center"}}>
        <Text style={styles.text}>Digite a sua cidade</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ex: Mogi das Cruzes"
          value={cidade.replace(/[^a-zA-Z\s]/g, "")}
          onChangeText={ (text) => setCidade(text) }
          ref={inputRef}
        />
      </View>

      <View style={styles.btnArea}>
        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: "#1D75CD" }]}
          onPress={searchCity}
        >
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: "#CD3E1D" }]}
          onPress={clearText}
        >
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      { cidadeData && 
        <View style={styles.results}>
          <Text style={styles.resultText}>A condição está {cidadeData.current.condition.text}</Text>
          <Text style={styles.resultText}>Temperatura {cidadeData.current.temp_c.toFixed()}C</Text>
          <Text style={styles.resultText}>A velocidade do vento está {cidadeData.current.wind_mph}km</Text>
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },

  text:{
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
  },

  input:{
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    width: "90%",
    padding: 10,
    fontSize: 18,
  },

  btnArea:{
    alignItems: "center",
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  btn:{
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 5,
  },

  btnText:{
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF"
  },

  results:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  resultText: {
    fontSize: 22,
    color: "#333333"
  }
});

export default App;