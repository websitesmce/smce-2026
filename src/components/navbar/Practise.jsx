import React from 'react'

function Practise() {
  return (<>
   <section className="h-screen lg:px-48 md:px-24 text-center lg:text-left px-8" id="about">
    <div className='h-full flex flex-col justify-center align-center gap-5'>
    <h1 className='text-5xl font-extrabold'>Sridhar Matturthi</h1>
    <p className='text-3xl font-medium'>A frontend Developer with 3.6 years of experience. Highly skilled in creating user friendly designs and responsive web applications.
    I have created a developed and able to deliver the projects without missing the dead lines.
    </p>
    <button className="px-20 py-3 bg-[#0094c5] text-white font-medium rounded-full hover:bg-[#00a3cc] transition w-100 lg:w-fit">
  Click Me
</button>
    </div>
    
   </section>
   <section className="h-screen px-48" id="projects">
   <h1 className='text-5xl font-extrabold text-center'>My Projects</h1>
    <div className='h-full flex flex-row justify-between align-center'>
    <div className="card bg-amber-100 w-50 h-90">

    </div>
    <div className="card bg-amber-100 w-50 h-90">

    </div>
    <div className="card bg-amber-100 w-50 h-90">

    </div>
    </div>
   </section>
   </>
  )
}

export default Practise