import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

export const swalConfirm = (title, text, type, cb) => {
  Swal.fire({
    title: title,
    text: text,
    icon: type,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes',
  }).then((result) => {
    if (result.value) {
      return cb()
    }
  })
}
