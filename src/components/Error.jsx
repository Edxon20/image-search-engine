import React from 'react';


const Error = ({mensaje}) =>{
    
    return (
        //Recordar que los className son clases de bootstrap #my-3 --> Margin 3 Example#
        <p className='my-3 p-4 text-center alert alert-primary' >{mensaje}</p>

    );

}

export default Error;