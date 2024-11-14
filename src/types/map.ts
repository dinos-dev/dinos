import { GooglePlaceDetail } from "react-native-google-places-autocomplete";

export interface ExtendedGooglePlaceDetail extends GooglePlaceDetail {
    photos?: { photo_reference: string }[]
}
  