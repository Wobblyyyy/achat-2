var selection = document.getElementsByClassName("Navbar_Item");
for (let i = 0; i < selection.length; i++)
{
  selection[i].addEventListener("click", function (rte)
  {
    [].forEach.call(document.querySelectorAll(".Navbar_Item"), function (element)
    {
      if (element.classList.contains("w3-text-teal"))
      {
        element.classList.remove("w3-text-teal");
      }
    });
    selection[i].classList.add("w3-text-teal");
  });
}