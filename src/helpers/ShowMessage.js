import { useSnackbar } from "notistack";

const MessageSuccess = (message) => {
  const { enqueueSnackbar } = useSnackbar();

  enqueueSnackbar(message, {
    variant: "success",
    preventDuplicate: true,
  });
};

const MessageError = (message) => {
  const { enqueueSnackbar } = useSnackbar();

  enqueueSnackbar(message, {
    variant: "error",
    preventDuplicate: true,
  });
};

export { MessageSuccess, MessageError };
