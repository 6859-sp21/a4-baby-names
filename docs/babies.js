// TODO
// General aesthetic
// Play/pause button
// restart
// drag slider during play
// input name to see on chart
// choose number of names?
// Gender/sex
// fix infinite button
//style button 
// add titles and margins and make code not gross 
// Better bar colors



// Set the filter pool to be empty (set of string)
// Read in the nationnal names data => group by year => this is the data we want
//  Do data join to render the bar
//  When we get our "filtered data" for a given year
//   Filter the year data for rank < n || filter pool contains it -> newdata
//   Filter for this newData not in filter pool => notIn
//   Keep the highest n - filterPool.size notIn ranks
//
//  sort this data (sortedData); should be very fast
//  final data = empty
//  i = 0
//  while final data.size < n {
//     




const namesByStatePath = "./stateData/";

//columns: name, sex, count, year, index, will append rank
const namesPath = "./allnames.csv";

const coloradoData = namesByStatePath + "CA.TXT";

const height = 800; // TODO make this some percentage of the screen/adjust to window size
const width = 800; // TODO make this some percentage of the screen/adjust to window size
const margin = ({top: 20, right: 30, bottom: 30, left: 40})
const filterSet = new Set();

let n = 15;
//green, orangey, dark blue, dark red, 
const colorScheme = ["#9aa16a", "#cae0ad", "#8e9191", "#fcba03",  "#50a15b"];
// colorScheme.sort();
const selectedColor = colorScheme[1];
const standardColor = "#D4B483";
const colors = [selectedColor, standardColor]
const nColors = colorScheme.length;
const gendersPool = new Set();
gendersPool.add("M");
gendersPool.add("F");

d3.csv(namesPath, d3.autoType).then(namesData => {
  namesData = namesData.filter(d => (d.year >= 1880));  
  let groupedByYear = d3.group(namesData, d => d.year);
namesData = namesData.filter(d => (d.rank < n));

// function selectorToFile(){
//   if (stateSelect.value == "ALL"){
//     return namesPath;
//   }
//   console.log(namesByStatePath + stateSelect.value + ".TXT");
//   return namesByStatePath + stateSelect.value + ".TXT";
// };

// stateSelect.addEventListener('change', function(){
//   console.log(selectorToFile());
//   updateNamesData(selectorToFile());
// });


function hashCode(name, sex){
  if (filterSet.has(name)){
    return 0;
  }
  return 1;
}

let xScale = d3.scaleLinear()
  .domain([0, d3.max(namesData, d => d.count)]) // TODO this should adjust based on the year
  .range([margin.left, width - margin.right])

let colorScale = d3.scaleOrdinal()
  .domain([...Array(nColors).keys()])
  .range(colors);


  const svg = d3.create('svg')
    .attr('width', width + 20)
    .attr('height', height+20);

    function pause(){
      timing = false;
      window.clearInterval(number);
      document.getElementById("playbutton").innerText = "Play";
    }
    let range = document.getElementById('myRange');
    range.addEventListener('input', function(){
      textYear.value = range.value;
      document.getElementById("yearval").innerText = "Year : " + range.value;
      doDataJoin(namesData, svg, range.value);
    });

    let textYear = document.getElementById("tyear");
    textYear.value = range.value;
    textYear.addEventListener('change', function(){
      range.value = textYear.value;
      document.getElementById("yearval").innerText = "Year : " + textYear.value;
      doDataJoin(namesData, svg, range.value);
    })

    let prevButton = document.getElementById("prevbutton");
    prevButton.addEventListener('click', function(){
      range.value = parseInt(range.value)-1;
      if (parseInt(range.value) <1880){
        range.value = 1880;
      }
      textYear.value = parseInt(range.value);
      document.getElementById("yearval").innerText = "Year : " + range.value;
      doDataJoin(namesData, svg, range.value);
    });

    let nextButton = document.getElementById("nextbutton");
    nextButton.addEventListener('click', function(){
      range.value = parseInt(range.value)+1;
      if (parseInt(range.value) >2019){
        range.value = 2019;
      }
      textYear.value = parseInt(range.value);
      document.getElementById("yearval").innerText = "Year : " + range.value;
      doDataJoin(namesData, svg, range.value);
    });

    let timing = false;
    let number = -1;
    let playbutton = document.getElementById('playbutton');
    playbutton.addEventListener('click', function(){
      textYear.value = range.value;
      document.getElementById("yearval").innerText = "Year : " + range.value;
      doDataJoin(namesData, svg, range.value);
      if (timing){
        pause();
      }
      else{
        number = window.setInterval(incrementYear, 500);
        timing = true;
        document.getElementById("playbutton").innerText = "Pause";
      }
    });

    let resetbutton = document.getElementById('resetbutton');
    resetbutton.addEventListener('click', function(){
      year = 1880;
      range.value = 1880;
      textYear.value = 1880;
      document.getElementById("yearval").innerText = "Year : " + document.getElementById("myRange").value;
      doDataJoin(namesData, svg, 1880)
    });

    let nameTest = document.getElementById('tnames');

    let addbutton = document.getElementById('addbutton');
    addbutton.addEventListener('click', function(){
      // https://stackoverflow.com/questions/7695997/split-the-sentences-by-and-remove-surrounding-spaces
      // Used for  splitting commas and ignoring space
      var namesEntered = nameTest.value.split(",").map(function(item) {
        return item.trim();
      });
      namesEntered.forEach(e => {
        if ((e.length) > 0){
          filterSet.add(e.charAt(0).toUpperCase() + e.slice(1));
        }
      })
      doDataJoin(namesData, svg, parseInt(range.value));
    });

    let clearbutton = document.getElementById('clearbutton');
    clearbutton.addEventListener('click', function(){
      filterSet.clear();
      doDataJoin(namesData, svg, parseInt(range.value));
    });

    let bothbutton = document.getElementById('both-button');
    bothbutton.addEventListener('click', function(){
      gendersPool.add("M");
      gendersPool.add("F");
      doDataJoin(namesData, svg, parseInt(range.value));
    });

    let femaleButton = document.getElementById('female-button');
    femaleButton.addEventListener('click', function(){
      gendersPool.clear()
      gendersPool.add("F");
      doDataJoin(namesData, svg, parseInt(range.value));
    });

    let maleButton = document.getElementById('male-button');
    maleButton.addEventListener('click', function(){
      gendersPool.clear()
      gendersPool.add("M");
      doDataJoin(namesData, svg, parseInt(range.value));
    });

    let lessBarsButton = document.getElementById('less-bars-button');
    lessBarsButton.addEventListener('click', function(){
      n = Math.max(1, n - 1);
      showNumButtonsValue(n);
      doDataJoin(namesData, svg, parseInt(range.value));
    });

    let moreBarsButton = document.getElementById('more-bars-button');
    moreBarsButton.addEventListener('click', function(){
      n = Math.min(30, n + 1);
      showNumButtonsValue(n);
      doDataJoin(namesData, svg, parseInt(range.value));
    });


  
doDataJoin(namesData, svg, 2000);
document.getElementById("chart").appendChild(svg.node());

function showNumButtonsValue(n){
  let span_showing_nums = document.getElementById('num-bars-value');
  if (n === 1){
    span_showing_nums.innerText = n + " bar";
  } else if (n === 30){
    span_showing_nums.innerText = n + " bars (max)";
  } else {
    span_showing_nums.innerText = n + " bars";
  }
}

function doDataJoin(namesData, svg, year){
  let filteredData = groupedByYear.get(parseInt(year)).filter(d => (d.srank < n || filterSet.has(d.name)) && gendersPool.has(d.sex));
  filteredData.forEach(function(e) {
    if (filterSet.has(e.name)){
      e.tmpRank = -1;
    } else {
      e.tmpRank = e.rank;
    }
  });

  filteredData.sort((a,b) => (a.tmpRank < b.tmpRank)? -1: 1);
  filteredData = filteredData.slice(0,n);
  filteredData.sort((a,b) => (a.rank < b.rank)? -1: 1); 
  for (let i = 0; i < n; i++){ // Note n here
    filteredData[i].graphRank = i;
  }

  filteredData = filteredData.filter(d => d.graphRank < n);
  const bandScale = d3
  .scaleBand()
  .domain(d3.range(30))
  .range([0, height-20]) // we want this to only be half the bars
  const transition = svg.transition()
  .duration(500)
  .ease(d3.easeCubic);


  let bars = svg.selectAll("g")
      .data(filteredData, d => {return d.name.toString() + d.sex})
      .join(
        enter => enter.append("g").attr("transform", function(d, i) { return "translate(-" + (xScale(d.count) + 10) + "," + (bandScale(d.graphRank) + 10) + ")"; }),
        update => update,
        exit => exit.remove()
      )
    bars.transition(transition)
    .attr("transform", function(d, i) { return "translate(10," + (bandScale(d.graphRank) + 10) + ")"; });

    bars.selectAll("rect")
        .data(filteredData)
        .join(
          enter => enter.append('rect'),
          update => update,
          exit => exit.remove()
        )

    bars.select("rect")
        .data(filteredData)
        .attr("height", bandScale.bandwidth() - 2)
        .attr('fill', d => colorScale(hashCode(d.name, d.sex)))
        .transition(transition)
        .duration(750)
        .ease(d3.easeQuadOut)
        .attr("width", d => xScale(d.count))
        // .attr("stroke", d => (filterSet.has(d.name)) ? "white": "white")
        .attr("stroke-width", d => (filterSet.has(d.name)) ? 3: 0)

    bars.selectAll("text")
        .data(filteredData)
        .join("text");
        
    bars.select("text")
        .data(filteredData)
        .attr("x", function(d) { return 10; })
        .attr("y", d => bandScale.bandwidth()/2 + 4)
        .attr("fill", "black")
        .attr("font-size", bandScale.bandwidth()/2)
        .text(function(d) { return d.name + ", " + d.sex + ", " + d.count});

    bars.exit().remove();
  }
  function incrementYear(){
    doDataJoin(namesData, svg, range.value);
    textYear.value = range.value;
    document.getElementById("yearval").innerText = "Year : " + range.value;
    document.getElementById("myRange").value = parseInt(range.value) + 1;
    if (parseInt(range.value) >= 2020){
       range.value = 2019;
      pause();
    }
  }
}
);
