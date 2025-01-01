import React from 'react'

function CartCard({ item }) {
    return (
        <div className='grid grid-cols-4 justify-items-center items-center text-4xl border-2 py-2   '>
            <div>
                <img className='size-40' src={item?.courseId?.image} alt="card-item" />
            </div>
            <div>
                <div>{item?.courseId?.title}</div>
            </div>
            <div>
                <div>{item?.courseId?.price}</div>
            </div>
            <div>
                <button className="text-2xl btn btn-outline btn-secondary">
                    Remove 
                </button>
            </div>
        </div>
    )
}

export default CartCard
