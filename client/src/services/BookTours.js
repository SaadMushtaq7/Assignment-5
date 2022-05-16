import axios from "axios";

export const bookTour = async (
  name,
  email,
  phoneNo,
  numOfAdults,
  numOfChilds,
  paymentMethod,
  tourId
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
      console.log("Tour Booked ", res);
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
  name,
  email,
  phoneNo,
  numOfAdults,
  numOfChilds,
  paymentMethod,
  tourId,
  bookedTourId
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

export const deleteMyTour = async (bookedTourId) => {
  await axios
    .delete(`http://localhost:3001/deleteTour/${bookedTourId}`)
    .then((res) => {
      console.log("Tour Deleted ", res);
    })
    .catch((err) => {
      console.log(`Error Deleting Tour: ${err}`);
    });
};
