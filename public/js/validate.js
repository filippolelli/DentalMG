function validate(){
    const form=document.getElementById("myForm");
    /*for(let element of form.elements){
      
      if(element.value==""){ 
        alert("Tutti i campi vanno riempiti");
        return;
      }
    }*/
    
    document.getElementById('hidden').value = canvas.toDataURL('image/png');
    console.log(document.getElementById('hidden').value);
    form.submit();
}