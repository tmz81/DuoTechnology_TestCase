import { useState } from "react";
import { Snackbar } from "react-native-paper";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export function useConfirmDelete(entityName = "item") {
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState("");
  const [onDelete, setOnDelete] = useState(() => async () => {});
  const [onSuccess, setOnSuccess] = useState(() => () => {});

  const confirmDelete = (id, deleteFunc, onSuccessCallback) => {
    setSelectedId(id);
    setOnDelete(() => deleteFunc);
    setOnSuccess(() => onSuccessCallback);
    setVisible(true);
  };

  const handleConfirm = async () => {
    try {
      await onDelete(selectedId);
      setMessage(
        `${
          entityName.charAt(0).toUpperCase() + entityName.slice(1)
        } excluído com sucesso.`
      );
      onSuccess();
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || "Erro ao excluir.";
      setMessage(msg);
    } finally {
      setVisible(false);
      setSelectedId(null);
    }
  };

  const ModalAndSnackbar = () => (
    <>
      <ConfirmDeleteModal
        visible={visible}
        onDismiss={() => setVisible(false)}
        onConfirm={handleConfirm}
        entityName={entityName}
      />
      <Snackbar
        visible={!!message}
        onDismiss={() => setMessage("")}
        duration={3000}
      >
        {message}
      </Snackbar>
    </>
  );

  return { confirmDelete, ModalAndSnackbar };
}
