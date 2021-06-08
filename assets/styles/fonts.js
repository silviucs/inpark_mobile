import {Platform} from "react-native";

const PoppinsBlack = Platform.OS == 'ios' ? "Poppins-Black" : "Poppins-Black";
const PoppinsRegular = Platform.OS == 'ios' ? "Poppins-Regular" : "Poppins-Regular";
const PoppinsSemiBold = Platform.OS == 'ios' ? "Poppins-SemiBold" : "Poppins-SemiBold";
export const PoppinsBold = Platform.OS == 'ios' ? "Poppins-Bold" : "Poppins-Bold";
const BalooRegular = Platform.OS == 'ios' ? "BalooBhaijaan-Regular" : "Baloo-Bhaijaan-Regular";
export const RobotoRegular = Platform.OS == 'ios' ? 'Roboto-Regular' : "Roboto-Regular";
export const RobotoLight = Platform.OS == 'ios' ? 'Roboto-Light' : "Roboto-Light";
export const RobotoBold = Platform.OS == 'ios' ? 'Roboto-Bold' : "Roboto-Bold";

export {PoppinsBlack, PoppinsRegular, PoppinsSemiBold, BalooRegular}
