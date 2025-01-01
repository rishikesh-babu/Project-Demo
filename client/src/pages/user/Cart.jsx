import 'react'
import useFetch from '../../hooks/useFetch'
import CartCard from '../../components/user/CartCard';
import { useNavigate } from 'react-router-dom';
import { CourseDetailsPage } from './CourseDetailsPage';

export const Cart = () => {

    const [cartDetails, isloading, errro] = useFetch('/cart/get-cart-item')
    console.log('cartDetails?.courses :>> ', cartDetails?.courses);
    const navigate = useNavigate()

    return (
        <div className='min-h-screen flex justify-center'>
            {
                cartDetails?.courses ? (
                    <div className='grid grid-cols-1 gap-5 max-w-screen-xl'>
                        <div className='text-6xl text-center underline decoration-2'>
                            Cart Page
                        </div>
                        {cartDetails?.courses?.map((item) => <CartCard item={item} />)}
                        <div className='flex justify-between'>
                            <div className='ml-32'>
                                <button className="text-2xl btn btn-outline btn-info">
                                    Place Order
                                </button>
                            </div>
                            <div className='text-5xl'>
                                Total: {cartDetails?.totalPrice}
                            </div>
                        </div>

                    </div>

                ) : (
                    <div className='grid place-content-center gap-5 text-center'>
                        <div className='text-5xl'>
                            Cart not added
                        </div>
                        <div>
                            <button onClick={() => navigate('/course')} className="btn btn-outline btn-primary">
                                Go to Course page
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
