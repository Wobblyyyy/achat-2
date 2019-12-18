_("#signout").on("click", function ()
{
  window.location.href = "../logout.html";
});

function closeModal ()
{
  document.getElementById("modal").display = "none";
  document.getElementById("pagecover").display = "none";
}

function openModal ()
{
  document.getElementById("modal").display = "block";
  document.getElementById("pagecover").display = "block";
}