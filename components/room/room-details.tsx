import { type FC, useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CreateReview from '../review/create-review';
import Head from 'next/head';
import Image from 'next/image';
import { Carousel } from 'react-bootstrap';
import RoomFeatures from './room-features';
import axios from 'axios';
import { useActions } from '../../hooks/use-actions';
import { getStripe } from '../../utils/get-stripe';
import ListReviews from '../review/list-reviews';
import ButtonLoader from '../layout/button-loader';

const RoomDetails: FC = () => {
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [daysOfStay, setDaysOfStay] = useState(1);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const actions = useActions();

  const roomState = useTypedSelector(state => state.room);
  const currentuserState = useTypedSelector(state => state.currentuser);
  const roomAvailabilityState = useTypedSelector(
    state => state.checkRoomAvailability
  );
  const bookedDatesState = useTypedSelector(state => state.bookedDates);

  const { error: roomError, room } = roomState;
  const { user } = currentuserState;
  const {
    error: availabilityError,
    loading: availabilityLoading,
    availability: isAvailable,
  } = roomAvailabilityState;
  const {
    error: bookedDatesError,
    loading: bookedDatesLoading,
    bookedDates,
  } = bookedDatesState;

  const excludedDates = bookedDates.flat().map(date => new Date(date));

  const dateOnChange = (date: [Date | null, Date | null]) => {
    const [checkInDate, checkOutDate] = date;

    console.log(checkInDate, checkOutDate);

    setCheckInDate(checkInDate as Date);
    setCheckOutDate(checkOutDate as Date);

    if (checkInDate || checkOutDate) {
      setDaysOfStay(1);
    }

    if (room && checkInDate && checkOutDate) {
      const oneDayMilliseconds = 24 * 60 * 60 * 1000;
      // these are milliseconds, divide by milliseconds of 1 day to get the days
      const days = Math.floor(
        (checkOutDate.getTime() - checkInDate.getTime()) / oneDayMilliseconds +
          1
      );
      setDaysOfStay(days);

      actions.checkRoomAvailabilityAction({
        roomId: room._id.toString(),
        checkInDate,
        checkOutDate,
      });
    }
  };

  const bookRoom = async (id: string, price: number) => {
    setPaymentLoading(true);
    const amount = price * daysOfStay;

    try {
      const link = `/api/checkout-session/${room?._id}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&daysOfStay=${daysOfStay}&amount=${amount}`;

      const { data } = await axios.get(link);
      const stripe = await getStripe();

      // redirect to checkout
      stripe?.redirectToCheckout({ sessionId: data.session.id });
      // only set the payment loading to on error
      // setPaymentLoading(false);
    } catch (err: any) {
      setPaymentLoading(false);
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (room) actions.bookedDatesAction({ roomId: room._id });
    if (roomError) toast.error(roomError);

    return () => {
      actions.checkBookingReset();
    };
  }, [room, roomError, actions]);

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
                  minDate={new Date()}
                  // first time selected date
                  selected={checkInDate}
                  onChange={dateOnChange}
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  excludeDates={excludedDates}
                  selectsRange
                  inline
                />

                {isAvailable && (
                  <div className="alert alert-success my-3 font-weight-bold">
                    Room is available. Book now!
                  </div>
                )}

                {isAvailable === false && (
                  <div className="alert alert-danger my-3 font-weight-bold">
                    Room is not available. Try different dates.
                  </div>
                )}

                {isAvailable && !user && (
                  <div className="alert alert-danger my-3 font-weight-bold">
                    Login to book room.
                  </div>
                )}

                {isAvailable && user && (
                  <button
                    onClick={() => {
                      bookRoom(room._id, room.price);
                    }}
                    className="btn btn-block py-3 booking-btn"
                    disabled={bookedDatesLoading || paymentLoading}
                  >
                    {paymentLoading ? (
                      <ButtonLoader />
                    ) : (
                      `Pay - $${daysOfStay * room.price}`
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          <CreateReview />

          {room.reviews && room.reviews.length > 0 && (
            <ListReviews reviews={room.reviews} />
          )}

          {!room.reviews ||
            (!room.reviews.length && (
              <p>
                <b>No Reviews on this room</b>
              </p>
            ))}
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
