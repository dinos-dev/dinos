import { useEffect, useState } from 'react'
import { Image, Modal, Pressable, StyleSheet, View, Text } from 'react-native'
import Config from 'react-native-config'
import { ExtendedGooglePlaceDetail } from '../../types/map'

type MapBottomSheetPropsType = {
  modalDetails?: ExtendedGooglePlaceDetail
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// 장소 사진 URL 생성 함수
const getPlacePhotoUrl = (photoReference: string): string => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${Config.MAPS_PLACES_API_KEY}`
}

function MapBottomSheet({ modalDetails, modalOpen, setModalOpen }: MapBottomSheetPropsType) {
  const [placeDetails, setPlaceDetails] = useState<string[]>()

  useEffect(() => {
    console.log('modalDetails', modalDetails)
    const photoUrls = modalDetails?.photos?.map((photo) => getPlacePhotoUrl(photo.photo_reference)) || []
    setPlaceDetails(photoUrls)
  }, [modalDetails])

  return (
    <Modal
      style={styles.modal}
      animationType="slide"
      transparent={true}
      visible={modalOpen}
      onRequestClose={() => setModalOpen(false)}
    >
      <Pressable style={styles.modalOutside} onPress={() => setModalOpen(false)} />
      <View style={styles.modalView}>
        <View style={styles.modalCloseBox}>
          <Pressable style={styles.closeButton} onPress={() => setModalOpen(false)}>
            <Text style={styles.closeText}>X</Text>
          </Pressable>
        </View>
        <View style={styles.modalContent}>
          <View style={styles.infoSection}>
            <Text style={styles.title}>{modalDetails?.name}</Text>
            <Text style={styles.note} numberOfLines={4} ellipsizeMode="tail">
              {modalDetails?.formatted_address}
            </Text>
          </View>
          {placeDetails && placeDetails.length > 0 && <Image source={{ uri: placeDetails[0] }} style={styles.image} />}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#00000027',
  },
  modalOutside: {
    flex: 2,
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'orange',
  },
  modalCloseBox: {
    flex: 1,
    backgroundColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    flex: 0.2,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 30,
  },
  modalContent: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
  },
  infoSection: {
    flex: 4,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'green',
  },
  note: {
    marginTop: 10,
    flex: 1,
  },
  image: {
    flex: 2,
    aspectRatio: '1/1',
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 10,
    objectFit: 'contain',
    justifyContent: 'center',
  },
})
export default MapBottomSheet
