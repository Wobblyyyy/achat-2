function Homepage () {}

Homepage.sliderPos = "left";

_("$SliderParent").on("click", function ()
{
  switch (Homepage.sliderPos)
  {
    case "left":
      _("$Slider").setClass("Slider_Slider Slider_Right");
      Homepage.sliderPos = "right";
      break;
    case "right":
      _("$Slider").setClass("Slider_Slider Slider_Left");
      Homepage.sliderPos = "left";
      break;
  }
});
