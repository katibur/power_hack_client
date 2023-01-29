import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Modal = ({ bill, setShowEditBill }) => {
  const { _id, name, email, phone, amount } = bill;

  const navigate = useNavigate();

  const updateBill = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const amount = form.amount.value;
    const updateData = {
      name,
      email,
      phone,
      amount,
    };
    console.log(updateData);
    fetch(`http://localhost:5000/update-billing?id=${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Bill is updated,Please refresh The page");
          setShowEditBill(null);
          navigate("/billing-list", { replace: true });
        }
      })
      .catch((error) => {
        if (error) {
          toast.error("Error");
        }
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <div
        className="absolute top-20 bg-cyan-700 left-1/2 card md:w-[35%] w-[80%] p-5 rounded 
        -translate-x-1/2 text-white"
      >
        <form action="" className="rounded  relative" onSubmit={updateBill}>
          <div className="form-control">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="p-2 bg-[#0e0d0d87] w-full rounded mt-12"
              defaultValue={name}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="p-2 bg-[#0e0d0d87] w-full mt-3 rounded"
              defaultValue={email}
            />
          </div>
          <div className="form-control">
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              className="p-2 bg-[#0e0d0d87] w-full mt-3 rounded"
              defaultValue={phone}
            />
          </div>
          <div className="form-control">
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="p-2 bg-[#0e0d0d87] w-full mt-3 rounded"
              defaultValue={amount}
            />
          </div>
          <div className="form-control ">
            <input
              type="submit"
              value="Update"
              className="mt-5 flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-cyan-400 text-gray-900"
            />
          </div>
          <div className="absolute -top-4 -right-4 flex justify-center w-16 p-3 font-semibold tracking-wide rounded-md bg-cyan-400 text-gray-900">
            <button
              className="text-xl cursor-pointer"
              onClick={() => setShowEditBill()}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
