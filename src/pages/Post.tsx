import React from 'react'
import useInput from '../hooks/useInput';
import { useMutation } from 'react-query';
import { addPost } from '../api/api';
import { postFormValues } from '../types/posts';
import { useParams } from 'react-router-dom';

function Post() {
  const param = Number(useParams().id);
    const [title, handleTitleChange] = useInput();
    const [contents, handleContentsChange] =  useInput();
    const [country, handleCountryChange] =  useInput();
    const [meetDate, handleMeetDateChange] =  useInput();
    // const [location, handleLocationChange] =  useInput();


      // ----------------------------------------게시글 등록
      const postMutation = useMutation((postData: postFormValues) => addPost(param, postData), {

        onSuccess: () => {
          
        }
      });

  const postHandler = (event: React.FormEvent) => {
    event.preventDefault(); 

    const postData: postFormValues= {
        title,
        contents,
        country,
        meetDate,
    }
    postMutation.mutate(postData)

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
    <input
    type="text"
    value={country}
    onChange={handleCountryChange}/>

    <div>meetDate</div>
    <input type='date'value={meetDate}
    onChange={handleMeetDateChange}/>
{/* 
    <div>location</div>
    <input
    type="text"
    value={location}
    onChange={handleLocationChange}/> */}

    <button onClick={postHandler}></button>
    </form>
  )
}

export default Post
