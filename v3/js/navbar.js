var selection = document.getElementsByClassName("Navbar_Item_Left");
for (let i = 0; i < selection.length; i++)
{
  selection[i].addEventListener("click", function (rte)
  {
    if (selection[i].classList.contains(".Navbar_Item_Left"))
    {
      [].forEach.call(document.querySelectorAll(".Navbar_Item_Left"), function (element)
      {
        if (element.classList.contains("w3-text-teal"))
        {
          element.classList.remove("w3-text-teal");
        }
      });
      selection[i].classList.add("w3-text-teal");
      document.body.classList.add("fadeOut");
    }
  });
}

firebase.auth().onAuthStateChanged(function (user)
{
  if (user)
  {
    _("#Button_Login").addClass("disabled");
    _("#Button_Login").removeClass("Navbar_Item_Left");
    document.getElementById("Button_Login").href = "javascript:;";
    _("#Button_Register").addClass("disabled");
    _("#Button_Register").removeClass("Navbar_Item_Left");
    document.getElementById("Button_Register").href = "javascript:;";
    _("$sidebar").append('<a id="Button_About" href="index.html" class="Navbar_Item Navbar_Item_Left w3-bar-item w3-button w3-padding fadeIn"><i class="fa fa-th-large fa-ban w3-margin-right"></i>sign out</a>');
  }
});