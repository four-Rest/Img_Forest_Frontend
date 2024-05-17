import TossPaymentModal from '../../components/modal/TossPaymentModal';
import MypageLayout from './MypageLayout';

const MyPoint = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <MypageLayout />
      <div className="flex h-full w-full justify-center"> 내 포인트 : 0 </div>
      <TossPaymentModal />
    </div>
  );
};
export default MyPoint;
