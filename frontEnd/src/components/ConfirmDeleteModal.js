import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text, Button } from "react-native-paper";

/**
 * Modal reutilizável para confirmação de exclusão.
 *
 * @param {Object} props
 * @param {boolean} props.visible - Se o modal está visível.
 * @param {function} props.onDismiss - Função chamada ao fechar o modal.
 * @param {function} props.onConfirm - Função chamada ao confirmar a exclusão.
 * @param {string} props.entityName - Nome da entidade (ex: "veículo").
 * @returns {JSX.Element}
 */
export default function ConfirmDeleteModal({
  visible,
  onDismiss,
  onConfirm,
  entityName = "item",
}) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Confirmar exclusão</Text>
        <Text style={styles.text}>
          Tem certeza que deseja excluir {entityName}?
        </Text>
        <View style={styles.buttons}>
          <Button mode="text" onPress={onDismiss}>
            Cancelar
          </Button>
          <Button mode="contained" buttonColor="#d32f2f" onPress={onConfirm}>
            Excluir
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 24,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
});
