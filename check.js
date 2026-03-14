const fs=require("fs");
const html=fs.readFileSync("prev_zadania.html","utf8");
const lines=html.split("\n");
for(let i=700;i<780;i++){
  if(lines[i]&&lines[i].includes("loadTaskNote")){
    console.log("L"+(i+1)+" last30:",JSON.stringify(lines[i].slice(-30)));
    console.log("L"+(i+2)+" first30:",JSON.stringify(lines[i+1].slice(0,30)));
    try{new Function(lines.slice(i-5,i+5).join("\n"));}
    catch(e){console.log("Syntax err in slice:",e.message);}
    break;
  }
}
