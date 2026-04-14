import React from 'react'
// import { ScaleLoader } from 'react-spinners'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export default function Loder() {

    return (
        <div>
            <section>
                { [1,2,3].map((i)=> 
                
                <div key={i} className="flex gap-4 mb-4">
                    <Skeleton
                        baseColor="#d1d5db" 
                        highlightColor="#f3f4f6"
                        circle
                        width={50}
                        height={50}
                    />
                    <div className="w-full">
                        <Skeleton baseColor="#d1d5db"  height={10} width="80%" />
                        <Skeleton baseColor="#d1d5db"  height={10} width="60%" />
                    </div>
                </div>
                
                )} 
            </section>
        </div>
    )
}



/* <div className='flex justify-center content-center'>
    <ScaleLoader />
</div> */