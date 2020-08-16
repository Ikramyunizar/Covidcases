$(document).ready(function(){
$('#countryselect').change(function(){ 
    var value = $(this).val();
    let link = "https://api.covid19api.com/country/" + value;
    $.get(link, getdata=>{
        console.log(getdata[getdata.length - 1]);
        $("#totalcountry").text(getdata[getdata.length - 1].Confirmed)
    })
    

});
})