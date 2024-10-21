import Swal from "sweetalert2";

const SwalTopEnd = ({
  title = "Berhasil",
  icon = "success",
  text = "Berhasil",
}) => {
  return Swal.fire({
    title,
    position: "top-end",
    text,
    icon,
    toast: true,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
};

const SwalConfirm = () => {
  return;
};

export { SwalTopEnd };
