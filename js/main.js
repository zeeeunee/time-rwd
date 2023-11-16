const main = document.querySelector('main');
const screen = document.querySelector('.screen');
const em = screen.querySelector('em');
const numbers = screen.querySelectorAll('span');
const btns = document.querySelectorAll('nav span');
const btnAuto = document.querySelector('.auto');
/*
setInterval(() => {
	const now = new Date();
	let hr = now.getHours();
	let min = now.getMinutes();
	let sec = now.getSeconds();

	em.innerText = hr < 12 ? 'am' : 'pm';

	spanHr.innerText = hr < 10 ? '0' + hr : hr;
	spanMin.innerText = min < 10 ? '0' + min : min;
	spanSec.innerText = sec < 10 ? '0' + sec : sec;
}, 1000);

*/
//------------------------------------------------

//해당 값이 아래 함수에서 호출되도록 처리 (전역변수)
const data = [
	{ cond: new Date().getHours() >= 5 && new Date().getHours() < 12, name: 'morning' },
	{ cond: new Date().getHours() >= 12 && new Date().getHours() < 18, name: 'afternoon' },
	{ cond: new Date().getHours() >= 18 && new Date().getHours() < 21, name: 'evening' },
	{ cond: new Date().getHours() >= 21 || new Date().getHours() < 5, name: 'night' },
];

//특정함수에 콜백함수를 전달할때 함수호출구문이 아닌 정의문형태로 전달
//setWatch처럼 함수명만 넣으면 정의형태이기 때문에 바로 등록가능
setInterval(setWatch, 1000);

//changeTheme의 경우는 data는 인수를 전달해야 되기때문에 ()를 붙여야함
//()를 붙이는 순간에 정의형태가 아닌 호출형태로 변경되므로 다시 익명함수로 호출문을 wrapping해서 정의형태로 변경
//순서1: 로딩되자마자 1초 간격으로 changeTheme 반복실행
let timer = setInterval(() => changeTheme(data), 1000);

//순서2: 메뉴버튼 클릭시 강제로 clearInterval(timer)로 changeTheme반복중지
btns.forEach((btn) => {
	//각 버튼 클릭시
	btn.addEventListener('click', (e) => {
		//클릭한  버튼만 활성화
		btns.forEach((btn) => btn.classList.remove('on'));
		e.currentTarget.classList.add('on');

		//기존 자동롤링기능끊어줌
		clearInterval(timer);
		//메인요소에 모든 클래스 제거
		main.className = '';
		//클릭한 버튼의 글자를 가져와서 소문자로 변경한다음 메인요소의 클래스명으로 지정
		main.classList.add(e.currentTarget.innerText.toLowerCase()); //to UpperCase(); 대문자변경
	});
});

//auto버튼 클릭시 다시 반복 테마변경기능 실행하면서
//모든 버튼 활성화
//순서3:auto버튼 클릭시 다시 1초간격으로 changeTheme반복실행
btnAuto.addEventListener('click', () => {
	timer = setInterval(() => changeTheme(data), 1000);
	btns.forEach((btn) => btn.classList.remove('on'));
});

function setWatch() {
	em.innerText = new Date().getHours() < 12 ? 'am' : 'pm';
	getTime().forEach((num, idx) => setTime(num, idx));
}

//시간값을 구해서 반환하는 함수
function getTime() {
	const now = new Date();
	let hr = now.getHours();
	let min = now.getMinutes();
	let sec = now.getSeconds();

	//현재시간값이 13이상이되면 12를 뺀 값을 hr로 리턴
	hr = hr > 13 ? hr - 12 : hr;
	return [hr, min, sec];
}

//반환된 시간값을 인수로 받아서 DOM에 세팅하는 함수
function setTime(num, index) {
	numbers[index].innerText = num < 10 ? '0' + num : num;
}

//시간에 테마 변경 함수
function changeTheme(info) {
	//전역 data를 바로 활용하는 것이 아닌 info라는 파라미터를 통해서 전달받도록 처리
	//자주 바뀔만한 값을 상단 전역변수로 뺀뒤 해당 값을 필요로하는 함수에 인수로 전달(데이터추적을 편하게 하기 위함)
	const hr = new Date().getHours();
	main.className = ''; //클래스 비우기

	info.forEach((el) => {
		if (el.cond) main.classList.add(el.name);
	});

	/*
	if (hr >= 5 && hr < 12) {
		main.classList.add('morning');
	}
	if (hr >= 12 && hr < 18) {
		main.classList.add('afternoon');
	}
	if (hr >= 18 && hr < 21) {
		main.classList.add('evening');
	}
	if (hr >= 21 || hr < 5) {
		main.classList.add('night');
	}
  */
}
