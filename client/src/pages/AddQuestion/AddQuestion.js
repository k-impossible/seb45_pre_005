// TODO: Discard Question 모달
import { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import { BaseContainer, BaseWrap } from '../../style/Global.styled';
import { AddQuestionContainer } from './AddQuestion.styled';
import QuestionGuide from '../../components/QuestionGuide/QuestionGuide';
import InputGuide from '../../components/InputGuide/InputGuide';
import InputForm from '../../components/InputForm/InputForm';
import { inputGuideProps, inputFormProps } from '../../common/data/AddQuestionPropsData';

export default function AddQuestion() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [inputTitle, setInputTitle] = useState('');
  const [inputBody, setInputBody] = useState('');
  // const [inputTag, setInputTag] = useState('');
  // const [tags, setTags] = useState([]);

  const handleTitleChange = (event) => {
    setInputTitle(event.target.value);
  };

  const handleBodyChange = (html) => {
    setInputBody(html);
  };

  // const handleTagChange = (event) => {
  //   setInputTag(event.target.value);
  // }

  // const handleTagAdd = (event) => {
  //   if (event.key === 'Enter' || event.key === ',') {
  //     event.preventDefault();
  //     const newTag = inputTag.trim();
  //     if (newTag && !tags.includes(newTag) && tags.length < 5) {
  //       setTags([...tags, newTag]);
  //     }
  //     setInputTag('');
  //   }
  // }

  // const handleTagDelete = (event) => {
  //   const newTags = tags.filter((tag) => tag !== event.target.innerText);
  //   console.log(newTags);
  //   setTags(newTags);
  // }

  const handleAllInputDelete = () => {
    setInputTitle('');
    setInputBody('');
    // setInputTag('');
    // setTags([]);
  }

  const htmlToText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const handleSubmit = async () => {
    if (!inputTitle || htmlToText(inputBody).length < 20) {
      console.log('Input Validation failed.');
      return;
    }

    const data = {
      title: inputTitle,
      content: inputBody
      // email: 'test@test',
      // password: "11bb22aa!!"
      // nickname: "test2",
      // email: "test@gmail.com",
      // password: "test1234!"
    };

    console.log(data);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.REACT_APP_AUTH_TOKEN
        },
        body: JSON.stringify(data),
        credentials: 'include',
        mode: 'cors'
      });

      if (response.ok) {
        console.log('Question Submission Success.');
        setInputTitle('');
        setInputBody('');
        console.log(response);
        window.location.href = '/';
      } else {
        console.log('Question Submission Failed.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isSubmitButtonDisabled = !inputTitle || htmlToText(inputBody).length < 20;

  return (
    <BaseContainer>
      <BaseWrap>
        <AddQuestionContainer>
          <h1>Ask a public question</h1>
          <QuestionGuide />

          <div className="flex-box">
            <InputForm
              {...inputFormProps.title}
              onFocus={() => setFocusedInput('title')}
              onChange={handleTitleChange}
              value={inputTitle}
              nextBtnClick={() => setFocusedInput('body')}
            />
            {focusedInput === 'title' && (
              <InputGuide data={inputGuideProps[focusedInput]} />
            )}
          </div>

          <div className="flex-box">
            <InputForm
              {...inputFormProps.body}
              onFocus={() => setFocusedInput('body')}
              onChange={handleBodyChange}
              value={inputBody}
              nextBtnClick={() => setFocusedInput('tag')}
            />
            {focusedInput === 'body' && (
              <InputGuide data={inputGuideProps[focusedInput]} />
            )}
          </div>

          {/* <div className='flex-box'>
            <InputForm
              {...inputFormProps.tag}
              onFocus={() => setFocusedInput('tag')}
              onChange={handleTagChange}
              onKeyDown={handleTagAdd}
              value={inputTag}
              tags={tags}
              handleTagDelete={handleTagDelete}
            />

            {focusedInput === 'tag' &&
              <InputGuide data={inputGuideProps[focusedInput]} />}
          </div> */}

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitButtonDisabled}
          >
            Post your question
          </button>
          <button
            className="red-btn"
            onClick={() => {
              handleAllInputDelete();
              setFocusedInput(null);
              window.scrollTo(0, 0);
            }}
          >
            Discard draft
          </button>
        </AddQuestionContainer>
      </BaseWrap>
      <Footer />
    </BaseContainer>
  );
}
