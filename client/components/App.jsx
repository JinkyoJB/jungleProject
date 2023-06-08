import React from 'react';
import axios from 'axios';

// DEFINE APP AS FUNCTIONAL COMPONENT AND RENDER
const App = () => { // 리액트 컴포넌트 App 정의
  const handleFormSubmit = async (event) => { // form의 이벤트 처리(async = 비동기)
    // event 기본동작 취소 : 폼 제출 이벤트의 기본 동작인 페이지 새로고침을 막아줌
    event.preventDefault();

    // event.target에서 이벤트 발생 요소(form)를 참조, 선택된 파일 중 첫번째를 가져옴
    const imageFile = event.target.elements.image.files[0];
    console.log(imageFile);

    // formData 생성 : 파일 업로드를 위한 폼 데이터 객체 생성
    const formData = new FormData();
    formData.append('image', imageFile); // append 메서드로 imagefile을 image 이름으로 추가

    try {
      // Axios 라이브러리를 사용하여 post 요청을 보냄(url, data)
      const response = await axios.post('http://localhost:3000/api/upload', formData);
      console.log('Server response:', response.data); // 콘솔에 서버의 응답 데이터를 출력
    } catch (error) {  // 에러 발생 시, 에러 메세지 출력
      console.error('Failed to upload image:', error);
    }
  };

  return (
    <div className="app">
      <h1>Hello, World!</h1>
      <form onSubmit={handleFormSubmit}> 
        <input type="file" name="image" accept="image/*" />
        <input type="submit" value="Upload Image" />
      </form>
    </div>
  );
  // onSubmit : form이 제출될 때 실행되는 이벤트 핸들러
  // input(1) : 파일 선택, 파일 형식을 image로 제한
  // input(2) : 제출 버튼, value는 버튼에 표시되는 텍스트.
};

// EXPORT STATEMENT
export default App;

