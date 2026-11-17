
// 전달받은 상태 코드, 이름, 메세지를 에러 객체에 저장함

class HttpException extends Error {

  
  constructor({status, name, message}){
    super(message);
    this.status = status; 
    this.name = name;
  }
}

module.exports = HttpException;