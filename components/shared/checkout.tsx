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
  const priceNumber = parseInt(event.price)
  const firstname = event.organizer.firstName
  const lastname = event.organizer.lastName
  const UserId = userId
  const desc = event.description

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
         console.log(typeof(orders))
        },
      });

    

  return (
    <>
       
        <Button  size="lg"className="sm:w-fit button"onClick={() =>
        initPayment({
          key:"QzAwMDAyNzEyNTl8MTEwNjE4NjF8OWZjOWYwNmMyZDk3MDRhYWM3YThiOThlNTNjZTE3ZjYxOTY5NDdmZWE1YzU3NDc0ZjE2ZDZjNTg1YWYxNWY3NWM4ZjMzNzZhNjNhZWZlOWQwNmJhNTFkMjIxYTRiMjYzZDkzNGQ3NTUxNDIxYWNlOGY4ZWEyODY3ZjlhNGUwYTY",
          transactionId: String(Math.floor(Math.random() * 1101233)),
          amount:priceNumber,
          customerId:UserId,
          narration:"fffnf",
          email: "ikechison06@gmail.com",
          firstName:firstname,
          lastName:lastname
        })
      } >{event.isFree ? "Get Ticket" : "Buy Ticket"}</Button>
    </>
  )
}

export default Checkout