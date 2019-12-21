_("#signout").on("click", function ()
{
  window.location.href = "../logout.html";
});

function closeModal ()
{
  _("#pagecover").removeClass("cover");
  _("#modal").setClass("modal ModalHidden");
}

function openModal ()
{
  _("#pagecover").addClass("cover");
  _("#modal").setClass("modal ModalVis");
}

_("#pagecover").on("click", function ()
{
  closeModal();
});

/*
_("#modalx").on("click", function ()
{
  closeModal();
});
*/