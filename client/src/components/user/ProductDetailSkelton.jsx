import React from 'react'

function ProductDetailSkelton() {
    return (
        <div class="grid place-content-center my-2 animate-pulse">
            <div class="border-4 p-2 ">
                <div class="text-5xl flex justify-center items-center font-medium h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
                <div class="flex justify-center mt-3">
                    <div class="w-96 h-60 bg-gray-200 rounded mx-auto"></div>
                </div>
                <div class="mt-3">
                    <div class="text-2xl h-6 bg-gray-200 rounded w-1/3 mx-auto"></div>
                    <div class="text-xl h-6 bg-gray-200 rounded w-1/2 mx-auto mt-2"></div>
                </div>
                <div class="mt-3">
                    <div>
                        <div class="text-2xl h-6 bg-gray-200 rounded w-1/3 mx-auto"></div>
                    </div>
                    <div class="text-2xl h-6 bg-gray-200 rounded w-1/3 mx-auto mt-2"></div>
                </div>
                <div class="flex justify-between mt-3">
                    <div>
                        <div class="h-10 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div>
                        <div class="h-10 bg-gray-200 rounded w-24"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailSkelton
