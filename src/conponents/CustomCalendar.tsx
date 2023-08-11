import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import { styled } from 'styled-components';

export const CustomCalendar = () => {
    const [value, onChange] = useState<any>(new Date());
  
    return (
      <div>
        <StDateContainer>
            {moment(value).format("YYYY년 MM월 DD일")} 
        </StDateContainer>
          <Calendar onChange={onChange} value={value} formatDay={(locale, date) => moment(date).format("DD")}></Calendar>
      </div>
  )
}

const StDateContainer = styled.div`
  width: 560px;
  height: 70px;
  padding: 0 20px;
  border: 1px solid gray;
  border-radius: 8.53px;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  position: relative;
  box-shadow: 5px 5px 5px #e0e0e0;
`

//#1FEC9B;