import { menu } from "./main.js";

menu;

$(window).on("load", () => {
  listAllAreas();
});
const listAllAreas = async () => {
  try {
    $("#loading").removeClass("d-none");
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    const data = await res.json();
    const areas = data.meals;
    displayAllAreas(areas);
  } catch (error) {
    console.log(error);
  } finally {
    $("#loading").addClass("d-none");
  }
};

const displayAllAreas = (areas) => {
  let cartona = "";
  for (const area of areas) {
    cartona += `
        <div class="col-md-3">
            <div class="area rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${area.strArea}</h3>
            </div>
        </div>
        `;
  }

  $("#areasRowData").html(cartona);
};

$("#areasRowData").on("click", ".area", (e) => {
  let areaName = $(e.currentTarget).find("h3").text();
  console.log(areaName);
  localStorage.setItem("areaName", areaName);
  window.location.href = "./area.html";
});
