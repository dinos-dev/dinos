import { Image, Modal, Pressable, StyleSheet, View, Text } from 'react-native'

type MapBottomSheetPropsType = {
  noteOpen: boolean
  setNoteOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function MapBottomSheet({ noteOpen, setNoteOpen }: MapBottomSheetPropsType) {
  return (
    <Modal
      style={styles.modal}
      animationType="slide"
      transparent={true}
      visible={noteOpen}
      onRequestClose={() => setNoteOpen(false)}
    >
      <Pressable style={styles.modalOutside} onPress={() => setNoteOpen(false)} />
      <View style={styles.modalView}>
        <View style={styles.modalCloseBox}>
          <Pressable style={styles.closeButton} onPress={() => setNoteOpen(false)}>
            <Text style={styles.closeText}>X</Text>
          </Pressable>
        </View>
        <View style={styles.modalContent}>
          <View style={styles.infoSection}>
            <Text style={styles.title}>다이노스 피자</Text>
            <Text style={styles.note} numberOfLines={4} ellipsizeMode="tail">
              헌법재판소 재판관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다. 헌법재판소에서
              법률의 위헌결정, 탄핵의 결정, 정당해산의 결정 또는 헌법소원에 관한 인용결정을 할 때에는 재판관 6인 이상의
              찬성이 있어야 한다. 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다.
            </Text>
          </View>
          <Image style={styles.image} src="https://cdn.imweb.me/thumbnail/20230208/ce2392523295d.png" />
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
