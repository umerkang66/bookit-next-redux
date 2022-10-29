import { type FC, useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Head from 'next/head';
import Image from 'next/image';
import { Carousel } from 'react-bootstrap';
import RoomFeatures from './room-features';
import axios from 'axios';

const RoomDetails: FC = () => {
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [daysOfStay, setDaysOfStay] = useState(1);

  const roomState = useTypedSelector(state => state.room);
  const currentuserState = useTypedSelector(state => state.currentuser);

  const { error: roomError, room } = roomState;
  const { error, user } = currentuserState;

  const dateOnChange = (date: [Date | null, Date | null]) => {
    const [checkInDate, checkOutDate] = date;

    setCheckInDate(checkInDate as Date);
    setCheckOutDate(checkOutDate as Date);

    if (checkInDate || checkOutDate) {
      setDaysOfStay(1);
    }

    if (checkInDate && checkOutDate) {
      const oneDayMilliseconds = 24 * 60 * 60 * 1000;
      // these are milliseconds, divide by milliseconds of 1 day to get the days
      const days = Math.floor(
        (checkOutDate.getTime() - checkInDate.getTime()) / oneDayMilliseconds +
          1
      );
      setDaysOfStay(days);
    }
  };

  const newBookingHandler = async () => {
    if (room && user) {
      const bookingData = {
        room: room._id,
        user: user._id,
        checkInDate,
        checkOutDate,
        amountPaid: 90,
        paymentInfo: {
          id: 'STRIPE_PAYMENT_ID',
          status: 'STRIPE_PAYMENT_STATUS',
        },
        paidAt: Date.now(),
        daysOfStay,
      };

      try {
        const { data } = await axios.post('/api/bookings', bookingData);
        console.log(data);
      } catch (err: any) {
        toast.error('🚀🚀', err.response.data.message);
      }
    } else {
      // user is not logged in
      toast.error('Please login to perform this action');
    }
  };

  useEffect(() => {
    if (roomError) toast.error(roomError);
  }, [roomError, toast]);

  if (roomError) {
    return (
      <div>
        <Head>
          <title>Room Not found</title>
        </Head>
      </div>
    );
  }

  return (
    <div>
      {room && (
        <div className="container container-fluid">
          <Head>
            <title>{room.name}</title>
          </Head>
          <h2 className="mt-5">{room.name}</h2>
          <p>{room.address}</p>

          <div className="ratings mt-auto mb-3">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(room.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({room.reviews.length} Reviews)</span>
          </div>

          <div>
            <Carousel pause="hover">
              {room.images &&
                room.images.length &&
                room.images.map((image, i) => {
                  return (
                    <Carousel.Item key={i}>
                      <div style={{ width: '100%', height: '440px' }}>
                        <Image
                          className="d-block m-auto"
                          src={image.url}
                          alt={room.name}
                          layout="fill"
                        />
                      </div>
                    </Carousel.Item>
                  );
                })}
            </Carousel>
          </div>

          <div className="row my-5">
            <div className="col-12 col-md-6 col-lg-8">
              <h3>Description</h3>
              <p>{room.description}</p>

              <RoomFeatures room={room} />
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="booking-card shadow-lg p-4">
                <p className="price-per-night">
                  <b>${room.price}</b> / night
                </p>

                <hr />

                <p className="mt-5 mb-3">Pick Check In and Check Out Date</p>

                <DatePicker
                  className="w-100"
                  selected={checkInDate}
                  onChange={dateOnChange}
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  selectsRange
                  inline
                />

                <button
                  onClick={newBookingHandler}
                  className="btn btn-block py-3 booking-btn"
                >
                  Pay
                </button>
              </div>
            </div>
          </div>

          <div className="reviews w-75">
            <h3>Reviews:</h3>
            <hr />
            <div className="review-card my-3">
              <div className="rating-outer">
                <div className="rating-inner"></div>
              </div>
              <p className="review_user">by John</p>
              <p className="review_comment">Good Quality</p>

              <hr />
            </div>

            <div className="review-card my-3">
              <div className="rating-outer">
                <div className="rating-inner"></div>
              </div>
              <p className="review_user">by John</p>
              <p className="review_comment">Good Quality</p>

              <hr />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
