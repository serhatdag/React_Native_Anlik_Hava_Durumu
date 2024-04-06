import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
  TextInput,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";
import { styles } from "./styles"

export const Width = Dimensions.get("window").width;
export const Height = Dimensions.get("window").height

const App = () => {
  //-------------------------------- VARIABLES----------------------------
  const [sun_theme, setSunTheme] = useState(true);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [image_path, setImagePath] = useState(null);
  const [warning_ethernet, setWarningEthernet] = useState(Boolean);
  const [latitude, setLatitude] = useState<any>();
  const [longitude, setLongitude] = useState<any>();
  const [images, setImages] = useState([
    { "01d": require("./assets/media/01d.png") },
    { "01n": require("./assets/media/01n.png") },
    { "02d": require("./assets/media/02d.png") },
    { "02n": require("./assets/media/02n.png") },
    { "03d": require("./assets/media/03d.png") },
    { "03n": require("./assets/media/03n.png") },
    { "04d": require("./assets/media/04d.png") },
    { "04n": require("./assets/media/04n.png") },
    { "09d": require("./assets/media/09d.png") },
    { "09n": require("./assets/media/09n.png") },
    { "10d": require("./assets/media/10d.png") },
    { "10n": require("./assets/media/10n.png") },
    { "11d": require("./assets/media/11d.png") },
    { "11n": require("./assets/media/11n.png") },
    { "13d": require("./assets/media/13d.png") },
    { "13n": require("./assets/media/13n.png") },
    { "50d": require("./assets/media/50d.png") },
    { "50n": require("./assets/media/50n.png") },

  ])
  //-------------------------------- VARIABLES----------------------------

  //-------------------------------- FUNCTIONS----------------------------

  useEffect(() => {
    GetPermission()

  }, []);

  useEffect(() => {
    if (data && data && data.weather && data.weather[0]) {
      for (let x = 0; x < images.length; x++) {
        if (data.weather[0].icon == Object.keys(images[x])[0]) {
          setImagePath(Object.values(images[x])[0]);
          break
        }
      }
    }
  }, [data])

  useEffect(() => {
    if (typeof latitude === "number" && typeof longitude === "number") { Go(latitude, longitude); console.log(typeof latitude) }

  }, [longitude])

  const Go = async (lat: number, lon: number) => {
    const api_key = "senin OpenWeather API anahtarın";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=tr&appid=${api_key}`

    try {
      setLoading(true);
      const check = await NetInfo.fetch();
      if (check.isConnected == true) {
        axios.get(url)
          .then((content) => {
            setData(content.data);
            if (content.data.weather[0].icon.indexOf("d") != -1) {
              setSunTheme(true);
            }
            else { setSunTheme(false) }
          })
          .then(() => {
            setLoading(false);
            setWarningEthernet(false)
          })
      }
      else { setWarningEthernet(true) }

    }
    catch (error) {
      console.log(error)
    }
  }

  const Refresh = () => {
    if (typeof latitude === "number" && typeof longitude === "number") { Go(latitude, longitude) }
  }

  const GetPermission = () => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((response: string) => {
        if (response === "granted") {
          console.log("konumu al");
          Geolocation.getCurrentPosition(
            position => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;

              if (lat) { setLatitude(lat) };
              if (lon) { setLongitude(lon) };
              console.log('Latitude:', lat, 'Longitude:', lon);
            },
            error => {
              console.log('Konum alınamadı:', error.message);
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
          );
        }
        else {
          Alert.alert("Uygulamanın çalışabilmesi için tam konum bilginize ihtiyacı vardır.")
        }
      })
  }



  //-------------------------------- FUNCTIONS----------------------------


  return (
    <SafeAreaView style={styles.container} >
      <StatusBar barStyle={"light-content"} backgroundColor={sun_theme == true ? "#EB4C46" : "#07414F"} />

      <Modal visible={warning_ethernet} animationType='slide' transparent={true} >
        <View style={styles.warning_container} >
          <View style={styles.warning_view} >
            <Text style={styles.warning_text} >İnternet bağlantısı yok.</Text>
            <TouchableOpacity style={styles.warning_button} onPress={() => { Refresh() }} >
              <Text style={styles.warning_button_text} >
                Tekrar Dene
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <LinearGradient
        colors={sun_theme == true ? ["#EB4C46", "#F85D3F", "#E88C5A", "#C75109"] : ["#07414F", "#0E6A83", "#16748D", "#4498A6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.background_gradient}
      >
        <Image source={sun_theme == true ? require("./assets/media/mountain.png") : require("./assets/media/mountain_night.png")} style={styles.mountain} />
      </LinearGradient>

      {

        loading
          ?
          <View style={styles.Activity_View} >
            <ActivityIndicator size={"large"} color={"#ffffff"} />
            <Text style={styles.loading_text} >Konum bilgileriniz alınıyor...</Text>
          </View>
          :
          <View style={styles.contents}
          >

            <View style={styles.top_buttons} >
              <TouchableOpacity style={styles.touchables_right} onPress={() => { Refresh() }}>
                <Image source={require("./assets/media/refresh.png")} style={styles.refresh_icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.descriptions} >
              {loading == false && image_path && <Image source={image_path} style={styles.icon} />}
              {loading == false && <Text style={[styles.city_name, styles.default_text]} >{data.name}</Text>}
              {loading == false && <Text style={[styles.description, styles.default_text]} >{data.weather[0].description}</Text>}
            </View>
            <View style={styles.degree} >
              {loading == false && <Text style={[styles.degree_text, styles.default_text]} >{Math.round(data.main.temp)}°</Text>}
            </View>
            <View style={styles.details} >
              <View style={[styles.high_low]}>
                <Image source={require("./assets/media/thermometer.png")} style={styles.details_icon} />
                <Text style={styles.details_text} >Max. / Min.</Text>
                {loading == false && <Text style={[styles.detail_content]} >{Math.round(data.main.temp_min)} / {Math.round(data.main.temp_max)}</Text>}
              </View>
              <View style={[styles.high_low]}>
                <Image source={require("./assets/media/wind.png")} style={styles.details_icon} />
                <Text style={styles.details_text} >Rüzgar</Text>
                {loading == false && <Text style={[styles.detail_content]} >{data.wind.speed}</Text>}
              </View>
              <View style={[styles.high_low]}>
                <Image source={require("./assets/media/drop.png")} style={styles.details_icon} />
                <Text style={styles.details_text} >Nem</Text>
                {loading == false && <Text style={[styles.detail_content]} >%{Math.round(data.main.humidity)}</Text>}
              </View>
              <View style={[styles.high_low]}>
                <Image source={require("./assets/media/eye.png")} style={styles.details_icon} />
                <Text style={styles.details_text} >Görünürlük</Text>
                {loading == false && <Text style={[styles.detail_content]} >{Math.round(data.visibility / 1000)} km</Text>}
              </View>
            </View>
            <View style={styles.footer} >
              {loading == false && <Text style={[styles.date_text]} >{
                new Intl.DateTimeFormat("tr-TR", {
                  weekday: "long",
                  year: "numeric",
                  month: "numeric",
                  day: "numeric"
                }).format(new Date(data.dt * 1000))
              }</Text>}
            </View>

          </View>

      }


    </SafeAreaView>

  )
}

export default App;

