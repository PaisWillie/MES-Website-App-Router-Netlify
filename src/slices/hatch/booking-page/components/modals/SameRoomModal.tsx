import { addDays, differenceInMinutes, format, startOfDay } from 'date-fns';
import { Bookmark } from 'lucide-react';

import { useAddRoomBookingHook } from '@/slices/hatch/booking-page/hooks/bookingHooks';

type SameRoomModalProps = {
  open: boolean;
  onClose: () => void;
  startTime: Date;
  endTime: Date;
  userId: string;
  userRoom: string;
  email: string;
};

export type RoomAvailabilities = {
  H201: string[];
  H203: string[];
  H205: string[];
  H204A: string[];
  H204B: string[];
};

// eslint-disable-next-line unused-imports/no-unused-vars
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const SameRoomModal: React.FC<SameRoomModalProps> = ({
  open,
  startTime,
  endTime,
  onClose,
  userId,
  userRoom,
  email,
}) => {
  // const [availabilities, setAvailabilities] = useState<RoomAvailabilities>({
  //   H201: [],
  //   H203: [],
  //   H205: [],
  //   H204A: [],
  //   H204B: [],
  // });

  // const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const addRoomBooking = useAddRoomBookingHook();
  const startWeek = addDays(startTime, 7);
  const endWeek = addDays(endTime, 7);

  // const { data: roomAvailabilities, isLoading } = useFetchAvailabilitiesHook(startWeek, endWeek);

  // useEffect(() => {
  //   if (!isLoading && roomAvailabilities) {
  //     setAvailabilities(roomAvailabilities);
  //   }
  // }, [roomAvailabilities, isLoading]);

  // const handleRoomSelection = (room: string, avail: boolean) => {
  //   if (avail) {
  //     setSelectedRoom(room);
  //   } else {
  //     console.log("Room unavailable. Select again!")
  //   }
  // };

  // const roomString = selectedRoom ?? "No Room Selected"

  async function handleBooking(
    userIdx: string,
    roomx: string,
    startx: Date,
    endx: Date,
    hasConfirmedx: boolean,
    emailx: string,
    created: Date,
  ) {
    const newBooking = {
      userId: userIdx,
      room: roomx,
      startTime: startx,
      endTime: endx,
      hasConfirmed: hasConfirmedx,
      email: emailx,
      createdDate: created,
    };

    try {
      await addRoomBooking.mutateAsync(newBooking);
      // eslint-disable-next-line no-console
      console.log('Room booked successfully!');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to book room:', error);
    }
    onClose();
  }

  function getDuration(startTime: Date, endTime: Date) {
    const timeMin = differenceInMinutes(endTime, startTime);
    const hours = Math.floor(timeMin / 60);
    const min = timeMin % 60;
    if (min != 0) {
      return hours + 0.5;
    } else {
      return hours;
    }
  }

  // function isAvail(availabilities: RoomAvailabilities, room: keyof RoomAvailabilities): boolean {
  //   const roomTimes = availabilities[room]
  //   return roomTimes.length != 0
  // }

  // const roomButtonClass = (room: string, av: boolean) =>
  //   av === true
  //     ? `border-solid border-1 rounded-lg py-0.5 px-1 mr-2.5 text-sm
  //       ${
  //         selectedRoom === room
  //           ? 'text-green-600 border-green-600 bg-green-100'
  //           : 'bg-white border-gray-600 hover:bg-green-100 hover:text-green-600 hover:border-green-600'
  //       }`
  //     : `border-solid border-1 rounded-lg py-0.5 px-1 mr-2.5 text-sm bg-gray-50 border-gray-300 text-gray-300`;

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors
          ${open ? 'visible bg-black/20' : 'invisible'}`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow transition-all max-w-2xl border-solid border-2 border-green-300 py-8 px-10
            ${open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute top-2 right-2 py-0.5 px-2 border 
              berder-neutral-200 rounded-md text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600'
          onClick={onClose}
        >
          X
        </button>
        {/* {children} */}
        <h1 className='text-center mx mb-5'>Same Time Tomorrow</h1>

        <div className='flex'>
          <button className='border-solid border-2 border-green-600 rounded-lg px-5 py-5 m-3 bg-green-100 text-green-600'>
            <div>
              <b className='text-lg'>
                Same time
                <br />
                next week:
                <br />
              </b>
              <i>
                {format(startWeek.toString(), 'p')} (
                {getDuration(startWeek, endWeek)}H)
                <br />
              </i>
              <i>
                {format(startWeek, 'MMMM do')}
                <br />
              </i>
            </div>
          </button>
          <div className='ml-5 py-8'>
            <div className=''>
              <h4 className='mt-3'>Confirm Booking:</h4>
              <p className='text-small mb-1.5'>
                <b> {userRoom}</b>, {format(startWeek, 'MMMM do')},{' '}
                {format(endWeek, 'p')} ({getDuration(startWeek, endWeek)}H).
              </p>
              <button
                className='rounded-full bg-red-50 text-red-700 py-0.1 px-2 border-solid border-1 border-red-700 text-sm'
                onClick={() => {
                  handleBooking(
                    userId,
                    userRoom,
                    startWeek,
                    endWeek,
                    false,
                    email,
                    startOfDay(new Date()),
                  );
                }}
              >
                <div className='flex'>
                  <Bookmark className='w-4 h-4 text-red-700 pt-1 pr-1' />
                  <b>
                    <i>BOOK NOW</i>
                  </b>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SameRoomModal;
