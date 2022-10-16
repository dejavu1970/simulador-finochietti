

function inicio(){
    let prestamo = parseInt(prompt(`Bienvenido, por favor ingresa el monto que deseas solicitar`));
    if(isNaN(prestamo)){
        alert(`Por favor ingrese un monto valido`);
        prestamo = parseInt(prompt(`Bienvenido, por favor ingresa el monto que deseas solicitar`));
    }

    let meses = parseInt(prompt(`Ingresa la cantidad de cuotas`));
    if(isNaN(meses)){
        alert(`Por favor ingrese un valor valido`);
        meses = parseInt(prompt(`Ingresa la cantidad de cuotas`));
    }

    if (meses > 12){
        alert(`Por favor, ingrese una cantidad menor a 12 cuotas.`);
        inicio();
        
    } else{
        const interes= (prestamo * 20 / 100);
        let totalPago = (prestamo + interes);
        let cuotas = parseFloat((totalPago / meses).toFixed(2));
        printCuotas(meses, cuotas);
        alert(`El prestamo solicitado es de $  ${prestamo.toLocaleString('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2})}.-
El mismo se va a devolver en ${meses} meses. 
El interes total va a ser de $ ${interes.toLocaleString('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2})}.-
El total a abonar por todo concepto es de $ ${totalPago.toLocaleString('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2})}.-`)}
}

function printCuotas(meses, cuotas){
    let cuota=0;
    while(cuota < meses){
        cuota++
        console.log(`El valor de su cuota N° ${cuota} va a ser de: $ ${cuotas.toLocaleString('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2})}}`);
    }
}

inicio();