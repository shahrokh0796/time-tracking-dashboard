import "./index.html";
import "../styles/styles.scss";
import data from "./data.json";
import ellipsis from './images/icon-ellipsis.svg';

const backgroundColors = {
    'imageBoxOne': "hsl(15, 100%, 70%)",
    'imageBoxTwo': "hsl(195, 74%, 62%)",
    'imageBoxThree': "hsl(348, 100%, 68%)",
    'imageBoxFour': "hsl(145, 58%, 55%)",
    'imageBoxFive': "hsl(264, 64%, 52%)",
    'imageBoxSix': "hsl(43, 84%, 65%)"
};

function getNextImageBoxClass (i) {
    let classNames = Object.keys(backgroundColors);
    let nextClass = classNames[i % classNames.length];
    return {className: nextClass, color: backgroundColors[nextClass]};
}

const wrapper = document.querySelector(".wrapper");
const timeframeParas = document.querySelectorAll(".timeframe");
function processAndDisplayData() {
    const defaultTimeframe = 'daily';
    displayData(data, defaultTimeframe);
    timeframeParas.forEach(para => {
        para.addEventListener('click', function(e) {
            const selectedTimeframe = para.dataset.timeframe;
            displayData(data, selectedTimeframe);
        });
    })
}
processAndDisplayData();
document.addEventListener('DOMContentLoaded', processAndDisplayData);


function displayData(jsonData, timeframe) {
    while(wrapper.childElementCount > 1) {
        wrapper.removeChild(wrapper.lastChild);
    }
    jsonData.forEach((entry, index) => {
        const title = entry.title;
        const modifiedTitle = title.replace(/\s+/g, '-');
        const imageSrc = require(`./images/icon-${modifiedTitle.toLowerCase()}.svg`);
        const current = entry.timeframes[timeframe].current;
        const previous = entry.timeframes[timeframe].previous;
        let { className, color } = getNextImageBoxClass(index);
        let entryDiv = document.createElement('div');
        
        entryDiv.className = 'box';
        entryDiv.innerHTML=`
      <div class="imageBox ${className}" style="background-color: ${color}">
        <img src="${imageSrc}" alt="${title}">
      </div>
      <div class="detailsBox">
        <div class="subDetailBox1">
          <p>Work</p>
          <p><img src=${ellipsis} alt="ellipsis"></p>
        </div>
        <div class="subDetailBox2">
          <h3>${current} hrs</h3>
          <p>Last week - ${previous} hrs</p>
        </div>
      </div>`;
        wrapper.appendChild(entryDiv);
    });
}



