const main = document.querySelector('main');
const screen = document.querySelector('.screen');
const em = screen.querySelector('em');
const numbers = screen.querySelectorAll('span');

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

setInterval(() => {
	changeTheme();
	em.innerText = new Date().getHours() < 12 ? 'am' : 'pm';
	//getTime함수가 [시간,분,초]반환
	//반환된 배열값을 그대로 반복돌면서 setTime함수에 인수로 전달
	//setTime함수는 반복을 돌면서 시간,분,초에 한자리수 일때 앞에 0을 붙여주는 공통로직 반복실행
	getTime().forEach((num, idx) => setTime(num, idx));
}, 1000);

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
function changeTheme() {
	const hr = new Date().getHours();
	main.className = ''; //클래스 비우기

	const data = [
		{ cond: hr >= 5 && hr < 12, name: 'morning' },
		{ cond: hr >= 12 && hr < 18, name: 'afternoon' },
		{ cond: hr >= 18 && hr < 21, name: 'evening' },
		{ cond: hr >= 21 || hr < 5, name: 'night' },
	];
	data.forEach((el) => {
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
