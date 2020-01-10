var Modal =
{
  openModal: function (modalName)
  {
    setTimeout(function ()
    {
      _("#pagecover").addClass("cover");
      _("#" + modalName).setClass("modal ModalVis");
      Modal.activeModal = modalName;
      Modal.modal = true;
    }, 10);
  },
  closeModal: function (modalName)
  {
    _("#pagecover").removeClass("cover");
    _("#" + modalName).setClass("modal ModalHidden");
    Modal.modal = false;
  },
  activeModal: "",
  modal: false,
}

var Sidebar =
{
  resetSidebar: function ()
  {
    _("$Section_Chat_Sidebar").html("");
  },
  addToSidebar: function (name, id)
  {
    _("$Section_Chat_Sidebar").append('<button class="nbutton active">global<p class="nbutton subtext">3 members</p></button>');
  },
}

var Window =
{
  addWindow: function (id)
  {
    _("$AppendHere").append('<iframe class="mainframe" id="' + id + '" src="chat.html?c=' + id + '"></iframe>');
  },
  removeWindow: function (id)
  {

  },
}

_("#signout").on("click", function ()
{
  window.location.href = "../logout.html";
});

_("#pagecover").on("click", function ()
{
  if (Modal.modal) Modal.closeModal(Modal.activeModal);
});

_("$button_group_options").on("click", function ()
{
  Modal.openModal("group_options");
});