import React, { useState } from 'react';
import useInput from '../hooks/useInput';
import { useMutation } from 'react-query';
import { addPost } from '../api/api';
import { locationFormValues, postFormValues } from '../types/posts';
import { useParams } from 'react-router-dom';
import SelectCountry from '../conponents/SelectCountry';
import Map from '../conponents/Map';

function Post() {
  const param = Number(useParams().id);
  const [title, handleTitleChange] = useInput();
  const [contents, handleContentsChange] =  useInput();
  const [meetDate, handleMeetDateChange] =  useInput();
  const [selectedCountry, setSelectedCountry] = useState<string>(""); 
  const [MarkerPosition, setMarkerPosition] = useState<null | locationFormValues>(null);
console.log("MarkerPosition",MarkerPosition)
  const handleMarkerPositionChange = (newPosition: locationFormValues) => {
    setMarkerPosition(newPosition);

  }

  // ----------------------------------------게시글 등록
  const postMutation = useMutation((postData: postFormValues) => addPost(param, postData), {
    onSuccess: () => {
      // Handle success if needed
    }
  });

  const postHandler = (event: React.FormEvent) => {
    event.preventDefault(); 

    const postData: postFormValues= {
      title,
      contents,
      country: selectedCountry,
      meetDate,
      location: MarkerPosition
    };
    postMutation.mutate(postData);
  };

  return (
    <form>
      <div>title</div>
      <input 
      type="text"
      value={title}
      onChange={handleTitleChange}/>

      <div>contents</div>
      <input
      type="text"
      value={contents}
      onChange={handleContentsChange}/>
      <div>country</div>
      <SelectCountry id={param} onChange={setSelectedCountry} />

      <div>meetDate</div>
      <input type='date' value={meetDate} onChange={handleMeetDateChange} />

      <button onClick={postHandler}>Submit</button>

      {/* Render the Map component with location */}
      <Map
        onMarkerPosition={MarkerPosition} onMarkerPositionChange={handleMarkerPositionChange}
      />
    </form>
  );
}

export default Post;
