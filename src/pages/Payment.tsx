import axios from 'axios';
import { useEffect } from 'react';


const Payment = () => {
    useEffect(() => {

        const jquery = document.createElement("script");
        jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);

        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        };

    }, []);



    // 포트원 개발자 사이트 v1버전. 
    const requestPay = () => {
        const { IMP }: any = window;
        IMP.init('imp54562367');

        IMP.request_pay({
            pg: 'kakaopay.TC0ONETIME',
            pay_method: 'card',
            merchant_uid: new Date().getTime(),
            name: '테스트 상품',
            amount: 2000,
            buyer_name: '찬홍',
            buyer_tel:'010-9896-4220',

        }, async(rsp: any) => {
        try{
            const{ data }  = await axios.post('http://localhost:8090/api/payment/validation/' + rsp.imp_uid);

                    
            if(rsp.paid_amount === data.response.amount) {
                alert('결제 성공');
            }else {
                alert('결제 실패');
                }
        }catch(error) {
            console.error('Error while verifying payment' , error);
            alert('결제 실패');
            }
        });
    };

    return (
        <div>
            <button className = "pt-56" onClick = {requestPay}>결제하기</button>
        </div>
    );
};

export default Payment;