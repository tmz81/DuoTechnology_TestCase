import { Dialog, Portal, Button } from "react-native-paper";

export const ConfirmDialog = ({ visible, title, message, onConfirm, onCancel }) => (
  <Portal>
    <Dialog visible={visible} onDismiss={onCancel}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <Text>{message}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onCancel}>Cancelar</Button>
        <Button onPress={onConfirm}>Confirmar</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);
