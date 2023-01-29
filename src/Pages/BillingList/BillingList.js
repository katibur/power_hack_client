import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "../Shared/Modal/Modal";

const BillingList = () => {
  const [showModal, setShowModal] = React.useState(false);

  const [showEditBill, setShowEditBill] = useState(null);

  const [paidAmount, setPaidAmount] = useState(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const handleAddBill = (data) => {
    const bill = {
      name: data.FullName,
      email: data.email,
      phone: data.phone,
      amount: data.amount,
    };
    console.log(bill);
    fetch("http://localhost:5000/add-billing", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(bill),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(parseFloat(bill.amount));
        toast.success("Bill added successfully");
        setPaidAmount(parseInt(paidAmount) + parseInt(bill.amount));

        if (data.acknowledged === true) {
          navigate("/billing-list", { replace: true });
        }
      });
  };

  const url = `http://localhost:5000/billing-list`;

  const {
    data: billingLists = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["billingLists"],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto my-10">
        <p>Something Went Wrong</p>
      </div>
    );
  }

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/delete-billing/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          toast.success("Deleted successfully");
          refetch();
        }
      });
  };

  const editBill = (Bill) => {
    console.log(Bill);
    setShowEditBill(Bill);
  };

  return (
    <>
      {
        <p className="text-black text-2xl -mt-12 text-center">
          Paid Amount: {paidAmount}
        </p>
      }
      <div className="flex justify-between w-full mx-auto bg-slate-400 px-5 py-2 m-5">
        <div>
          <fieldset className="w-full space-y-1 text-gray-100">
            <label htmlFor="Search" className="hidden">
              Search
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="button"
                  title="search"
                  className="p-1 focus:outline-none focus:ring"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 text-gray-100"
                  >
                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                name="Search"
                placeholder="Search..."
                className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-800 text-gray-100 focus:bg-gray-900 focus:border-cyan-400"
              />
            </div>
          </fieldset>
        </div>
        <div>
          <button
            className="bg-blue-400 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Add New Bill
          </button>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit(handleAddBill)}>
                    <div className="block mt-4">
                      <div>
                        <label htmlFor="FullName" className="block">
                          Full Name
                        </label>
                        <input
                          {...register("FullName", {
                            required: "FullName Is Required",
                          })}
                          type="text"
                          name="FullName"
                          id="FullName"
                          className="w-full px-4 py-3 rounded-md border-2 border-gray-300  text-black focus:border-violet-300"
                        />
                      </div>
                      {errors.FullName && (
                        <p className="text-red-600">
                          {errors.FullName?.message}
                        </p>
                      )}

                      <div>
                        <label htmlFor="email" className="block">
                          Email
                        </label>
                        <input
                          {...register("email", {
                            required: "email Is Required",
                          })}
                          type="email"
                          name="email"
                          id="email"
                          defaultValue=""
                          className="w-full px-4 py-3 rounded-md border-2 border-gray-300  text-black focus:border-violet-300"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-600">{errors.email?.message}</p>
                      )}
                      <div>
                        <label htmlFor="phone" className="block">
                          Phone
                        </label>
                        <input
                          {...register("phone", {
                            maxLength: 11,
                            required: "Phone Number Is Required",
                          })}
                          type="number"
                          name="phone"
                          id="phone"
                          defaultValue=""
                          className="w-full px-4 py-3  rounded-md border-2 border-gray-300  text-black focus:border-violet-300"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-600">{errors.phone?.message}</p>
                      )}

                      <div>
                        <label htmlFor="amount" className="block">
                          Payable Amount
                        </label>
                        <input
                          {...register("amount", {
                            required: "Amount Is Required",
                          })}
                          type="number"
                          name="amount"
                          id="amount"
                          defaultValue=""
                          className="w-full px-4 py-3  rounded-md border-2 border-gray-300  text-black focus:border-violet-300"
                        />
                      </div>
                      {errors.amount && (
                        <p className="text-red-600">{errors.amount?.message}</p>
                      )}
                      <input
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 my-5 mx-auto flex justify-center"
                        type="submit"
                        value="Add Bill"
                      />
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {billingLists && billingLists ? (
        <div>
          <div className="overflow-x-auto ">
            <table className="table w-full p-6 text-xs text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-gray-700 ">
                  <th className="border border-gray-700 text-center">
                    Billing Id
                  </th>
                  <th className="border border-gray-700 text-center">
                    Full Name
                  </th>
                  <th className="border border-gray-700 text-center">Email</th>
                  <th className="border border-gray-700 text-center">Phone</th>
                  <th className="border border-gray-700 text-center">
                    Paid Amount
                  </th>
                  <th className="border border-gray-700 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {billingLists &&
                  billingLists?.map((bill) => (
                    <tr key={bill._id} className="border-b border-gray-700">
                      <td className="border border-gray-700 text-center">
                        {bill._id}
                      </td>
                      <td className="border border-gray-700 text-center">
                        {bill.name}
                      </td>
                      <td className="border border-gray-700 text-center">
                        {bill.email}
                      </td>
                      <td className="border border-gray-700 text-center">
                        {bill.phone}
                      </td>
                      <td className="border border-gray-700 text-center">
                        {bill.amount}
                      </td>
                      <td className="border border-gray-700 text-center">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                          onClick={() => editBill(bill)}
                        >
                          Edit
                        </button>
                        {showEditBill && (
                          <Modal
                            bill={showEditBill}
                            setShowEditBill={setShowEditBill}
                          />
                        )}
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                          onClick={() => handleDelete(bill._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h1 className="text-3xl font-bold text-center">No Bill Items.</h1>
      )}
    </>
  );
};

export default BillingList;
