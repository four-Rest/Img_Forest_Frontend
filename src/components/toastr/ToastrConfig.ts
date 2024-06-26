import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

// toastr 기본 설정을 초기화하는 함수
const initializeToastr = () => {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: undefined,
    showDuration: 300,
    hideDuration: 1000,
    timeOut: 5000,
    extendedTimeOut: 1000,
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  };
};


const parseMsg = (msg: string) => {
  return msg.split(";ttl=");
};

const toastWarning = (msg: string) => {
  const [_msg, ttl] = parseMsg(msg);
  if (ttl && parseInt(ttl) < new Date().getTime()) return;
  toastr.warning(_msg, "경고");
};

const toastNotice = (msg: string) => {
  const [_msg, ttl] = parseMsg(msg);
  if (ttl && parseInt(ttl) < new Date().getTime()) return;
  toastr.success(_msg, "알림");
};

// toastr 설정을 초기화
initializeToastr();

export { toastNotice, toastWarning };

