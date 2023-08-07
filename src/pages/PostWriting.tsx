import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import SelectCountry from '../conponents/SelectCountry';

const PostWriting = () => {
  const param = Number(useParams().id);

  // SelectCountry와 세트로 써야함
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(); 

  console.log(selectedCountry)

  


  return (
    <div>
      <SelectCountry id={param} onChange={setSelectedCountry}/>
    </div>
  )
}

export default PostWriting