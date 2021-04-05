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


// import * as d3 from "d3";
const namesByStatePath = "./namesbystate"
//columns: name, sex, count, year, index, will append rank
const namesPath = "./allnames.csv"
year = 1880;

function addRanksByYear(data){
  let thing = d3.group(data, d => d.year);
  thing.forEach((yearData, year, map) => {
    yearData.sort((a,b) => (a.count > b.count)? -1: 1);
    yearData.forEach((d, index) =>
        d["rank"] = index);
  });
}

d3.csv(namesPath, d3.autoType).then(namesData => {
namesData = namesData.filter(d => (d.year >= 1880));

// list.sort((a, b) => (a.color > b.color) ? 1 : -1)

// Update date to have a rank for each year
addRanksByYear(namesData);

// names = new Set(data.map(d => d.name))

const height = 600; // TODO make this some percentage of the screen/adjust to window size
const width = 500; // TODO make this some percentage of the screen/adjust to window size
const margin = ({top: 20, right: 30, bottom: 30, left: 40})

const n = 20;
namesData = namesData.filter(d => (d.rank < n));
const colorScheme = d3.schemeCategory20;
const nColors = colorScheme.length;

function hashCode(name){
  let base = 0;
  for (let i = 0; i < name.length; i++){
    base += name.charCodeAt(i)*(i+1);
  }
  return base % nColors;
} 
console.log(namesData)
let xScale = d3.scaleLinear()
  .domain([0, d3.max(namesData, d => d.count)]) // TODO this should adjust based on the year
  .range([margin.left, width - margin.right])

let colorScale = d3.scaleOrdinal()
  .domain([...Array(nColors).keys()])
  .range(colorScheme);


// let colorScale = d3.scaleOrdinal(d3.schemeTableau10)
//   .domain(["John", "Ashley"]);


  const svg = d3.create('svg')
    .attr('width', width*4)
    .attr('height', height);

    const bandHeight = height / n;




  // const barHeight = "25px";

  // console.log(bandScale("Ashley"))

  // let g = svg.append('g');
  //   g
  //   .selectAll('g') // d3-shape functions (like d3.symbol) generate attributes for SVG <path> elements
  //   .data(namesData)
  //   .join('rect')
  //   .attr('width', d => `${xScale(d.count)}px`)
  //   .attr('height', '50px')
  //   .attr('fill', d => colorScale(d.sex))
  //   .attr('x', 0)
  //   .attr('class', 'bar')
  //   .attr('y', d => bandScale(d.name) + bandGender(d.sex))
    
    // .selectAll('text') // d3-shape functions (like d3.symbol) generate attributes for SVG <path> elements
    // .data(namesData)
    // .attr('width', d => `${xScale(d.count)}px`)
    // .attr('height', '50px')
    // .attr('x', 0)
    // .attr('class', 'bar')
    // .attr('y', d => bandScale(d.name) + bandGender(d.sex))
    // .text(d => d.name)
    //.attr('d', d => symbol('rect')) // Notice, the output of the d3.symbol is wired up to the "d" attribute.
    // nameframes = d3.groups(keyframes.flatMap(([, data]) => data), d => d.name)
    // prev = new Map(nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])))
    // let prevdata = namesData;

    function pause(){
      timing = false;
      window.clearInterval(number);
      document.getElementById("playbutton").innerText = "Play";
    }
    let range = document.getElementById('myRange');
    range.addEventListener('input', function(){
      document.getElementById("yearval").innerText = "Year : " + range.value;
      doDataJoin(namesData, svg, range.value);
    });
    let timing = false;
    let number = -1;
    let playbutton = document.getElementById('playbutton');
    playbutton.addEventListener('click', function(){
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
      document.getElementById("yearval").innerText = "Year : " + year;
      document.getElementById("myRange").value = String(year);
      doDataJoin(namesData, svg, 1880)
    });

  
doDataJoin(namesData, svg, 2000);
document.getElementById("chart").appendChild(svg.node());

// function getPrev(prevdata, val){
//   return prevdata.filter(d => d.name === val)[0];
// }

// function doDataJoin(namesData, svg, year, prevdata){
//   const duration = 250;
//   const transition = svg.transition()
//         .duration(duration)
//         .ease(d3.easeLinear);

//   let filteredData = namesData.filter(d => d.year === parseInt(year));
//   const bandScale = d3
//   .scaleBand()
//   .domain(d3.range(n))
//   .range([0, height])

//   let bar = svg.append("g")
//       .attr("fill-opacity", 0.6)
//     .selectAll("rect");

//   bar = bar
//     .data(filteredData)
//     .join(
//       enter => enter.append("rect")
//         .attr("fill", "red")
//         .attr("height", bandScale.bandwidth())
//         .attr("x", xScale(0))
//         .attr("y", d => bandScale((getPrev(prevdata, d.name) ||d).rank))
//         .attr("width", d => xScale((getPrev(prevdata, d.name) ||d).count)),
//       update => update,
//       exit => exit.transition(transition).remove()
//         .attr("y", d => bandScale((getPrev(prevdata, d.name) ||d).rank))
//         .attr("width", d => xScale((getPrev(prevdata, d.name) ||d).count))
//     )
//     .call(bar => bar.transition(transition)
//       .attr("y", d => bandScale((getPrev(prevdata, d.name) || d).rank))
//       .attr("width", d => xScale((getPrev(prevdata, d.name) || d).count)));
//     return filteredData;
// }


function doDataJoin(namesData, svg, year){

  let filteredData = namesData.filter(d => d.year === parseInt(year));
  const bandScale = d3
  .scaleBand()
  .domain(d3.range(n))
  .range([0, height])
  const transition = svg.transition()
  .duration(500)
  .ease(d3.easeCubic);

  // let thing = svg.append("g")
  //   .


  let bars = svg.selectAll("g")
      .data(filteredData, d => {console.log(d.name); console.log(d.sex); return d.name.toString() + d.sex})
      .join(
        enter => enter.append("g").attr("transform", function(d, i) { console.log(d); return "translate(-" + xScale(d.count) + "," + (bandScale(d.rank)) + ")"; }),
            // .attr("width", d => xScale(d.count))
            // .attr("stroke", (d, i) => "black")
            // .attr("height", bandScale.bandwidth() - 2),
        update => update,//.selectAll('rect')
        // .attr("width", 5)
        // .attr("stroke", (d, i) => "yellow"),
        function(exit){ return exit.attr("transform", function(d, i) { return "translate(-" + xScale(d.count) + "," + (bandScale(d.rank)) + ")"; }).remove();},
      )
        // .attr("transform", function(d, i) { console.log(d); return "translate(0," + (bandScale(d.rank)) + ")"; });
        // .attr("fill", (d, i) => "green")
        // .attr("width", d => xScale(d.count))
        // .attr("height", bandScale.bandwidth() - 2)
        // .attr("x", function(d) { return 0; })
        // .attr("y", d => bandScale(d.rank));
    bars.transition(transition)
    .attr("transform", function(d, i) { console.log(d); return "translate(0," + (bandScale(d.rank)) + ")"; });

    bars.selectAll("rect")
        .data(filteredData)
        .join(
          enter => enter.append('rect')
            .attr("width", d => xScale(d.count)),
          update => update,
          exit => exit.remove()
        )

    bars.select("rect")
        .data(filteredData)
        .attr("height", bandScale.bandwidth() - 2)
        .attr('fill', d => colorScale(hashCode(d.name)))
        .transition(transition)
        .duration(750)
        .ease(d3.easeQuadOut)
        .attr("width", d => xScale(d.count))
        .style("opacity", 0.8)

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
    doDataJoin(namesData, svg, year);
    document.getElementById("yearval").innerText = "Year : " + year;
    document.getElementById("myRange").value = String(year);
    year += 1;
    if (year >= 2020){
      year = 2019;
      pause();
    }
  }
    

  // let bar = svg.selectAll("g")
  // .data(filteredData, d => d.name +' ' + d.sex)
  // .join(
  //   enter => enter.append('g'),
  //     // bar.append("rect")
  //     // .attr('fill', d => colorScale(d.name.length))
  //     // .attr("width", d => xScale(d.count))
  //     // .attr("height", bandScale.bandwidth() - 2)
  //     // .merge(bar)
  //     // .attr("width", d => xScale(d.count))
  //     // .attr("height", bandScale.bandwidth() - 2); 
  //     // bar.append("text")
  //     // .attr("x", function(d) { return 10; })
  //     // .attr("y", d => bandScale.bandwidth()/2 + 4)
  //     // .attr("fill", "black")
  //     // .attr("font-size", bandScale.bandwidth()/2)
  //     // .text(function(d) { return d.name + ", " + d.sex + ", " + d.count});
  //     // return bar;},
  //    function(update) {
  //     // update.remove();
  //     return update.remove().append("g");
  //   },
      
      // .attr("width", function(d) {console.log('new count = ' + d.count); return xScale(d.count); })
      // .attr("height", bandScale.bandwidth() - 2); 
      // console.log("updating for year" + year);
      
  //   exit => exit.remove()
  // )
  // .attr("transform", function(d, i) { return "translate(0," + (bandScale(d.rank)) + ")"; })
  // .attr('fill', d => colorScale(d.name.length))
  // .attr("width", d => xScale(d.count))
  // .attr("height", bandScale.bandwidth() - 2);
  // .call(bar => bar.transition(transition)
  //     .attr("y", d => y(d.rank))
  //     .attr("width", d => xScale(d.count) - x(0)));

  // bar.selectAll("g")
  //   .data(filteredData)
  //   .exit()
  //   .remove();
  // bar.selectAll("text")
  //   .data(filteredData)
  //   .exit()
  //   .remove();

  // bar.selectAll("g")
  //    .data(filteredData)
  //    .enter()
  //    .append("rect")
  //   //  .merge(bar)
  //     .attr('fill', d => colorScale(d.name.length))
  //     .attr("width", d => xScale(d.count))
  //     .attr("height", bandScale.bandwidth() - 2);
  
  // bar.selectAll("rect")
  // .data(filteredData)
  // .update()
  // .transition()
  // .duration(500);
    // .attr('fill', d => colorScale(d.name.length))
    // .attr("width", d => xScale(d.count))
    // .attr("height", bandScale.bandwidth() - 2);

    // bar.selectAll("text")
    // .data(filteredData)
    // .enter()
    // .append("text")
    // .attr("x", function(d) { return 10; })
    // .attr("y", d => bandScale.bandwidth()/2 + 4)
    // .attr("fill", "white")
    // .attr("font-size", bandScale.bandwidth()/2)
    // .text(function(d) { return d.name + ", " + d.sex + ", " + d.count;});

    // bar.selectAll("text")
    // .data(filteredData)
    // .transition()
    // .duration(500);

    // .attr("x", function(d) { return 10; })
    // .attr("y", d => bandScale.bandwidth()/2 + 4)
    // .attr("fill", "white")
    // .attr("font-size", bandScale.bandwidth()/2)
    // .text(function(d) { return d.name + ", " + d.sex + ", " + d.count;});


    
//   const container = d3.create('div');
  
//   container.selectAll('div')
//   .data(namesData)
//   .join('div')
//     .style('background', d => colorScale(d.sex))
//     .style('border', '1px solid white')
//     .style('font-size', 'small')
//     .style('color', 'white')
//     .style('text-align', 'right')
//     .style('padding', '3px')
//     .style('width', d => `${xScale(d.count)}px`) // Use "xScale" instead of a magic number here.
//     .text(d => d.count + " name is " + d.name + " sex " + d.sex);
// console.log("data join");
// // return container.node();

  

// document.getElementById("chart").appendChild(container.node());


// const updateBars = bars(svg);
// const updateAxis = axis(svg);
// const updateLabels = labels(svg);
// const updateTicker = ticker(svg);

// return svg.node();
}
);
// yield svg.node();

// for (const keyframe of keyframes) {
//   const transition = svg.transition()
//       .duration(duration)
//       .ease(d3.easeLinear);

//   // Extract the top bar’s value.
//   x.domain([0, keyframe[1][0].value]);

//   updateAxis(keyframe, transition);
//   updateBars(keyframe, transition);
//   updateLabels(keyframe, transition);
//   updateTicker(keyframe, transition);

//   invalidation.then(() => svg.interrupt());
//   await transition.end();
// }


// function bars(svg) {
//   let bar = svg.append("g")
//       .attr("fill-opacity", 0.6)
//     .selectAll("rect");

//   return ([date, data], transition) => bar = bar
//     .data(data.slice(0, n), d => d.name)
//     .join(
//       enter => enter.append("rect")
//         .attr("fill", color)
//         .attr("height", y.bandwidth())
//         .attr("x", x(0))
//         .attr("y", d => y((prev.get(d) || d).rank))
//         .attr("width", d => x((prev.get(d) || d).value) - x(0)),
//       update => update,
//       exit => exit.transition(transition).remove()
//         .attr("y", d => y((next.get(d) || d).rank))
//         .attr("width", d => x((next.get(d) || d).value) - x(0))
//     )
//     .call(bar => bar.transition(transition)
//       .attr("y", d => y(d.rank))
//       .attr("width", d => x(d.value) - x(0)));
// }


// function makeChartWithData(data, groupField){
  
//   const margin = ({top: 10, right: 10, bottom: 20, left: 20});


//   // 3. Create a SVG we will use to make our chart.
//   // See https://developer.mozilla.org/en-US/docs/Web/SVG for more on SVGs.
//   const svg = d3.create('svg')
//     .attr('width', width)
//     .attr('height', height);

//   const colorScale = d3.scaleOrdinal()
//     .domain(["Black", "Hispanic", "White", "Asian"])
//     .range(d3.schemeTableau10)

//   const xScale = d3.scaleLinear()
//     .domain([0,10.5])
//     .range(height - margin.bottom, margin.top)
//     .nice()

//   document.getElementById("chart").appendChild(svg.node());

//   const symbol = d3.symbol();
//   svg.append("g")
//     .selectAll("path")
//     .data(avgTimes)
//     .join("path")
//     .attr("transform", d =>"translate(" + margin.left + 7 + "," + margin.top + ")")
//     .attr('fill', d => colorScale(d.key))
//     .attr('d', d => symbol()) // Notice, the output of the d3.symbol is wired up to the "d" attribute.

  
//   console.log(avgTimes);
// }



// d3.csv("./allegations_202007271729.csv").then(data => {

//         // 2. Setting up variables that describe our chart's space.


//         // Make the new calculated field
//         data.forEach(d => {
//           d.monthsToClose = (parseInt(d.month_closed) + parseInt(d.year_closed) * 12) - (parseInt(d.month_received) + parseInt(d.year_received) * 12);
//         });
        

//         // Filter the data for each chart that we want to make;
//         const filteredData = data.filter(d => ["Black", "Hispanic", "White", "Asian"].includes(d.complainant_ethnicity));
//         // console.log(filteredData);
//         makeChartWithData(filteredData, "complainant_ethnicity");


        // // 3. Create a SVG we will use to make our chart.
        // // See https://developer.mozilla.org/en-US/docs/Web/SVG for more on SVGs.
        // const svg = d3.create('svg')
        //   .attr('width', width)
        //   .attr('height', height);

        // // 4. Setting up scales.
        // const xScale = d3.scaleLinear()
        //   .domain([0, d3.max(data, d => d.)])
        //   .range([margin.left, width - margin.right])
        //   .nice();
      
        // const yScale = d3.scaleLinear()
        //   .domain([0, d3.max(gapminder, d => d.life_expect)])
        //   .range([height - margin.bottom, margin.top])
        //   .nice();

        // const colorScale = d3.scaleOrdinal()
        //   .domain(gapminder.map(d => d.cluster))
        //   .range(d3.schemeTableau10); // try other schemes, too!
        
        
        // // 5. Drawing our points
        // const symbol = d3.symbol();
        // svg.append('g')
        //   .selectAll('path') // d3-shape functions (like d3.symbol) generate attributes for SVG <path> elements
        //   .data(data)
        //   .join('path')
        //   .attr('transform', d => `translate(${xScale(d.fertility)}, ${yScale(d.life_expect)})`)
        //   .attr('fill', d => colorScale(d.cluster))
        //   .attr('d', d => symbol()) // Notice, the output of the d3.symbol is wired up to the "d" attribute.
        
        // //6. Drawing our x-axis
        // svg.append('g')
        // .attr('transform', `translate(0, ${height - margin.bottom})`)
        // .call(d3.axisBottom(xScale))
        // // Add x-axis title 'text' element.
        // .append('text')
        //   .attr('text-anchor', 'end')
        //   .attr('fill', 'black')
        //   .attr('font-size', '12px')
        //   .attr('font-weight', 'bold')
        //   .attr('x', width - margin.right)
        //   .attr('y', -10)
        //   .text('Fertility');

        // //7. Drawing our y-axis
        // svg.append('g')
        //   .attr('transform', `translate(${margin.left}, 0)`)
        //   .call(d3.axisLeft(yScale))
        //   // Add y-axis title 'text' element.
        //   .append('text')
        //     .attr('transform', `translate(20, ${margin.top}) rotate(-90)`)
        //     .attr('text-anchor', 'end')
        //     .attr('fill', 'black')
        //     .attr('font-size', '12px')
        //     .attr('font-weight', 'bold')
        //     .text('Life Expectancy');
            
        // //8.  Adding a background label for the year.
        // const yearLabel = svg.append('text')
        //   .attr('x', 40)
        //   .attr('y', height - margin.bottom - 20)
        //   .attr('fill', '#ccc')
        //   .attr('font-family', 'Helvetica Neue, Arial')
        //   .attr('font-weight', 500)
        //   .attr('font-size', 80)
        //   .text(year);
  
        // document.getElementById("chart").appendChild(svg.node());
// });