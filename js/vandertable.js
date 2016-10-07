//----------------------------------//
// OnLoad de crianção do Plugin
//--- VANDERTABLE JS - Table Columns and Rows Reordering by Drag and Drop by Gustavo Zafra - Copyright ---//
(function($) {
    // Adiciona ao objeto Function do JQuery seu plugin.
    $.fn.VanderTable = function(options) {

        // Definição dos valores padrões
        var defaults = {
            'showRowOrder': false,
            'allowTableSort': false,
            'disableColReordering': false,
            'disableRowReordering': false,
            'color': '#167F92',
            'onMoveCol': function() {},
            'onMoveRow': function() {}
        }; 

        // Geração das settings do seu plugin
        var settings = $.extend({}, defaults, options);

        // Loop que utiliza todos os itens envolvidos na utilização do plugin
        return this.each(function() {
            //Altera esquema de cores da tabela
            $(this).find('th').css('background-color', settings.color);

            //
            var oldPositionRowIndex;
            //
            var oldPositionColIndex;
            var areSwapping = false;
            var $myTable = $(this);

            //se a flag showRowOrder for TRUE
            if (settings.showRowOrder) {
                $(this).find('thead > tr:first').prepend('<th style="background-color:  ' + settings.color + '" class="orderControl">#</th>');
                $(this).find("tbody > tr").each(function() {
                    //nesse caso o this são as trs
                    var count = $(this).parent().children().index($(this)) + 1;
                    $(this).prepend('<td class="orderControl tableOrder">' + count + '</td>');
                });
            }

            //Verifica se está habilitado o sortable
            if (settings.allowTableSort) {
                $(this).find('thead tr:first >th').each(function() {
                    $(this).append('<span class="VanderTableSorter"><button>&#8597;</button></span>')
                });
            }

            //Classe Helper
            var fixHelperModified = function(e, tr) {
                var $originals = tr.children();
                var $helper = tr.clone();
                $helper.children().each(function(index) {
                    $(this).width($originals.eq(index).width())
                });
                return $helper;
            };

            //Reunumera a lista sempre que um item é alterado
            function renumberTable($table) {
                $table.find("tr").each(function() {
                    count = $(this).parent().children().index($(this)) + 1;
                    $(this).attr('data-order', count);
                    if (settings.showRowOrder) {
                        $(this).find('.tableOrder').html(count);
                    }
                });
            }

            function ReordenarItensColSwap($table, oldPosition, newPosition) {
                //	
                $table.find("tbody tr").each(function() {
					//
                    var $elemToMove = $(this).children('td:eq( ' + oldPosition + ' )');
					var $elemInNewPos = $(this).children('td:eq( ' + newPosition + ' )');

					if(oldPosition > newPosition){
						$elemToMove.insertBefore($elemInNewPos);
					}
					else{
						$elemToMove.insertAfter($elemInNewPos);
					}
                });
            }

            //Ao clicar no botão de sort o mesmo faz a reordenação das Rows
            $('.VanderTableSorter').on('click', function(e) {
                e.preventDefault();

                colIndex = $(this).parent().index();
                $rows = $('tbody > tr', $myTable);
                isAsc = true; //Default true

                //Se a tabela ja houver sido ordendada crescente
                if ($(this).hasClass('isAsc')) {
                    //seta a flag para ser ordenada em forma decrescente
                    isAsc = false;

                    //Remove a classe de Crescente e add a class de Decrescente
                    $(this).removeClass('isAsc').addClass('isDesc');
                } else { // senão
                    isAsc = true; //seta a flag para ser ordenada em forma crescente

                    //Remove a classe de Decrescente e add a class de Crescente
                    $(this).removeClass('isDesc').addClass('isAsc');
                }

                $rows.sort(function(a, b) {

                    var auxA = $('td:eq(' + colIndex + ')', a).text().replace(',','.');
                    var auxB = $('td:eq(' + colIndex + ')', b).text().replace(',','.');

                    if(isNaN(auxA) || isNaN(auxB)){

                        var keyA = String(auxA);
                        var keyB = String(auxB);

                        //
                        if (isAsc) {
                            return (keyA > keyB) ? 1 : 0; // A maior que B, então ele fazer o sor crescente
                        } else {
                            return (keyA < keyB) ? 1 : 0; // B maior que A, então ele fazer o sor decrescente
                        }
                    }
                    else{

                        var keyA = Number(auxA);
                        var keyB = Number(auxB);

                        if (isAsc) {
                            return (parseFloat(keyA) > parseFloat(keyB)) ? 1 : 0; // A maior que B, então ele fazer o sor crescente
                        } else {
                            return (parseFloat(keyA) < parseFloat(keyB)) ? 1 : 0; // B maior que A, então ele fazer o sor decrescente
                        }

                    }
                                    

                    
                });

                $rows.each(function(index, row) {
                    //faz o append das rows após reordenar
                    $myTable.find('tbody').append(row);
                });

                //renumberTable($myTable);

            });



            //Se a flag disableRow estiver setada como True não fazer swap das rows
            if (!settings.disableRowReordering) {
                //Atribui o sortable do JqueryUi ao Tbody da table para as rows
                $(this).children('tbody').sortable({
                    helper: fixHelperModified,
                    opacity: 0.9,
                    start: function(event, ui) {
                        oldPositionRowIndex = ui.item.index();
                    },
                    stop: function(event, ui) {
                        var newPos = ui.item.index();
                        if (oldPositionRowIndex != newPos) {
                            renumberTable($(this))

                            //EVENTO onMoveRow
                            if (settings.onMoveRow !== undefined) {
                                settings.onMoveRow(ui.item, {
                                    old: oldPositionRowIndex,
                                    new: newPos
                                });
                            }
                        } else {
                            $(this).sortable("cancel");
                        }


                    }
                }).disableSelection();
            }

            //Se a flag disableColumn estiver setada como True não fazer swap das colunas
            if (!settings.disableColReordering) {
                //Atribui o sortable do JqueryUi ao THead da table para as columns    
                $(this).find('thead tr:first').sortable({
                    items: ">th:not(.orderControl)",
                    opacity: 0.5,
                    start: function(event, ui) {
                        oldPositionColIndex = ui.item.index();
                    },
                    stop: function(event, ui) {
                        if (oldPositionColIndex != ui.item.index() && !areSwapping) {
                            ReordenarItensColSwap($(this).parent().parent(), oldPositionColIndex, ui.item.index());

                            //EVENTO onMoveCol
                            var newPos = ui.item.index();

                            if (settings.onMoveCol !== undefined) {
                                settings.onMoveCol(ui.item, {
                                    old: oldPositionColIndex,
                                    new: newPos
                                });
                            }
                        } else {
                            $(this).sortable("cancel");
                        }


                    }
                }).disableSelection();
            }


        });
    };
})(jQuery);