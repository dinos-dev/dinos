import Geolocation from 'react-native-geolocation-service'
import { useEffect, useRef, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import MapView, { Callout, LatLng, MapPressEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapBottomSheet from '../../components/modal/MapBottomSheet'

function MapScreen() {
  const mapRef = useRef<MapView | null>(null)
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.571389,
    longitude: 126.977778,
  })
  const [selectedLocation, setSelectedLoctaion] = useState<LatLng | null>()
  const [noteOpen, setNoteOpen] = useState<boolean>(false)
  const bottomSheetRef = useRef(null)

  useEffect(() => {
    //내 위치 구하고 지도를 내 위치로 이동
    Geolocation.getCurrentPosition(
      (info) => {
        console.log(info)
        const { latitude, longitude } = info.coords
        setUserLocation({ latitude, longitude })
        MoveToCurrentLocation(latitude, longitude)
      },
      (err) => {
        console.log(err)
      },
      {
        enableHighAccuracy: true,
      },
    )
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

  return (
    <View style={styles.container}>
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
          //이미 저장된 마커를 클릭했을 경우를 제외하는 코드 필요
          console.log(nativeEvent.coordinate)
          setSelectedLoctaion(nativeEvent.coordinate)
        }}
      >
        {selectedLocation && (
          <Callout>
            <Marker
              draggable
              coordinate={selectedLocation}
              title="선택위치"
              description="지도를 클릭해 선택한 위치"
              onPress={() => Alert.alert('마커 클릭')}
            >
              <View style={styles.markerContainer}>
                <View style={[styles.marker, { backgroundColor: 'deeppink' }]}></View>
              </View>
            </Marker>
          </Callout>
        )}

        <Marker
          draggable
          coordinate={{ latitude: 37.561389, longitude: 126.977778 }}
          title="마커"
          description="리스트 1에 저장된 위치"
        />
      </MapView>

      <View style={styles.buttonBox}>
        <Pressable style={styles.mylocation} onPress={() => setNoteOpen(true)}>
          <Text style={styles.icon}>📝</Text>
        </Pressable>
        <Pressable
          style={styles.mylocation}
          onPress={() => MoveToCurrentLocation(userLocation.latitude, userLocation.longitude)}
        >
          <Text style={styles.icon}>🌐</Text>
        </Pressable>
      </View>

      <MapBottomSheet noteOpen={noteOpen} setNoteOpen={setNoteOpen} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonBox: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    bottom: 20,
    flex: 1,
    width: '20%',
  },
  mylocation: {
    flex: 0.1,
    padding: 10,
    backgroundColor: 'pink',
    borderRadius: 50,
  },
  icon: {
    fontSize: 30,
  },
  markerContainer: {
    height: 35,
    width: 32,
    alignItems: 'center',
  },
  marker: {
    width: 27,
    height: 27,
    borderRadius: 27,
  },
})

export default MapScreen
