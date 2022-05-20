import axios from "axios";

export const bookTour = async (
  name: string,
  email: string,
  phoneNo: string,
  numOfAdults: string,
  numOfChilds: string,
  paymentMethod: string,
  tourId:string
) => {
  await axios
    .post("http://localhost:3001/bookMyTour", {
      name,
      email,
      phoneNo,
      numOfAdults,
      numOfChilds,
      paymentMethod,
      tourId,
    })
    .then((res) => {
      console.log("Tour Booked");
      
    })
    .catch((err) => {
      console.log(`Error Booking Tour: ${err}`);
    });
};

export const getMyTours = async () => {
  const res = await axios
    .get("http://localhost:3001/getMyTours")
    .then(async (response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return res;
};

export const updateMyTour = async (
  name: string,
  email: string,
  phoneNo: string,
  numOfAdults: string,
  numOfChilds: string,
  paymentMethod: string,
  tourId: string,
  bookedTourId: string
) => {
  await axios
    .put(`http://localhost:3001/updateTour/${bookedTourId}`, {
      name,
      email,
      phoneNo,
      numOfAdults,
      numOfChilds,
      paymentMethod,
      tourId,
    })
    .then((res) => {
      console.log("Tour Updated ", res);
    })
    .catch((err) => {
      console.log(`Error Updating Tour: ${err}`);
    });
};

export const deleteMyTour = async (bookedTourId: string) => {
  await axios
    .delete(`http://localhost:3001/deleteTour/${bookedTourId}`)
    .then((res) => {
      console.log("Tour Deleted ");
    })
    .catch((err) => {
      console.log(`Error Deleting Tour: ${err}`);
    });
};
