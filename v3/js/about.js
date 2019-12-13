var sections = document.getElementsByClassName("Section_Button");
for (let i = 0; i < sections.length; i++)
{
  sections[i].addEventListener("click", function (e)
  {
    [].forEach.call(document.querySelectorAll(".Section"), function (element)
    {
      element.className = "Section_Hide Section";
    });
    switch (sections[i].innerHTML)
    {
      case "about":
        _("$Section_About").setClass("Section Section_Show");
        break;
      case "directive":
        _("$Section_Directive").setClass("Section Section_Show");
        break;
      case "development":
        _("$Section_Development").setClass("Section Section_Show");
        break;
      case "more info":
        _("$Section_More").setClass("Section Section_Show");
        break;
      case "privacy policy":
        _("$Section_Privacy").setClass("Section Section_Show");
        break;
    }
  }); 
}