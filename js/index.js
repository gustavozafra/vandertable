$(function() {
    $(".VanderTable").VanderTable({
        showRowOrder : true,
        allowTableSort : true,
        onMoveCol: function(obj, pos){
          $(obj).css('background-color', '#BF360C !important');
          alert('Old Position: '+ pos.old + ' New Position: '+ pos.new);
        }
    });
});
 