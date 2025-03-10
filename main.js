let mangName = document.getElementById("mangName");
let customerName = document.getElementById("customerName")
let voiceNum = document.getElementById("voiceNum")
let docNum = document.getElementById("docNum")
let voiceValue = document.getElementById("voiceValue")
let docValue = document.getElementById("docValue")
let date = document.getElementById("date")
let addVoice = document.getElementById("addVoice")

let voiceContainer ;

let mood = "create";

let tmp;

if (localStorage.getItem("allVoices") == null ) {
  voiceContainer = [];
} else {
  voiceContainer = JSON.parse(localStorage.getItem("allVoices"))
  displayVoice();
}
// Button add data to body
function showVoice() {
  let voice = {
    mName: mangName.value,
    cName: customerName.value,
    vNum: voiceNum.value,
    dNum: docNum.value,
    vValue: voiceValue.value,
    docValue: docValue.value,
    dateValue: date.value,
  };
      if (mood === "create") {
        if (mangName.value == "" || voiceNum.value == "" || docValue.value == "" || voiceValue.value == "" || docValue.value == "" || date.value == "") {
          alert("This input is empty")
          } else {
            voiceContainer.push(voice);
            localStorage.setItem("allVoices", JSON.stringify(voiceContainer));
            displayVoice();
            clearValue()
          }
      } else {
        voiceContainer[tmp] = voice;
        localStorage.setItem("allVoices", JSON.stringify(voiceContainer));
        displayVoice();
        clearValue()
      }
}
// Viwe data in the table
function displayVoice() {
  let voiceList = "";
  for(let i = 0; i < voiceContainer.length; i++){
    voiceList += `
    <tr>
      <td>${i+1}</td>
      <td>${voiceContainer[i].mName}</td>
      <td>${voiceContainer[i].cName}</td>
      <td>${voiceContainer[i].vNum}</td>
      <td>${voiceContainer[i].dNum}</td>
      <td>${voiceContainer[i].vValue}</td>
      <td>${voiceContainer[i].docValue}</td>
      <td>${voiceContainer[i].dateValue}</td>
      <td>
        <div class="btn btn-warning rounded-pill" onclick="editeRow(${i})" >تعديل</div>
      </td>
      <td>
        <div class="btn btn-danger rounded-pill" onclick="deleteRow(${i})">حذف</div>
      </td>
    </tr>
    `
  }
  document.getElementById("tBody").innerHTML = voiceList;
}
// Delete all data in the table
function deleteAll() {
  voiceContainer.splice(0);
  localStorage.setItem("allVoices", JSON.stringify(voiceContainer));
  displayVoice()
}
// Clear value in the input
function clearValue() {
  mangName.value = "";
  customerName.value = "";
  voiceNum.value = "";
  docNum.value = "";
  voiceValue.value = "";
  docValue.value = "";
  date.value = "";
};
// Delete Row 
function deleteRow(i) {
  voiceContainer.splice(i, 1);
  localStorage.setItem("allVoices", JSON.stringify(voiceContainer));
  displayVoice();
}
// Update Row
function editeRow(i) {
  mangName.value = voiceContainer[i].mName;
  customerName.value = voiceContainer[i].cName;
  voiceNum.value = voiceContainer[i].vNum;
  docNum.value = voiceContainer[i].dNum;
  voiceValue.value = voiceContainer[i].vValue;
  docValue.value = voiceContainer[i].docValue;
  date.value = voiceContainer[i].dateValue;
  mood = "update";
  if (mood === "update") {
    addVoice.innerHTML = "تحديث";
    tmp = i;
  } 
  localStorage.setItem("allVoices", JSON.stringify(voiceContainer));
  displayVoice();
}
