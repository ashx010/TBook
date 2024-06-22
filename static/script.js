function calendarCreate(date, month_c, year_c) {
	var day_first = new Date(year_c, month_c, 1).getDay();
	var date_last = new Date(year_c, month_c + 1, 0).getDate();
	var prev_date_last = new Date(year_c, month_c, 0).getDate();
	var day_last = new Date(year_c, month_c, date_last).getDay();
	var cal_table = $('.calendar_list-dates');

	//empyt prev days col and rows added
	for (let i = day_first; i > 0; i--) {
		let html = `<li class='inactive' date='${prev_date_last - i + 1}' month='${month_c - 1}'>${prev_date_last - i + 1}</li>`;
		cal_table.append(html);
	}

	//current month dates
	for (let i = 1; i <= date_last; i++) {
		let today = i === new Date().getDate() && month_c === new Date().getMonth() && year_c === new Date().getFullYear() ? 'active' : '';
		let html = `<li date='${i - 1}' class='${today}' month='${month_c}'>${i}</li>`;
		cal_table.append(html);
	}

	//next month filling
	for (let i = 1; i <= 6 - day_last; i++) {
		let html = `<li class='inactive' date='${i}' month='${month_c + 1}'>${i}</li>`;
		cal_table.append(html);
	}

}

var date = new Date();
var month_c = date.getMonth();
var year_c = date.getFullYear();
calendarCreate(date, month_c, year_c);
$(".calendar_list-heading .current_year").text(year_c);
$(".calendar_list-heading .current_month").text(month_c + 1);


$(document).ready(function () {

	$('.calendar_list-heading li.prevbtn').on('click', function () {
		$('.calendar_list-dates').empty();
		month_c--;
		if (month_c < 0) {
			month_c = 11;
			year_c--;
		}
		$(".calendar_list-heading .current_year").text(year_c);
		$(".calendar_list-heading .current_month").text(month_c + 1);
		calendarCreate(date, month_c, year_c);
	});

	$('.calendar_list-heading li.nextbtn').on('click', function () {
		$('.calendar_list-dates').empty();
		month_c++;
		if (month_c > 11) {
			month_c = 0;
			year_c++;
		}
		$(".calendar_list-heading .current_year").text(year_c);
		$(".calendar_list-heading .current_month").text(month_c + 1);
		calendarCreate(date, month_c, year_c);
	});

	$('.calendar_list-heading li.refresh').on('click', function () {
		$('.calendar_list-dates').empty();
		date = new Date();
		month_c = date.getMonth();
		year_c = date.getFullYear();
		$(".calendar_list-heading .current_year").text(year_c);
		$(".calendar_list-heading .current_month").text(month_c + 1);
		calendarCreate(date, month_c, year_c);
	});
});

// Function to set a cookie
function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function fullScreen(s) {
	if ($(s).hasClass("enabled")) {
		$(".sidenav-left").hide();
		$(".sidenav-right").hide();
		$('.scr-cont-nav-2 ').hide();
	} else {
		$(".sidenav-left").show();
		$(".sidenav-right").show();
		$('.scr-cont-nav-2 ').show();
	}
	$(".mainscreen").toggleClass('full-screen');
	$(".screenparent").toggleClass('full-screen');
	$(".mainscreen .screencontent").toggleClass('full-screen');
	$("nav").toggleClass('full-screen');
	$("ul.nav-more").toggleClass("full-screen");
	$("li.nav-more-item").toggleClass("full-screen");
}

$(document).ready(function () {
	$(".navbar-c .nav-item-c[data='more']").on('click', function (e) {
		e.stopPropagation();
		$("ul.nav-more").toggleClass('active');
	});

	$(document).on('click', function () {
		if ($(".nav-more").hasClass('active')) {
			$("ul.nav-more").removeClass('active');
		}
	});



	if (window.screen.width <= 768) {
		$("ul.nav-more .nav-more-item[data='full-screen']").hide();
	}

	if (getCookie('full-screen') === 'enabled') {
		$("ul.nav-more .nav-more-item[data='full-screen']").addClass('enabled');
		$("ul.nav-more .nav-more-item[data='full-screen']").text('Revert');
		fullScreen($("ul.nav-more .nav-more-item[data='full-screen']"));
	}

	$("ul.nav-more .nav-more-item[data='full-screen']").on('click', function () {
		$(this).toggleClass('enabled');;

		fullScreen(this);

		if ($(this).hasClass('enabled')) {
			$(this).text('Revert')
			setCookie('full-screen', 'enabled', 1);
		} else {
			$(this).text('Full Screen')
			setCookie('full-screen', 'disabled', 1);
		}
	});
});
