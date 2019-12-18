String.prototype.replaceAll = function(t, i)
{
  return this.split(t).join(i)
};

var Alerts =
{
  error: function (message)
  {
    Swal.fire(
    {
      icon: "error",
      title: "error",
      text: message,
    });
  },
  success: function (message)
  {
    Swal.fire(
    {
      icon: "success",
      title: "success",
      text: message,
      confirmButtonText: "go to my homepage",
    }).then((result) =>
    {
      if (result.value)
      {
        window.location.href = "app/homepage.html";
      }
    });
  },
}
