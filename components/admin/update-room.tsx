import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import ButtonLoader from '../layout/button-loader';
import { toast } from 'react-toastify';

import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { RoomImage } from '../../common-types';
import Image from 'next/image';
import { useAsyncAction } from '../../hooks/use-async-action';

const UpdateRoom = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('King');
  const [guestCapacity, setGuestCapacity] = useState(1);
  const [numOfBeds, setNumOfBeds] = useState(1);
  const [internet, setInternet] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [airConditioned, setAirConditioned] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [roomCleaning, setRoomCleaning] = useState(false);

  const [images, setImages] = useState<string[]>([]);
  const [oldImages, setOldImages] = useState<RoomImage[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const router = useRouter();
  const actions = useActions();

  const [updateRoom, loading, error] = useAsyncAction(actions.adminUpdateRoom);

  const updatedRoom = useTypedSelector(state => state.admin.updateRoom.room);
  const { room: currentRoom } = useTypedSelector(state => state.room);

  useEffect(() => {
    if (currentRoom) {
      setName(currentRoom.name);
      setPrice(currentRoom.price);
      setDescription(currentRoom.description);
      setAddress(currentRoom.address);
      setCategory(currentRoom.category);
      setGuestCapacity(currentRoom.guestCapacity);
      setNumOfBeds(currentRoom.numOfBeds);
      setInternet(currentRoom.internet);
      setBreakfast(currentRoom.breakfast);
      setAirConditioned(currentRoom.airConditioned);
      setPetsAllowed(currentRoom.petsAllowed);
      setRoomCleaning(currentRoom.roomCleaning);
      setOldImages(currentRoom.images);
    }

    if (error) {
      toast.error(error);
    }

    if (updatedRoom) {
      router.push('/admin/rooms');
    }
  }, [error, updatedRoom, currentRoom, router]);

  const submitHandler = (e: any) => {
    e.preventDefault();

    const roomData = {
      name,
      pricePerNight: price,
      description,
      address,
      category,
      guestCapacity: Number(guestCapacity),
      numOfBeds: Number(numOfBeds),
      internet,
      breakfast,
      airConditioned,
      petsAllowed,
      roomCleaning,
      images: [] as string[],
    };
    if (images.length !== 0) roomData.images = images;

    updateRoom(currentRoom?._id as string, roomData);
  };

  const onImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);

    setImages([]);
    setOldImages([]);
    setImagesPreview([]);

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages(oldArray => [...oldArray, reader.result as string]);
          setImagesPreview(oldArray => [...oldArray, reader.result as string]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div className="container container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-8">
            <form
              className="shadow-lg"
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <h1 className="mb-4">Update Room</h1>
              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  value={price}
                  onChange={e => setPrice(+e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows={8}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="address_field">Address</label>
                <input
                  type="text"
                  id="address_field"
                  className="form-control"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  className="form-control"
                  id="room_type_field"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  {['King', 'Single', 'Twins'].map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Guest Capacity</label>
                <select
                  className="form-control"
                  id="guest_field"
                  value={guestCapacity}
                  onChange={e => setGuestCapacity(+e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Number of Beds</label>
                <select
                  className="form-control"
                  id="numofbeds_field"
                  value={numOfBeds}
                  onChange={e => setNumOfBeds(+e.target.value)}
                >
                  {[1, 2, 3].map(num => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <label className="mb-3">Room Features</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="internet_checkbox"
                  // @ts-ignore
                  value={internet}
                  onChange={e => setInternet(e.target.checked)}
                  checked={internet}
                />
                <label className="form-check-label" htmlFor="internet_checkbox">
                  Internet
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="breakfast_checkbox"
                  // @ts-ignore
                  value={breakfast}
                  onChange={e => setBreakfast(e.target.checked)}
                  checked={breakfast}
                />
                <label
                  className="form-check-label"
                  htmlFor="breakfast_checkbox"
                >
                  Breakfast
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="airConditioned_checkbox"
                  // @ts-ignore
                  value={airConditioned}
                  onChange={e => setAirConditioned(e.target.checked)}
                  checked={airConditioned}
                />
                <label
                  className="form-check-label"
                  htmlFor="airConditioned_checkbox"
                >
                  Air Conditioned
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="petsAllowed_checkbox"
                  // @ts-ignore
                  value={petsAllowed}
                  onChange={e => setPetsAllowed(e.target.checked)}
                  checked={petsAllowed}
                />
                <label
                  className="form-check-label"
                  htmlFor="petsAllowed_checkbox"
                >
                  Pets Allowed
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="roomCleaning_checkbox"
                  // @ts-ignore
                  value={roomCleaning}
                  onChange={e => setRoomCleaning(e.target.checked)}
                  checked={roomCleaning}
                />
                <label
                  className="form-check-label"
                  htmlFor="roomCleaning_checkbox"
                >
                  Room Cleaning
                </label>
              </div>

              <div className="form-group mt-4">
                <label>Images</label>
                <div className="custom-file">
                  <input
                    type="file"
                    name="room_images"
                    className="custom-file-input"
                    id="customFile"
                    onChange={onImagesChange}
                    multiple
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>

                {imagesPreview.map(img => (
                  <Image
                    src={img}
                    key={img}
                    alt="Images Preview"
                    className="mt-3 mr-2"
                    width={60}
                    height={65}
                  />
                ))}

                {oldImages &&
                  oldImages.map(img => (
                    <Image
                      src={img.url}
                      key={img.public_id}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width={60}
                      height={65}
                    />
                  ))}
              </div>
              <button
                type="submit"
                className="btn btn-block new-room-btn py-3"
                disabled={loading ? true : false}
              >
                {loading ? <ButtonLoader /> : 'UPDATE'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateRoom;
