import { StyleSheet } from "react-native";
import { Height, Width } from "./App";


export const styles = StyleSheet.create({
    container: {
        flex: 1
      },
      background_gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      },
      top_icons: {
        width: "15%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "purple"
      },
      top_buttons: {
        flex: .3,
        justifyContent:"center",
        alignItems:"center",
      },
      refresh_icon:{
        resizeMode:"contain",
        height:"40%"
      },
      touchables_right: {
        height:"100%",
        width:"20%",
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"flex-end"
      },
      mountain: {
        resizeMode: "contain",
        width: "100%",
        height: "auto",
        aspectRatio: 19 / 9
      },
      Activity_View: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
      },
      contents: {
        position: "absolute",
        width: "100%",
        height: "100%",
        paddingHorizontal: "5%"
      },
    
      descriptions: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between"
      },
      degree: {
        flex: 2,
        alignItems: "center"
      },
      details: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
      },
      footer: {
        flex: 1,
        justifyContent: "center"
      },
      high_low: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      details_icon: {
        resizeMode: "contain",
        height: "15%",
        marginVertical: "5%"
      },
      details_text: {
        color: "#ffffff",
        marginVertical: "5%"
      },
      detail_content: {
        color: "#dddddd"
      },
      today: {
        flexDirection: "row",
        justifyContent: "space-around"
      },
      tomorrow: {
        flexDirection: "row",
        justifyContent: "space-around"
      },
      icon: {
        resizeMode: "contain",
        height: "42%",
      },
      default_text: {
        color: "#ffffff"
      },
      city_name: {
        fontSize: 40,
        fontFamily: "Baloo"
      },
      description: {
        fontFamily: "Champagne",
        fontSize: 30,
      },
      degree_text: {
        fontFamily: "Champagne",
        fontSize: 90,
        marginTop: "10%"
      },
      date_text: {
        color: "#ffffff",
        fontFamily: "Baloo",
        fontSize: 20
      },
      warning_container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      warning_view:{
        backgroundColor: "white",
        width:"60%",
        paddingVertical:"5%",
        borderRadius: 10,
        justifyContent:"center",
        alignItems:"center"
      },
      warning_text:{
        fontWeight:"bold",
        fontSize: 15,
        marginVertical:10,
        color:"#07414F"
      },
      warning_button:{
        marginVertical:10,
        backgroundColor:"#EB4C46",
        borderRadius:5
      },
      warning_button_text:{
        paddingVertical:"2%",
        paddingHorizontal:"5%",
        color:"#ffffff"
      },
      loading_text:{
        fontFamily: "Baloo",
        color:"#ffffff",
        fontSize:15
      }
})

