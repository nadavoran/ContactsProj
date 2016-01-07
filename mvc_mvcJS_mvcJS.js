/**
 * Created by nadavoran on 04/01/2016.
 */
$(function () {
    var contacts =  [
        {conName: 'Nadav', id:0, description: 'Web dev newbie'},
        {conName: 'Nadav1', id:1, description: '1 Web dev newbie'},
        {conName: 'Nadav2', id:2, description: '2 Web dev newbie'},
        {conName: 'Nadav3', id:3, description: '3 Web dev newbie'},
        {conName: 'Nadav4', id:4, description: '4 Web dev newbie'}
    ];
    var model = new ListModel(contacts),
        view = new ListView(model, {
            'list' : $('#displayNameSelections')
        }),
        controller = new ListController(model, view);

    view.show();
});