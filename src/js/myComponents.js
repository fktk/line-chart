import { Toast } from 'bootstrap';

export const showToast = text => {
  const toastContainer = document.getElementById('toast-container');
  const option = {
    animation: true,
    autohide: true,
    delay: 3000,
  };
  const toast = document.createElement('div');
  const toastBody = document.createElement('div');
  const toastButton = document.createElement('button');
  toast.className = "toast d-flex align-items-center bg-secondary";
  toastBody.className = "toast-body text-white";
  toastBody.textContent = text;
  toastButton.className = "btn-close ms-auto me-3";
  toastButton.setAttribute('data-bs-dismiss', 'toast');
  toast.appendChild(toastBody);
  toast.appendChild(toastButton);
  toastContainer.appendChild(toast);

  const toastClass = new Toast(toast, option)
  toastClass.show()
  setTimeout(() => {
    toastContainer.removeChild(toast);
  }, 3000);

}

