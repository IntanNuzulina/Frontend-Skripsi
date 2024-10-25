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

const SwalConfirm = ({
  title = "Are you sure?",
  text = "You won't be able to revert this!",
  icon = "warning",
  showCancelButton = true,
  confirmButtonColor = "#3085d6",
  cancelButtonColor = "#d33",
  confirmButtonText = "Yes, delete it!",
}) =>
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });

export { SwalTopEnd, SwalConfirm };
