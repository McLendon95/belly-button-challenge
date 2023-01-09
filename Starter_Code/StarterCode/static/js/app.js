function charts(selectedPatientID) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      var plottingData = data.samples;
      var subject = plottingData.filter(
        (sampleobject) => sampleobject.id == selectedPatientID
                                        )[0];
  
      //Id's, lables and values
      console.log(subject);
      var values = subject.sample_values;
      var ids = subject.otu_ids;
      var labels = subject.otu_labels;

      //Bar Chart
      var trace = {
        x: values.slice(0, 10).reverse(),
        y: ids
          .slice(0, 10)
          .map((otuID) => `OTU ${otuID}`)
          .reverse(),
        text: labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
                    };
  
      var data = [trace];
  
      var layout = {
        xaxis: { autorange: true },
        yaxis: { autorange: true },
        margin: { t: 70, l: 100 },
        height: 380,
                    };
  
      Plotly.newPlot("bar", data, layout);


      //Bubble Chart
      var trace = {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          color: ids,
          size: values,
          colorscale: "Electric",
                },
                    };
  
      var data = [trace];
  
      var layout = {
        margin: { t: 0 },
        xaxis: { title: "OTU ID" },
        hovermode: "closest",
        width: window.width,
                    };
  
      Plotly.newPlot("bubble", data, layout);
    });
  }
  
  

    
    function demo(selectedPatientID) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      var metaverseData = data.metadata;
      var subject = metaverseData.filter(
        (sampleobject) => sampleobject.id == selectedPatientID
                                    )[0];
      var demographicInfoBox = d3.select("#sample-metadata");
      demographicInfoBox.html("");
      Object.entries(subject).forEach(([key, value]) => {
        demographicInfoBox.append("h5").text(`${key}: ${value}`);
      });
      
      //Separating guage charts from other charts
      var gaugeData = [
        {
          domain: {x: [0, 5], y: [0, 1]},
          value: subject.wfreq,
          text: subject.wfreq,
          type: "indicator",
          mode: "gauge+number",
          delta: {reference: 10},
          gauge: {
            axis: { range: [null, 9]},
            steps: [
              {range: [0, 1], color: "rgb(132, 181, 140)"},
              {range: [1, 2], color: "rgb(199, 202, 164)"},
              {range: [2, 3], color: "rgb(218, 207, 190)"},
              {range: [3, 4], color: "rgb(239, 227, 220)"},
              {range: [4, 5], color: "rgb(248, 236, 236)"},
              {range: [5, 6], color: "rgb(195, 178, 153)"},
              {range: [6, 7], color: "rgb(195, 168, 153)"},
              {range: [7, 8], color: "rgb(195, 162, 153)"},
              {range: [8, 9], color: "rgb(195, 153, 153)"},
            ],
          },
        },
      ];
  
      var layout = {
        
        width: 350,
        height: 350,
        margin: { t: 50, r: 25, l: 25, b: 25 },
                    };
      Plotly.newPlot("gauge", gaugeData, layout);
    });
    }





  function init() {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {
      console.log("samples.json:", data);
      //Create dropdown menu for test subjects
      let dropDownMenu = d3.select(`#selDataset`);
  
      data.names.forEach((name) => {
        dropDownMenu.append(`option`).text(name).property(`value`, name);
      });

      //Reset demographic info and visuals on initialization
      const firstSample = data.names[0];
      charts(firstSample);
      demo(firstSample);
    });
  }
 
  function optionChanged(newSample) {
    charts(newSample);
    demo(newSample);
  }
  
  init();