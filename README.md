# VanderTable
### Table Sorting and Drag&Drop Columns and Rows Reordering
###### Required: JQuery and JQueryUI

[![Zafra](https://cldup.com/vQDIWoaAor.png)](https://gustavozafra.github.io/)

Vandertable is a jQuery plugin that gives you the ability to re-order table columns and rows by using drag'n'drop and the sorting values. More than that, Vandertable has a beautiful and modern look.

You can also:
  - Reorder your columns and rows by Drag&Drop
  - Sort your table data asc or desc

### Required

VanderTable uses JQuery and JQuery UI on your core, so it is required.:

```sh
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js" type="text/javascript"></script

<!-- OPTIONAL - To look better -->
<link rel="stylesheet prefetch" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" type="text/css">
```


### Usage

VanderTable has a JS file that makes the magic happen, so your statement is mandatory!

```sh
<script src="vandertable.js" type="text/javascript"></script>
```

If you want, VanderTable has its own style. The statement of your style is optional.

```sh
<link rel="stylesheet" href="vandertable.css" type="text/css">
```

### Declaration

To use VanderTable style simply assign the `.VanderTable` class on your table.
```sh
<table class="VanderTable">
    <thead>
    ...
    </thead>
    <tbody>
    ...
    </tbody>
</table>
```

To declare VanderTable is very simple:
```sh
<script type="text/javascript">
    $(function() {
        $(".VanderTable").VanderTable();
    });
</script>
```

### Options

VanderTable has a few options that can be passed by parameter in its statement, in JSON format. For example:

```sh
$(".VanderTable").VanderTable({
    color : '#000', //change the table color
    showRowOrder: true // display the row number in order
});
```

The options:
* **color** : Change the table color. Value: hexa color code in string. Example: '#FFF'
* **showRowOrder** : Display the row number in order. Value: bool. Example: true
* **allowTableSort** : Enables or disables the sort column. Value: bool. Example: true
* **disableColReordering** : Enables or disables the columns reordering by Drag&Drop. Value: bool. Example: true
* **disableRowReordering** :  Enables or disables the rows reordering by Drag&Drop. Value: bool. Example: true

#### If you do not want a column move by Drag & Drop, just add the `.orderControl` class in <th> tags on your <thead>. For example:

```sh
<table class="VanderTable">
    <thead>
        <tr>
            <th>Header1</th>
            <th class="orderControl">Header2 (not movable)</th>
        </tr>
    </thead>
    <tbody>
    ...
    </tbody>
</table>
```

#### Methods
As options, VanderTable has two methods: **onMoveCol** and **onMoveRow**  that are received in his statement.These methods are given a function. For Example:
```sh
$(".VanderTable").VanderTable({
    onMoveCol : function(obj, pos){
      $(obj).css('background-color', '#BF360C !important');
      alert('Old Position: '+ pos.old + ' New Position: '+ pos.new);
    }
});
```


**Free Software, Hell Yeah!**

# Powered by [Gustavo Zafra](http://gustavozafra.github.io)

