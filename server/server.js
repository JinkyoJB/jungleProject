require('dotenv').config();
const path = require('path');
const express = require('express'); 
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PORT = 3000;
const app = express();

/*--------------------- dohee 추가 : 클라우드 이미지 url ------------------------*/
const fileUpload = require('express-fileupload');
app.use(fileUpload());
const cors = require('cors');
app.use(cors());

// CORS 옵션 설정
const corsOptions = {
  origin: '*', // 클라이언트 도메인을 명시적으로 지정하면 보안 상의 이유로 해당 도메인만 요청 허용 가능
  methods: 'GET, POST',
  allowedHeaders: 'Content-Type',
};

// CORS 미들웨어를 사용하여 모든 경로에 대해 CORS 옵션 적용
app.use(cors(corsOptions));


// 이미지 업로드 및 URL 저장에 필요한 모듈 임포트 (npm install @google-cloud/storage)
const { Storage } = require('@google-cloud/storage');
// 객체 분해 할당 : 모듈에서 필요한 속성만 추출해서 할당. 이렇게 하면 해당 모듈의 storage 클래스를 직접 참조 가능!
//클라이언트가 이미지를 업로드하면 --> 해당 이미지를 클라우드 스토리지에 저장 --> 업로드 완료 후 생성된 url을 몽고db에 저장

// 구글 클라우드 스토리지 클라이언트 생성 및 인증 정보 설정
// : Storage를 한 번만 생성해서 해당 인스턴스를 계속 사용하며 연결 상태를 유지. (업로드, 다운로드, 삭제 등 작업 수행)
const storage = new Storage({
  keyFilename: path.join(__dirname, 'rich-wavelet-388908-dad58487deb3.json'), // 서비스 계정 키 파일 경로 설정
  projectId: 'rich-wavelet-388908', // 구글 클라우드 프로젝트 ID
});
/*-------------------------------------------------------------------*/

// PARSE ALL REQUESTS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parses cookies attached to the client request object

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, '../client/dist')));

// ROUTES
app.use('/api', require('./routes/api'));

//HANDLE CLIENT-SIDE ROUTING
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// UNKNOWN ROUTE HANDLER
app.use((req, res) => res.status(404).send('404 Not Found'));

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});



// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// SERVER LISTEN
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
