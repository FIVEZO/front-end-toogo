import { useCallback, useState } from "react";
import { styled } from "styled-components";
import { Calendar } from 'react-date-range';
import ko from 'date-fns/locale/ko';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


interface CustomCalendarProps {
  setFormattedDate: (formattedDate: string) => void;
}

export const CustomCalendar: React.FC<CustomCalendarProps> = ({ setFormattedDate }) => {

    const [showCalendar, setShowCalendar] = useState<boolean>(false);   // 캘린더 여는 토글
    const today = new Date()
    const [date, setDate] = useState<Date>(today); 	// date 를 선언하고 기본값을 내일날짜로 지정
  
    const onChangeDate = useCallback((date: Date): void | undefined => { // date 변경값을 받아오는 함수
        
      if (!date) {return;} // 날짜값이 없을 때 예외처리
        setDate(date); 	   // 날짜값이 들어오면 date 를 set해준다
        setFormattedDate(formatDate(date));
    },[setFormattedDate]);

    const formatDate = (inputDate: Date): string => {
      // const year = inputDate.getFullYear();
      const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
      const day = inputDate.getDate().toString().padStart(2, '0');
      return `${month}월 ${day}일`;
    };

    const inputDateString = date;
    const inputDate = new Date(inputDateString);
    // const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${month}월 ${day}일`;
    
    console.log(formattedDate); // Output: 2023년 09월 26일
 
    return (
    <div>
      <div>{formattedDate}</div>
      <CalendarContainer>
        <StCalenderSize>
        <Calendar
          locale={ko}
          months={2}
          date={date}
          onChange={onChangeDate}
          dateDisplayFormat={'yyyy.MM.dd'}
          direction={'horizontal'}
          color='#1FEC9B'
          minDate={today}
        />
        </StCalenderSize>
      </CalendarContainer>
    </div>
  )
}


const CalendarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #cfced7;
  border-radius: 8.53px;
  width:100%;
  height:600px;


`
const StCalenderSize =styled.div`
transform: scale(1.6);
margin-bottom:15px;
`
//#1FEC9B;