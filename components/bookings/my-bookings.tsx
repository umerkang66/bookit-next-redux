import { MDBDataTable } from 'mdbreact';
import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import easyinvoice from 'easyinvoice';
import { BookingPopulated } from '../../common-types/booking';

interface Data {
  columns: { label: string; field: string; sort: string }[];
  rows: {
    id: string;
    checkInDate: string;
    checkOutDate: string;
    amountPaid: number;
    actions: JSX.Element;
  }[];
}

const MyBookings = () => {
  const bookingsState = useTypedSelector(state => state.myBookings);
  const { error: bookingsError, loading, bookings } = bookingsState;

  useEffect(() => {
    if (bookingsError) toast.error(bookingsError);
  }, [bookingsError]);

  const setBookings = () => {
    const data: Data = {
      columns: [
        { label: 'Booking ID', field: 'id', sort: 'acs' },
        { label: 'Check In', field: 'checkInDate', sort: 'acs' },
        { label: 'Check Out', field: 'checkOutDate', sort: 'acs' },
        { label: 'Amount Paid', field: 'amountPaid', sort: 'acs' },
        { label: 'Actions', field: 'actions', sort: 'acs' },
      ],
      rows: [],
    };

    bookings &&
      bookings.forEach(booking => {
        data.rows.push({
          id: booking._id,
          checkInDate: new Date(booking.checkInDate).toLocaleDateString(),
          checkOutDate: new Date(booking.checkOutDate).toLocaleDateString(),
          amountPaid: booking.amountPaid,
          actions: (
            <div>
              <Link href={`/bookings/${booking._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-eye" />
                </a>
              </Link>

              <button
                className="btn btn-success mx-2"
                onClick={() => downloadInvoice(booking)}
              >
                <i className="fa fa-download" />
              </button>
            </div>
          ),
        });
      });

    return data;
  };

  const downloadInvoice = async (booking: BookingPopulated) => {
    const data = {
      documentTitle: 'Booking INVOICE', //Defaults to INVOICE
      currency: 'USD',
      taxNotation: 'vat', //or gst
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo: 'https://res.cloudinary.com/dvxt8pfbu/image/upload/v1667123578/bookit/bookit_logo_grblh7.png',
      sender: {
        company: 'Book IT',
        address: '13th Street. 47 W 13th St',
        zip: '10001',
        city: 'New York',
        country: 'United States',
      },
      client: {
        company: `${booking.user.name}`,
        address: `${booking.user.email}`,
        zip: '',
        city: `Check In: ${new Date(booking.checkInDate).toLocaleString(
          'en-US'
        )}`,
        country: `Check In: ${new Date(booking.checkOutDate).toLocaleString(
          'en-US'
        )}`,
      },
      invoiceNumber: `${booking._id}`,
      invoiceDate: `${new Date(Date.now()).toLocaleString('en-US')}`,
      products: [
        {
          quantity: `${booking.daysOfStay}`,
          description: `${booking.room.name}`,
          tax: 0,
          price: booking.room.price,
        },
      ],
      bottomNotice:
        'This is auto generated Invoice of your booking on Book IT.',
    };

    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
  };

  return (
    <div className="container container-fluid">
      <h1 className="my-5">My Bookings</h1>

      <MDBDataTable
        data={setBookings()}
        className="px-3"
        bordered
        striped
        hover
      />
    </div>
  );
};

export default MyBookings;
