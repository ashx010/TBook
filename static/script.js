function calendarCreate(date, month_c, year_c) {
    var day_first = new Date(year_c, month_c, 1).getDay();
    var date_last = new Date(year_c, month_c+1, 0).getDate();
    var prev_date_last = new Date(year_c, month_c, 0).getDate(); 
    var day_last = new Date(year_c, month_c, date_last).getDay();
    var cal_table = $('.calendar_list-dates');

    //empyt prev days col and rows added
    for(let i=day_first; i>0; i--){
        let html = `<li class='inactive' date='${prev_date_last - i + 1}' month='${month_c-1}'>${prev_date_last - i + 1}</li>`;
        cal_table.append(html);
    }

    //current month dates
    for(let i=1; i<=date_last; i++ ){
        let today = i === new Date().getDate() && month_c === new Date().getMonth() && year_c === new Date().getFullYear() ? 'active' : '';
        let html = `<li date='${i-1}' class='${today}' month='${month_c}'>${i}</li>`;
        cal_table.append(html);
    }

    //next month filling
    for(let i=1; i<=6-day_last; i++){
        let html = `<li class='inactive' date='${i}' month='${month_c+1}'>${i}</li>`;
        cal_table.append(html);
    }

}

var date = new Date();
var month_c = date.getMonth();
var year_c = date.getFullYear();
calendarCreate(date, month_c, year_c);
$(".calendar_list-heading .current_year").text(year_c);
$(".calendar_list-heading .current_month").text(month_c+1);


$(document).ready(function(){

    $('.calendar_list-heading li.prevbtn').on('click', function(){
        $('.calendar_list-dates').empty();
        month_c--;
        if(month_c < 0){
            month_c = 11;
            year_c--;
        }
        $(".calendar_list-heading .current_year").text(year_c);
        $(".calendar_list-heading .current_month").text(month_c+1);
        calendarCreate(date, month_c, year_c);
    });

    $('.calendar_list-heading li.nextbtn').on('click', function(){
        $('.calendar_list-dates').empty();
        month_c++;
        if(month_c > 11){
            month_c = 0;
            year_c++;
        }
        $(".calendar_list-heading .current_year").text(year_c);
        $(".calendar_list-heading .current_month").text(month_c+1);
        calendarCreate(date, month_c, year_c);
    });

    $('.calendar_list-heading li.refresh').on('click', function(){
        $('.calendar_list-dates').empty();
        date = new Date();
        month_c = date.getMonth();
        year_c = date.getFullYear();
        $(".calendar_list-heading .current_year").text(year_c);
        $(".calendar_list-heading .current_month").text(month_c+1);
        calendarCreate(date, month_c, year_c);
    });
});
