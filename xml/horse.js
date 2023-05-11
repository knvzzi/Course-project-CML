function loadXml() { 
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', 'xml/horse.xml', true); 
   
    xhr.onreadystatechange = function() { 
      if (xhr.readyState === 4 && xhr.status === 200) { 
        var xmlDoc = xhr.responseXML; 
        var firstElement = xmlDoc.getElementsByTagName('first'); 
        var secElement = xmlDoc.getElementsByTagName('p'); 
  
        let content = document.querySelector('.content'); 
        let objects = content.querySelectorAll('.text'); 
  
        for (let i=0;i<6;i++) { 
          objects[i].querySelector('h3').innerHTML = firstElement[i].innerHTML; 
          objects[i].querySelector('p').innerHTML = secElement[i].innerHTML; 
        } 
      } 
    }; 
   
    xhr.send(); 
  } 
  
  loadXml();