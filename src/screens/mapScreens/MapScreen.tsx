import Geolocation from 'react-native-geolocation-service'
import { useEffect, useRef, useState } from 'react'
import { Platform, Pressable, StyleSheet, View } from 'react-native'
import MapView, { Callout, LatLng, MapMarker, MapPressEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapBottomSheet from '../../components/modal/MapBottomSheet'
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete'
import 'react-native-get-random-values'
import Config from 'react-native-config'
import { ExtendedGooglePlaceDetail } from '../../types/map'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ChefDinoMarkerIcon, DinoMarkerIcon, GpsIcon } from '../../assets/icons/mapStackIcon'
import { COLORS } from '../../constants/variables'
import { usePermission } from '../../hooks/usePermission'
import { androidPermissions } from '../../constants/permissions'
import PermissionBackground from '../../components/modal/PermissionBackGround'

// 장소 사진 URL 생성 함수
const getPlacePhotoUrl = (photoReference: string): string => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${Config.MAPS_PLACES_API_KEY}`
}

function MapScreen() {
  const mapRef = useRef<MapView | null>(null)
  const markerRef = useRef<MapMarker | null>(null)
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.571389,
    longitude: 126.977778,
  })
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalDetails, setModalDetails] = useState<ExtendedGooglePlaceDetail>()
  const googlePlacesAutocompleteRef = useRef<GooglePlacesAutocompleteRef>(null)
  const inset = useSafeAreaInsets()

  const { getPermission, check, permissionOpen, permissionDescription } = usePermission()

  useEffect(() => {
    const requestPermission = async () => {
      const status = await getPermission({ permissionType: 'location' })
      const androidAlterStatus = Platform.OS === 'android' ? await check(androidPermissions.coarseLocation) : false
      if (!status && !androidAlterStatus) return
    }
    const getLocation = () => {
      Geolocation.getCurrentPosition(
        (info) => {
          const { latitude, longitude } = info.coords
          setUserLocation({ latitude, longitude })
          if (mapRef.current) {
            MoveToCurrentLocation(latitude, longitude)
          }
        },
        (err) => console.log(err),
        {
          enableHighAccuracy: true,
        },
      )
    }
    requestPermission().then(() => {
      if (mapRef.current) return getLocation()
    })
  }, [])

  const MoveToCurrentLocation = (latitude: number, longitude: number) => {
    mapRef.current?.animateCamera(
      {
        center: {
          latitude: latitude,
          longitude: longitude,
        },
        zoom: 16,
      },
      { duration: 800 },
    )
  }

  const autoCompleteHandler = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
    if (details) {
      // console.log('data:', data)
      const extendedDetails = details as ExtendedGooglePlaceDetail
      // console.log('extendedDetails:', extendedDetails)

      const { lat, lng } = extendedDetails.geometry.location
      const newLocation = { latitude: lat, longitude: lng }
      setSelectedLocation(newLocation)
      MoveToCurrentLocation(lat, lng)

      googlePlacesAutocompleteRef.current?.setAddressText('') // 검색창 초기화
      setModalOpen(true)
      setModalDetails(extendedDetails)
    } else {
      console.log('Details not available')
    }
  }

  if (permissionOpen) return <PermissionBackground description={permissionDescription} />

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        ref={googlePlacesAutocompleteRef}
        minLength={2}
        placeholder="검색어 입력"
        query={{
          key: `${Config.MAPS_PLACES_API_KEY}`,
          language: 'ko',
          components: 'country:kr',
        }}
        keyboardShouldPersistTaps="handled"
        fetchDetails={true}
        onPress={(data: GooglePlaceData, details: GooglePlaceDetail | null) => autoCompleteHandler(data, details)}
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log('no results')}
        keepResultsAfterBlur={true}
        enablePoweredByContainer={false}
        styles={{
          container: [styles.searchContainer, { top: inset.top || 20 }],
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          listView: styles.listView,
        }}
      />
      <MapView
        ref={mapRef}
        style={styles.map}
        loadingEnabled
        showsMyLocationButton={false}
        showsUserLocation
        followsUserLocation
        provider={PROVIDER_GOOGLE}
        initialCamera={{
          center: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
          pitch: 0,
          heading: 0,
          altitude: 1000,
          zoom: 15,
        }}
        onPress={({ nativeEvent }: MapPressEvent) => {
          setSelectedLocation(nativeEvent.coordinate)
        }}
        googleRenderer="LEGACY"
      >
        {selectedLocation && (
          <Callout>
            <Marker
              ref={markerRef}
              coordinate={selectedLocation}
              title="선택위치"
              description="지도를 클릭해 선택한 위치"
              tracksViewChanges={false} //안드로이드 마커 깜빡임 방지-마커표시안됨
              tracksInfoWindowChanges={false}
              onLayout={() => markerRef.current?.redraw()}
            >
              <ChefDinoMarkerIcon fill={COLORS.dinosRed} />
            </Marker>
          </Callout>
        )}

        <Marker
          coordinate={{ latitude: 37.561389, longitude: 126.977778 }}
          title={'리스트 1에 저장된 마커 이름'}
          description={'리스트 1에 저장된 위치'}
        >
          <DinoMarkerIcon fill={'#FFC540'} />
        </Marker>
        <Marker
          coordinate={{ latitude: 37.563389, longitude: 126.97764 }}
          title={'리스트 1에 저장된 마커 이름'}
          description={'리스트 1에 저장된 위치'}
        >
          <DinoMarkerIcon fill={'#6768FC'} />
        </Marker>
      </MapView>

      <View style={styles.buttonBox}>
        <Pressable
          style={styles.sideButton}
          onPress={() => MoveToCurrentLocation(userLocation.latitude, userLocation.longitude)}
        >
          <GpsIcon />
        </Pressable>
      </View>

      <MapBottomSheet modalDetails={modalDetails} modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    width: '90%',
    alignSelf: 'center',
    zIndex: 100,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    elevation: 5, // 그림자 효과
  },
  textInput: {
    fontSize: 16,
    height: 40,
  },
  listView: {
    position: 'absolute',
    top: 60, // 검색창 아래에 목록이 나타나도록 설정
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    zIndex: 100,
  },
  buttonBox: {
    position: 'absolute',
    right: 20,
    flexDirection: 'column',
    alignItems: 'center',
    bottom: 20,
    flex: 1,
    gap: 20,
    width: '20%',
  },
  sideButton: {
    padding: 10,
    backgroundColor: COLORS.white,
    boxShadow: '0 1 4 0 rgba(0, 0, 0, 0.25)',
    elevation: 4,
    borderRadius: 50,
  },
})

export default MapScreen
