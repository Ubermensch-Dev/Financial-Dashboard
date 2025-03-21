const ctx = document.getElementById('myChart');

    
 let myChart = new Chart(ctx, {
  type: 'pie',
 data: {
   labels: ['Saving',  'Expense'  ],
   datasets: [{
 
      data: [0,0] ,
      borderWidth : 0 ,
       backgroundColor: [
  '#27AE60',
   '#E74C3C',

],
 hoverOffset: 4
    }]
    
},
  options: {
   
  }
});

   