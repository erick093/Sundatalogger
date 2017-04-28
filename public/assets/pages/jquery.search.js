$(function() {
    $("#from").datepicker({
        onSelect:function(date) {
          console.log(date);
          $.ajax({
              type: "POST",
              url: "/echo/json/",
              dataType:'json',
              data: {JSON.stringify(date)},
              success: function(data){
                  console.log(data);
              }
          });
        }
    });

});
