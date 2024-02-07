import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function PaymentCompleted() {


  /*

http://localhost:3000/confirm?
id=161323963&pending=false&amount_cents=220&
success=true&is_auth=false&is_capture=false&is_standalone_payment=
true&is_voided=false&is_refunded=false&is_3d_secure=true&integration_id=
4436733&profile_id=952935&has_parent_transaction=false&order=183548249
&created_at=2024-02-05T14%3A31%3A27.707426&currency=EGP&merchant_commission=
0&discount_details=%5B%5D&is_void=false&is_refund=false&error_occured=false&refunded_amount_cents=0
&captured_amount=0&updated_at=2024-02-05T14%3A31%3A54.082045&is_settled=false&bill_balanced=false&is_bill=
false&owner=1737996&data.message=Approved&source_data.type=card&source_data.pan=2346&source_data.sub_type=
MasterCard&acq_response_code=00&txn_response_code=APPROVED&hmac=
284c3e31b552455903abac005355538b4f0ec290b04f9ec271afa5de18771f72d61e34ab5361a48ac0a1e0b56950796caf9e5314359772dc1e4be8b6552df9c4

*/


  return (
    <div className="">
      <div className="layout"></div>

      <div className=" row  d-flex justify-content-center     text-end">

        <div className="boxInFor col-md-4   pb-3  bg-body text-center px-4 pt-5 rounded-2 shadow ">
          <i
            className="fa fa-check-circle colorDef fa-3x"
            aria-hidden="true"
          ></i>
          <p className="m-0 fs-4 "> تم الدفـع بنـجـاح </p>
          <p className="colorTr fontSmall">
            شكرا لك على دفعتك. سيتم إرسال إيصال دفع آلي إلى بريدك الإلكتروني
            المسجل
          </p>
          <button
            className="px-4  mainButton rounded-2 py-1   mb-2 text-center w-100 "
            type="submit"
          >
            {" "}
            ابدا الأن{" "}
          </button>
        </div>

      </div>
    </div>
  );
}
