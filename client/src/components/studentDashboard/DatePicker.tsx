import React, { useState, useEffect, useRef, useContext } from 'react';
import SearchContext from '../../Context/SearchContext';


function Calendar() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [modalDate, setModalDate] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const calendarRef = useRef(null);

    const {setSelectedDate, selectedDate} = useContext(SearchContext);

    useEffect(() => {
        generateCalendar(currentYear, currentMonth);
    }, [currentYear, currentMonth]);

    // @ts-ignore
    const generateCalendar = (year, month) => {
        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = firstDayOfMonth.getDay();
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // @ts-ignore
        const calendarDays = [];

        for (let i = 0; i < firstDayOfWeek; i++) {
            calendarDays.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            calendarDays.push(day);
        }

        // @ts-ignore
        calendarRef.current.innerHTML = ''; // Clear the calendar

        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'text-center font-semibold';
            dayElement.innerText = day;
            // @ts-ignore
            calendarRef.current.appendChild(dayElement);
        });

        calendarDays.forEach(day => {
            const dayElement = document.createElement('div');
            if (day !== null) {
                dayElement.className = 'text-center py-2 border cursor-pointer';
                // @ts-ignore
                dayElement.innerText = day;

                const currentDate = new Date();
                if (year === currentDate.getFullYear() && month === currentDate.getMonth() && day === currentDate.getDate()) {
                    dayElement.classList.add('bg-teal-500', 'text-white');
                }

                dayElement.addEventListener('click', () => {
                    const selectedDate = new Date(year, month, day);
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    // @ts-ignore
                    const formattedDate = selectedDate.toLocaleDateString(undefined, options);
                    setModalDate(formattedDate);
                    setModalVisible(true);
                    setSelectedDate(selectedDate);

                      // remove bg from other days
                      // @ts-ignore
                      calendarDays.forEach((day, index) => {
                        if (dayElement.innerText !== day && day !== null) {
                            // @ts-ignore
                            calendarRef.current.children[index + 7].classList.remove('bg-teal-500', 'text-white');
                        }
                    });

                    dayElement.classList.add('bg-teal-500', 'text-white');

                  
                });
            }

            // @ts-ignore
            calendarRef.current.appendChild(dayElement);
        });
    };

    // @ts-ignore
    const showModal = (selectedDate) => {
        setModalDate(selectedDate);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const prevMonth = () => {
        setCurrentMonth(prev => prev === 0 ? 11 : prev - 1);
        setCurrentYear(prev => prev === 0 && setCurrentMonth(11) || prev);
    };

    const nextMonth = () => {
        setCurrentMonth(prev => prev === 11 ? 0 : prev + 1);
        setCurrentYear(prev => prev === 11 && setCurrentMonth(0) || prev);
    };

    return (
            <div className="w-1/2 p-4 justify-start">
                <h1 className='my-4 text-xl'>Pick a date</h1>
                <div className="bg-black/40 shadow-lg rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-3 bg-gray-700">
                        <button onClick={prevMonth} className="text-white">Previous</button>
                        <h2 className="text-white">{`${currentMonth} ${currentYear}`}</h2>
                        <button onClick={nextMonth} className="text-white">Next</button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 p-4" ref={calendarRef} id="calendar">
                        {/* Calendar Days Go Here */}

                        <div className="text-center font-semibold">Sun</div>
                        <div className="text-center font-semibold">Mon</div>
                        <div className="text-center font-semibold">Tue</div>
                        <div className="text-center font-semibold">Wed</div>
                        <div className="text-center font-semibold">Thu</div>
                        <div className="text-center font-semibold">Fri</div>
                        <div className="text-center font-semibold">Sat</div>


                    </div>
                    {modalVisible &&
                        <div id="myModal" className="modal fixed inset-0 flex items-center justify-center z-50 ">
                            <div className="modal-overlay absolute inset-0 bg-black opacity-70"></div>
                            <div className="modal-container bg-black/60 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                                <div className="modal-content py-4 text-left px-6">
                                    <div className="flex justify-between items-center pb-3">
                                        <p className="text-2xl font-bold">Selected Date</p>
                                        <button onClick={hideModal} className="modal-close px-3 py-1 rounded-full bg-gray-200/0 hover:bg-gray-300/0 focus:outline-none focus:ring">✕</button>
                                    </div>
                                    <div id="modalDate" className="text-xl font-semibold">{modalDate}</div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
    );
}

export default Calendar;
