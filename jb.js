var header = document.querySelector("header");
var section = document.querySelector("section");
var requestURL =
  "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
//XML:객체와 서버 상호작용 - 새로고침 없이 URL에서 데이터를 가져오기
//요청 만들기: XML생성자부터 새로운 request 인스턴스를 생성
var request = new XMLHttpRequest();
//XML메서드 open(): 새로 생성된 요청을 초기화 만듦/기존 요청을 다시 초기화
request.open("GET", requestURL);

//responseType을 JSon으로 설정 :
//XHR로 하여금 서버가 json데이터를 반환할 것이며 js객체로서 변환될 것을 알게 하기 위함
request.responseType = "json";
request.send(); //send() 메서드 이용해 요청보냄.

request.onload = function () {
  var superheroes = request.response; //요청에 대한 응답을 변수에 저장
  //위 변수는 이제 json 데이터에 기반한 js 객체를 포함하게 된다.

  //두 개 함수 호출해 이 객체에 전달한다.
  populateHeader(superheroes); //<header>를 적절한 데이터로 채운다
  showHeroes(superheroes); //팀의 각 히어로에 대한 정보카드 생성해 <section>내에 넣음
};

function populateHeader(jsonObj) {
  var myH1 = document.createElement("h1"); //htmlElemet("h1")요소 생성
  myH1.textContent = jsonObj["squadName"]; //
  header.appendChild(myH1);

  var myPara = document.createElement("p");
  myPara.textContent =
    "Hometown: " + jsonObj["homeTown"] + " // Formed: " + jsonObj["formed"];
  header.appendChild(myPara);
}
//히어로 정보카드
function showHeroes(jsonObj) {
  var heroes = jsonObj["members"];

  for (var i = 0; i < heroes.length; i++) {
    var myArticle = document.createElement("article");
    var myH2 = document.createElement("h2");
    var myPara1 = document.createElement("p");
    var myPara2 = document.createElement("p");
    var myPara3 = document.createElement("p");
    var myList = document.createElement("ul");

    myH2.textContent = heroes[i].name;
    myPara1.textContent = "Secret identity: " + heroes[i].secretIdentity;
    myPara2.textContent = "Age: " + heroes[i].age;
    myPara3.textContent = "Superpowers:";

    var superPowers = heroes[i].powers;
    for (var j = 0; j < superPowers.length; j++) {
      var listItem = document.createElement("li");
      listItem.textContent = superPowers[j];
      myList.appendChild(listItem);
    }

    myArticle.appendChild(myH2);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myList);

    section.appendChild(myArticle);
  }
}
