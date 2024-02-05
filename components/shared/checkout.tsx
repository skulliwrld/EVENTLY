import { IEvent } from '@/models/event.model'
import { useRemitaInline } from "@farayolaj/react-remita-inline";
import React from 'react'
import { Button } from '../ui/button'
import { createOrder } from '@/lib/actions/order.action';


type CheckOutProp={
    userId:string,
    event:IEvent
}
function  Checkout({userId, event}:CheckOutProp) {
    const { initPayment } = useRemitaInline({
        isLive: false,
        onClose() {
          console.log("Remita closed");
        },
        onError(response) {
          console.log("Remita Error: ", response);
        },
        async onSuccess(orders) {
          // await createOrder({
          //   ...orders,eventId:event._id,
         // })
         console.log(orders)
        },
      });

    

  return (
    <>
       
        <button className="sm:w-fit button"onClick={() =>
        initPayment({
          key:"QzAwMDAyNzEyNTl8MTEwNjE4NjF8OWZjOWYwNmMyZDk3MDRhYWM3YThiOThlNTNjZTE3ZjYxOTY5NDdmZWE1YzU3NDc0ZjE2ZDZjNTg1YWYxNWY3NWM4ZjMzNzZhNjNhZWZlOWQwNmJhNTFkMjIxYTRiMjYzZDkzNGQ3NTUxNDIxYWNlOGY4ZWEyODY3ZjlhNGUwYTY",
          transactionId: String(Math.floor(Math.random() * 1101233)),
          amount:`${event.price}`,
          customerId: "johndoe@gmail.com",
          narration: "Payment for groceries.",
          email: "johndoe@gmail.com",
          firstName: "John",
          lastName: "Doe",
        })
      } >{event.isFree ? "Get Ticket" : "Buy Ticket"}</button>
    </>
  )
}

export default Checkout