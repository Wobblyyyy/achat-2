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
        console.log("hey let's fucking get it");
      }
    });
  },
}

function fixMessage(e){for(;e.includes("  ");)e=e.replace("  "," ");for(;e.includes("***");)e=(e=e.replace("***","<b><i>")).replace("***","</b></i>");for(;e.includes("**");)e=(e=e.replace("**","<i>")).replace("**","</i>");for(;e.includes("*");)e=(e=e.replace("*","<b>")).replace("*","</b>");return e;}