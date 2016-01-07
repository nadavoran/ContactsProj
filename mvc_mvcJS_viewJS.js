/**
 * Created by nadavoran on 04/01/2016.
 */
/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interraction.
 */
function ListView(model, elements) {
    this._model = model;
    this._elements = elements;

    this.listModified = new Event(this);

    var _this = this;

    this._model.selectedIndexChanged.attach(function () {
        _this.contactSelected();
    });

    // attach listeners to HTML controls
    this._elements.list.click(function(e) {
        _this.listModified.notify({index: e.target.id || e.target.parentNode.id});
    });
}

ListView.prototype = {
    show : function () {
        this.rebuildList();
    },

    rebuildList : function () {
        var list, items, key;

        list = this._elements.list;
        list.html('');

        items = this._model.getItems();
        items.forEach(function(contact) {
            list.append($('<li class="contactSelection" id="'+contact.id+'" ><span class="contactText">' + contact.conName + '</span></li>'));
        });

        this._model.setSelectedIndex(0);
    },

    contactSelected : function () {
        var contact, items, index;

        items = this._model.getItems();
        if (!items)
        {
            alert("no items");
            return;
        }

        index = this._model.getSelectedIndex();
        if (index !== 0 && (!index || index < 0))
        {
            alert("no row was selected");
            return;
        }

        contact = items[index];
        $('.selectedName').html(contact.conName);
        $(".selectedDesc").html(contact.description);
        $('.active').removeClass("active");
        $('#' + contact.id).addClass("active");
    }
};


/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
function ListController(model, view) {
    this._model = model;
    this._view = view;

    var _this = this;

    this._view.listModified.attach(function (sender, args) {
        _this.updateSelected(args.index);
    });
}

ListController.prototype = {
    updateSelected : function (index) {
        this._model.setSelectedIndex(index);
    }
};